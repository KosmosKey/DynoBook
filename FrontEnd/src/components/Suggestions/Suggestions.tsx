import React from "react";
import "./Suggestions.scss";
import { Avatar, IconButton } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

interface iProps {
  item: any;
}

const Suggestions: React.FC<iProps> = ({ item }) => {
  return (
    <div className="Suggestions">
      <div className="Suggestions__Profile">
        <div className="Suggestions__User">
          <Avatar
            className="Suggestions__Avatar"
            src={item.profile_picture && item.profile_picture}
            style={
              !item.profile_picture
                ? {
                    background: "#EA5043",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }
                : { background: "#fff" }
            }
          >
            {!item.profile_picture && item.first_name.charAt(0)}
          </Avatar>
          <div className="Suggestions__ProfileTitle">
            <h4>
              {item.first_name} {item.last_name}
            </h4>
            <p>@{item.username}</p>
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
