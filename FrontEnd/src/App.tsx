import React, { useEffect, useState } from "react";
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
import { Route } from "react-router-dom";
import {
  setUserInformation,
  userAuthenticated,
  userInformation,
  loaderScreen,
  userError,
} from "./reducerSlices/authSlicer";
import axios from "./Axios";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [userLoader, setUserLoader] = useState<boolean>(true);

  const user = useSelector(userAuthenticated);

  const userInfo = useSelector(userInformation);

  const loader = useSelector(loaderScreen);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/dyno", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setUserInformation(res.data));
        setUserLoader(false);
      })
      .catch((err) => {
        dispatch(userError(null));
        setUserLoader(false);
      });
  }, [user, dispatch]);
  return (
    <div className="App">
      {loader && <LoadingScreen />}
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
