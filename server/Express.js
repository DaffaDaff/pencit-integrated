require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Express app setup
const app = express();

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/pencit_db";

// Middleware
app.use(express.json());
app.use(cors({ 
  origin:[
    'http://localhost:5011',
    'https://localhost:5011',
    'http://localhost',
    'https://localhost',
    'https://lai24b-k2.tekomits.my.id/',
    'https://lai24b-k2.tekomits.my.id',
    process.env.HOST_URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Image upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Database connection
mongoose.connect(mongoURI
).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// User Schema
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Caption Schema
const CaptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  story: { type: String, required: true },
  visitedLocation: { type: String, required: true },
  imageId: { type: String, required: true },
  visitedDate: { type: Date, required: true }
});
const Caption = mongoose.model('Caption', CaptionSchema);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: true, message: 'Access token required' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: true, message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ 
        error: true, 
        message: "All fields are required" 
      });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ 
        error: true, 
        message: "User already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
    );

    return res.status(201).json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Registration Successful",
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      error: true,
      message: "An error occurred during registration"
    });
  }
});

app.post("/logout", (req, res) => {
  try {
    return res.json({
      error: false,
      message: "Logout successful",
    });
  } catch (error) {
    console.error('Logout error details:', error);
    return res.status(500).json({
      error: true,
      message: "An error occurred during logout",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid password"
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '72h' }
    );

    return res.json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Login successful",
    });

  } catch (error) {
    console.error('Login error details:', error);
    return res.status(500).json({
      error: true,
      message: error.message || "An error occurred during login"
    });
  }
});

app.get("/get-user", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found"
      });
    }

    return res.status(200).json({
      error: false,
      user: {
        fullName: user.fullName,
        email: user.email,
      },
      message: "User data retrieved successfully",
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      error: true,
      message: "An error occurred while retrieving user data"
    });
  }
});

app.post("/caption", authenticateToken, async (req, res) => {
  try {
    const { title, story, visitedLocation, imageId, visitedDate } = req.body;
    const { userId } = req.user;

    if (!title || !story || !visitedLocation || !imageId || !visitedDate) {
      return res.status(400).json({ 
        error: true, 
        message: "All fields are required"
      });
    }

    const caption = new Caption({
      userId,
      title,
      story,
      visitedLocation,
      imageId,
      visitedDate
    });

    await caption.save();

    return res.status(201).json({
      error: false,
      caption,
      message: "Caption created successfully"
    });

  } catch (error) {
    console.error('Post caption error:', error);
    return res.status(500).json({
      error: true,
      message: "An error occurred while creating caption"
    });
  }
});

app.get("/get-caption", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    const captions = await Caption.find({ userId }).sort({ isFavourite: -1});
    res.status(200).json({stories: captions});
  } catch(error) {
    res.status(500).json({error: true, message: error.message});
  }
});

async function compressToFileSize(inputPath, outputPath, targetSizeKB) {
  let quality = 80; // Start with an initial quality
  let compressedBuffer;

  while (quality > 10) { // Set a lower limit for quality
    // Compress image with current quality
    compressedBuffer = await sharp(inputPath)
      .jpeg({ quality }) // Adjust quality
      .toBuffer();

    // Check if file size meets the target
    const sizeInKB = compressedBuffer.length / 1024; // Convert bytes to KB
    if (sizeInKB <= targetSizeKB) {
      break;
    }

    // Reduce quality for further compression
    quality -= 5;
  }

  // Save compressed image to output path
  await sharp(compressedBuffer).toFile(outputPath);
  return compressedBuffer.length / 1024; // Return final size in KB
}

// POST route for image upload with size targeting
app.post("/image-upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: true, message: "No image uploaded" });
    }

    const inputPath = req.file.path;
    const compressedFilename = `compressed-${req.file.filename}`;
    const outputPath = path.join(req.file.destination, compressedFilename);
    const targetSizeKB = 200; // Target size in KB

    // Compress image to target size
    const finalSizeKB = await compressToFileSize(inputPath, outputPath, targetSizeKB);

    // Optional: Delete original file to save space
    fs.unlinkSync(inputPath);

    res.status(201).json({
      imageId: compressedFilename,
      sizeKB: finalSizeKB.toFixed(2),
      message: "Image compressed successfully",
    });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      // If file not found or error occurs
      if (err.code === 'ENOENT') {
        return res.status(404).json({ 
          error: true, 
          message: "Image not found" 
        });
      }
      // For other types of errors
      return res.status(500).json({ 
        error: true, 
        message: "Error retrieving image" 
      });
    }
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: "Internal server error"
  });
});

// Server Port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;