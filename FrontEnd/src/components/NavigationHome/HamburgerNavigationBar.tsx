import { Button } from "@material-ui/core";
import React from "react";
import "./Hamburger.scss";
import HomeIcon from "@material-ui/icons/Home";

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
        <h1>DynoBook</h1>
        <Button
          className="HamburgerNavigationbar__ButtonOne"
          onClick={navClose}
        >
          Home
        </Button>
        <Button
          className="HamburgerNavigationbar__ButtonOne"
          onClick={navClose}
        >
          Log In
        </Button>
        <Button
          className="HamburgerNavigationbar__ButtonTwo"
          onClick={navClose}
        >
          Create Account
        </Button>
      </div>
      <div className="HamburgerNavigtaionBar__Black" onClick={navClose}></div>
    </div>
  );
};

export default HamburgerNavigationBar;
