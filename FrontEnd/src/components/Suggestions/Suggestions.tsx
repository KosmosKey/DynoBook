import React from "react";
import "./Suggestions.scss";
import { Avatar, IconButton } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

const Suggestions: React.FC = () => {
  return (
    <div className="Suggestions">
      <div className="Suggestions__Profile">
        <div className="Suggestions__User">
          <Avatar
            className="Suggestions__Avatar"
            src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
          />
          <div className="Suggestions__ProfileTitle">
            <h4>Will Peters</h4>
            <p>@will</p>
          </div>
        </div>
        <IconButton className="Suggestions__AddButton">
          <AddCircleOutlineOutlinedIcon className="CircleOutlineIcon" />
        </IconButton>
      </div>
    </div>
  );
};

export default Suggestions;
