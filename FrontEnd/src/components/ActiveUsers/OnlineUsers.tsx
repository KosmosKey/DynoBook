import React from "react";
import { useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import "./Users.scss";
import { setUserId } from "../../reducerSlices/postSlicer";
import { motion } from "framer-motion";

type users = {
  item: any;
  id: string;
};

const OnlineUsers: React.FC<users> = ({ item, id }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      className="OnlineUsers"
      onClick={() => dispatch(setUserId(id))}
      whileTap={{ scale: 0.9 }}
    >
      <div className="OnlineUsers__ProfilePictureName">
        <Avatar
          className="OnlineUsers__Avatar"
          src={item?.profile_picture && item?.profile_picture}
        >
          {!item?.profile_picture && item?.first_name.charAt(0)}
        </Avatar>
        <div className="OnlineUsers__Name">
          <h3>
            {item.first_name} {item.last_name}
          </h3>
          <p>@{item.username}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default OnlineUsers;
