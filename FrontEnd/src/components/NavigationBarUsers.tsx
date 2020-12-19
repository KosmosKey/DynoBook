import React from "react";
import { useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import { setUserId } from "../reducerSlices/postSlicer";

type userProps = {
  item: any;
  id: string;
};

const NavigationBarUsers: React.FC<userProps> = ({ item, id }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="NavigationBarUsers"
      id={id}
      onClick={() => dispatch(setUserId(id))}
    >
      <Avatar
        className="NavigationBarUsers__Avatar"
        src={item.profile_picture && item.profile_picture}
      >
        {!item.profile_picture && item.first_name.charAt(0)}
      </Avatar>
      <div className="NavigationBarUsers__Name">
        <h4>
          {item?.first_name} {item?.last_name}
        </h4>
        <p>@{item?.username}</p>
      </div>
    </div>
  );
};

export default NavigationBarUsers;
