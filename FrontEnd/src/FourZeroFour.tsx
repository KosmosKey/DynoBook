import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { userInformation } from "./reducerSlices/authSlicer";

const FourZeroFour: React.FC = () => {
  const user = useSelector(userInformation);
  return (
    <div className="FourZeroFour">
      <div className="FourZeroFour__Div">
        <h1>404</h1>
        <h3>Sorry, page not found</h3>
        <Link to={user ? "/Home" : "/"} style={{ textDecoration: "none" }}>
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
};

export default FourZeroFour;
