import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      try {
        // Call the backend logout API (if necessary)
        const response = await fetch("/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        // Check if logout was successful
        if (response.ok) {
          console.log("Logout successful");
        } else {
          console.error("Failed to logout from the server");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        // Clear token from local storage
        localStorage.removeItem("accessToken");

        // Redirect to login page
        window.location.href = "/login"; // Use window.location for redirection
      }
    };

    logout();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
