import React from "react";
import { useDispatch } from "react-redux";
import "./Suggestions.scss";
import { Avatar } from "@material-ui/core";
import { setUserId } from "../../reducerSlices/postSlicer";

interface iProps {
  item: any;
  id: string;
}

const Suggestions: React.FC<iProps> = ({ id, item, children }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="Suggestions"
      id={id}
      onClick={() => dispatch(setUserId(id))}
    >
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
              {item.first_name} <span>{item.last_name}</span>
            </h4>
            <p>@{item.username}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Suggestions;
