import React from "react";
import "./App.scss";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavigationBar";
import NavigationHome from "./components/NavigationHome/NavigationHome";
import SocialMediaBody from "./components/SocialMediaBody";

function App() {
  return (
    <div className="App">
      {/* <NavigationBar />
      <SocialMediaBody /> */}
      <NavigationHome />
      {/*  <SignUp /> */}
      {/* <Login /> */}
      <HomePage />
    </div>
  );
}

export default App;
