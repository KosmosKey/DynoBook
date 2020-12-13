import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NavBar.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { profile_picture, userInformation } from "../reducerSlices/authSlicer";

const NavigationBar: React.FC = () => {
  const user_profile = useSelector(profile_picture);
  const user = useSelector(userInformation);

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
        <Avatar src={user_profile && user_profile.profile_picture}>
          {!user_profile && user.first_name}
        </Avatar>
      </div>
    </nav>
  );
};

export default NavigationBar;
