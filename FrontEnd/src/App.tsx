import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
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
  userInformation,
  loaderScreen,
  userError,
} from "./reducerSlices/authSlicer";
import axios from "./Axios";
import LoadingScreen from "./components/LoadingScreen";
import Trends from "./components/Trends/Trends";
import FourZeroFour from "./FourZeroFour";
import TrendsRoute from "./TrendsRoute";

function App() {
  const user = useSelector(userAuthenticated);

  const loader = useSelector(loaderScreen);

  const userInfo = useSelector(userInformation);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    var config: { headers: any } = {
      headers: { "Content-type": "application/json" },
    };

    if (token) {
      config.headers["x-auth-bearer"] = token;
    }

    axios
      .get("/dyno", config)
      .then((res) => {
        dispatch(setUserInformation(res.data));
      })
      .catch((err) => {
        dispatch(userError(null));
      });
  }, [user, dispatch]);

  return (
    <div className="App">
      {loader && <LoadingScreen />}
      {userInfo ? <NavigationBar /> : <NavigationHome />}
      <Switch>
        <ProtectedRoute exact path="/" component={HomePage} />
        <ProtectedRoute path="/Login" component={SignUp} />
        <ProtectedRoute path="/Signup" component={Login} />
        <PrivateRouter path="/Home" component={SocialMediaBody} />
        <TrendsRoute path="/Trends" component={Trends} />
        <Route path="*" component={FourZeroFour} />
      </Switch>
    </div>
  );
}

export default App;
