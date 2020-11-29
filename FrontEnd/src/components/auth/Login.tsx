import React, { useState } from "react";
import "./Login.scss";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "../../Axios";

type eventTargets = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [successAlert, setSuccessAlert] = useState<string>("");
  const [errorAlert, setErrorAlert] = useState<string>("");
  const [valueTargets, setValueTargets] = useState<eventTargets>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("/dyno/register", {
        first_name: valueTargets.first_name,
        last_name: valueTargets.last_name,
        email: valueTargets.email,
        image: null,
        username: valueTargets.username,
        password: valueTargets.password,
      })
      .then((res) => {
        setErrorAlert("");
        setSuccessAlert(res.data);
        setValueTargets({
          ...valueTargets,
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
        });
      })
      .catch((err) => {
        setSuccessAlert("");
        setErrorAlert(err.response.data);
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueTargets({ ...valueTargets, [e.target.name]: e.target.value });
  };

  return (
    <div className="Login">
      <div className="Login__Body">
        <form onSubmit={onSubmit} className="Login__Container">
          <h1>Create Account</h1>
          {successAlert && (
            <Alert severity="success" className="Login__SuccessMessage">
              {successAlert}
            </Alert>
          )}
          {errorAlert && (
            <Alert severity="error" className="Login__ErrorAlert">
              {errorAlert}
            </Alert>
          )}

          <div className="LoginInput__FirstLast">
            <div className="Login__InputField first">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={valueTargets.first_name}
                onChange={onChange}
              />
            </div>
            <div className="Login__InputField last">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={valueTargets.last_name}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="Login__UserNameInput">
            <PersonIcon />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={valueTargets.username.toLowerCase()}
              onChange={onChange}
            />
          </div>
          <div className="Login__EmailAddress">
            <EmailIcon />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={valueTargets.email}
              onChange={onChange}
            />
          </div>
          <div className="Login__Password">
            <LockIcon />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={valueTargets.password}
              onChange={onChange}
            />
          </div>
          <Button type="submit">Create Account</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
