import React, { useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import "../HomePage.scss";
import HamburgerNavigationBar from "./HamburgerNavigationBar";

const NavigationHome = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="NavigationHome">
      <HamburgerNavigationBar navBar={open} navClose={() => setOpen(!open)} />
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>DynoBook</h1>
      </Link>
      <div className="NavigationHome__Buttons">
        <Link to="/Login" style={{ textDecoration: "none" }}>
          <Button className="NavigatoinHome__LoginButton">Log In</Button>
        </Link>
        <Link to="/Signup" style={{ textDecoration: "none" }}>
          <Button className="NavigationHome__CreateAccountButton">
            Create an Account
          </Button>
        </Link>
      </div>
      <div className="NavigationHamburger" onClick={() => setOpen(!open)}>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default NavigationHome;
