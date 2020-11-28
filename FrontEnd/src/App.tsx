import React from "react";
import { Switch } from "react-router-dom";
import "./App.scss";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavigationBar";
import NavigationHome from "./components/NavigationHome/NavigationHome";
import SocialMediaBody from "./components/SocialMediaBody";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <NavigationHome />
      <Switch>
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute path="/Login" component={Login} />
        <ProtectedRoute path="/Signup" component={SignUp} />
      </Switch>
      {/* <NavigationBar />
      <SocialMediaBody /> */}
      {/*  <SignUp /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
