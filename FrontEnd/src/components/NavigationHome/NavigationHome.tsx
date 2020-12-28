import React, { useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import "../HomePage.scss";
import HamburgerNavigationBar from "./HamburgerNavigationBar";
import { motion } from "framer-motion";

const NavigationHome = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="NavigationHome">
      <HamburgerNavigationBar navBar={open} navClose={() => setOpen(!open)} />
      <Link to="/" style={{ textDecoration: "none" }}>
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
        >
          DynoBook
        </motion.h1>
      </Link>
      <motion.div
        className="NavigationHome__Buttons"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Link to="/Login" style={{ textDecoration: "none" }}>
          <Button className="NavigatoinHome__LoginButton">Log In</Button>
        </Link>
        <Link to="/Signup" style={{ textDecoration: "none" }}>
          <Button className="NavigationHome__CreateAccountButton">
            Create an Account
          </Button>
        </Link>
      </motion.div>
      <div className="NavigationHamburger" onClick={() => setOpen(!open)}>
        <IconButton>
          <MenuIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default NavigationHome;
