import React from "react";
import "./SignUp.scss";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { Button } from "@material-ui/core";

const SignUp = () => {
  return (
    <div className="SignUp">
      <div className="SignUp__Body">
        <div className="SignUp__Container">
          <h1>Log In</h1>
          <div className="SignUp__UserNameInput">
            <PersonIcon />
            <input type="text" placeholder="Username" />
          </div>
          <div className="SignUp__Password">
            <LockIcon />
            <input type="text" placeholder="Password" />
          </div>
          <Button>Log In</Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
