import React from "react";
import { useDispatch } from "react-redux";
import "./Suggestions.scss";
import { Avatar } from "@material-ui/core";
import { setUserId } from "../../reducerSlices/postSlicer";
import { motion } from "framer-motion";

interface iProps {
  item: any;
  id: string;
}

const Suggestions: React.FC<iProps> = ({ id, item, children }) => {
  const dispatch = useDispatch();

  return (
    <div className="Suggestions" id={id}>
      <div className="Suggestions__Profile">
        <motion.div className="Suggestions__User" whileTap={{ scale: 0.9 }}>
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
            onClick={() => dispatch(setUserId(id))}
          >
            {!item.profile_picture && item.first_name.charAt(0)}
          </Avatar>
          <div
            className="Suggestions__ProfileTitle"
            onClick={() => dispatch(setUserId(id))}
          >
            <h4>
              {item.first_name} <span>{item.last_name}</span>
            </h4>
            <p>@{item.username}</p>
          </div>
        </motion.div>
        {children}
      </div>
    </div>
  );
};

export default Suggestions;
