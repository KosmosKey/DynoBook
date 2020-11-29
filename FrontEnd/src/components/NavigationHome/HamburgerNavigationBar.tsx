import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Hamburger.scss";

interface NavigationProps {
  navBar: boolean;
  navClose: () => any;
}

const HamburgerNavigationBar: React.FC<NavigationProps> = ({
  navBar,
  navClose,
}) => {
  return (
    <div className={`HamburgerNavigationBar ${navBar && "active"}`}>
      <div className="HamburgerContainer">
        <Link
          to="/"
          style={{ textDecoration: "none", width: "100%" }}
          onClick={navClose}
        >
          <h1>DynoBook</h1>
        </Link>
        <Link to="/" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            className="HamburgerNavigationbar__ButtonOne"
            onClick={navClose}
          >
            Home
          </Button>
        </Link>
        <Link to="/Login" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            className="HamburgerNavigationbar__ButtonOne"
            onClick={navClose}
          >
            Log In
          </Button>
        </Link>
        <Link to="/Signup" style={{ textDecoration: "none", width: "100%" }}>
          <Button
            className="HamburgerNavigationbar__ButtonTwo"
            onClick={navClose}
          >
            Create Account
          </Button>
        </Link>
      </div>
      <div className="HamburgerNavigtaionBar__Black" onClick={navClose}></div>
    </div>
  );
};

export default HamburgerNavigationBar;
