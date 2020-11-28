import React from "react";
import "./Login.scss";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { Button } from "@material-ui/core";

const Login: React.FC = () => {
  return (
    <div className="Login">
      <div className="Login__Body">
        <div className="Login__Container">
          <h1>Create Account</h1>
          <div className="LoginInput__FirstLast">
            <div className="Login__InputField first">
              <input type="text" placeholder="First Name" />
            </div>
            <div className="Login__InputField last">
              <input type="text" placeholder="Last Name" />
            </div>
          </div>
          <div className="Login__UserNameInput">
            <PersonIcon />
            <input type="text" placeholder="Username" />
          </div>
          <div className="Login__EmailAddress">
            <EmailIcon />
            <input type="text" placeholder="Email Address" />
          </div>
          <div className="Login__Password">
            <LockIcon />
            <input type="text" placeholder="Password" />
          </div>
          <Button>Create Account</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
