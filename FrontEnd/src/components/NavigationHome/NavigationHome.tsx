import React, { useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "../HomePage.scss";
import HamburgerNavigationBar from "./HamburgerNavigationBar";

const NavigationHome = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="NavigationHome">
      <HamburgerNavigationBar navBar={open} navClose={() => setOpen(!open)} />
      <h1>DynoBook</h1>
      <div className="NavigationHome__Buttons">
        <Button className="NavigatoinHome__LoginButton">Log In</Button>
        <Button className="NavigationHome__CreateAccountButton">
          Create an Account
        </Button>
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
