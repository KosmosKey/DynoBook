import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SignUp.scss";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "../../Axios";
import { loginSuccess } from "../../reducerSlices/authSlicer";

type loginTargets = {
  username: string;
  password: string;
};

const SignUp: React.FC = () => {
  const [errorLogin, setErrorLogin] = useState<string>("");
  const [loginTargets, setLoginTargets] = useState<loginTargets>({
    username: "",
    password: "",
  });

  const history = useHistory();

  const dispatch = useDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(
        "/dyno/login",
        {
          username: loginTargets.username,
          password: loginTargets.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(loginSuccess);
        setErrorLogin("");
        setLoginTargets({ ...loginTargets, username: "", password: "" });
      })
      .catch((err) => {
        setErrorLogin(err.response.data);
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginTargets({ ...loginTargets, [e.target.name]: e.target.value });
  };

  return (
    <div className="SignUp">
      <form onSubmit={onSubmit} className="SignUp__Body">
        <div className="SignUp__Container">
          <h1>Log In</h1>
          {errorLogin && (
            <Alert severity="error" className="Signup__ErrorAlert">
              {errorLogin}
            </Alert>
          )}
          <div className="SignUp__UserNameInput">
            <PersonIcon />
            <input
              name="username"
              value={loginTargets.username.toLowerCase()}
              onChange={onChange}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="SignUp__Password">
            <LockIcon />
            <input
              value={loginTargets.password}
              onChange={onChange}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <Button type="submit">Log In</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
