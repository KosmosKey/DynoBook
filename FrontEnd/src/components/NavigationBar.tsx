import React from "react";
import "./NavBar.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const NavigationBar: React.FC = () => {
  return (
    <nav className="NavigationBar">
      <div className="NavigationBar__Input">
        <input type="text" placeholder="Search" />
        <SearchIcon />
      </div>
      <h1 className="NavigationBar__TitleLogo">DynoBook</h1>
      <div className="NavigationBar__ProfilePicture">
        <IconButton className="NavigationBar__HomeIcon">
          <HomeIcon />
        </IconButton>
        <IconButton className="NavigationBar__ChatIcon">
          <ChatBubbleIcon />
        </IconButton>
        <IconButton className="NavigationBar__NofiticationIcon">
          <NotificationsIcon />
        </IconButton>
        <Avatar>H</Avatar>
      </div>
    </nav>
  );
};

export default NavigationBar;
