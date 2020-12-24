import React from "react";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

type userProps = {
  item: any;
  id: string;
  onClickUser: () => any;
};

const NavigationBarUsers: React.FC<userProps> = ({ item, id, onClickUser }) => {
  return (
    <Link to="/Home" style={{ textDecoration: "none" }}>
      <div className="NavigationBarUsers" id={id} onClick={onClickUser}>
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
    </Link>
  );
};

export default NavigationBarUsers;
