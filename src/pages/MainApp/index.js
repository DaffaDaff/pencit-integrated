import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Home from "../Home";
import UserProfile from "../UserProfile";
import CreatePost from "../CreatePost";
import { Navbar} from "../../components";

const MainApp = () => {
    return (
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Router>
            <Switch>
              <Route path="/profile">
                <UserProfile />
              </Route>
              <Route path="/create">
                <CreatePost />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
export default MainApp