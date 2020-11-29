import React, { useEffect } from "react";
import { Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import HomePage from "./components/HomePage";
import NavigationBar from "./components/NavigationBar";
import NavigationHome from "./components/NavigationHome/NavigationHome";
import SocialMediaBody from "./components/SocialMediaBody";
import PrivateRouter from "./PrivateRouter";
import ProtectedRoute from "./ProtectedRoute";
import {
  setUserInformation,
  userAuthenticated,
  userError,
} from "./reducerSlices/authSlicer";
import axios from "./Axios";

function App() {
  const user = useSelector(userAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/dyno", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUserInformation(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        dispatch(userError);
        console.log(err.response.data);
      });
  }, [user, dispatch]);
  return (
    <div className="App">
      <NavigationHome />
      <Switch>
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute path="/Login" component={SignUp} />
        <ProtectedRoute path="/Signup" component={Login} />
        <PrivateRouter path="/Home" component={SocialMediaBody} />
      </Switch>
      {/* <NavigationBar />
      <SocialMediaBody /> */}
      {/*  <SignUp /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
