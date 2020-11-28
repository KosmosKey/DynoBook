import React from "react";
import { Avatar } from "@material-ui/core";
import "./Users.scss";

const OfflineUsers = () => {
  return (
    <div className="OfflineUsers">
      <div className="OfflineUsers__ProfilePictureName">
        <Avatar
          className="OfflineUsers__Avatar"
          src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
        />
        <div className="OfflineUsers__Name">
          <h3>Arcengelo</h3>
          <p>@FiorceArca</p>
        </div>
      </div>
      <div className="OfflineUsers__ActiveButton" />
    </div>
  );
};

export default OfflineUsers;
