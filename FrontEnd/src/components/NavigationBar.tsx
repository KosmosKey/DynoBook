import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./NavBar.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { profile_picture, userInformation } from "../reducerSlices/authSlicer";
import MenuIcon from "@material-ui/icons/Menu";
import db from "./firebase";
import NavigationBarUsers from "./NavigationBarUsers";

const NavigationBar: React.FC = () => {
  const user_profile = useSelector(profile_picture);
  const user = useSelector(userInformation);
  const [listOfUsers, setListOfUsers] = useState<any>([]);
  const [modalUsers, setModalUsers] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    db.collection("user").onSnapshot((snapshot) =>
      setListOfUsers(
        snapshot.docs.map((doc) => ({ id: doc.id, users: doc.data() }))
      )
    );
  }, []);

  const arratFiltered = listOfUsers.filter(
    (item: any) =>
      item.users.full_name.toLowerCase().indexOf(inputValue.toLowerCase()) !==
        -1 ||
      item.users.username.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
  );

  return (
    <nav className="NavigationBar">
      <div className="NavigationBar__Input">
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
        <SearchIcon />
      </div>
      <div className="NavigationBar__Modal">
        {arratFiltered.map(({ id, users }: any) => (
          <NavigationBarUsers id={id} key={id} item={users} />
        ))}
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
        <Avatar
          src={user_profile && user_profile}
          style={{ background: "#EB5043" }}
        >
          {!user_profile && user.first_name.charAt(0)}
        </Avatar>
      </div>
      <IconButton className="NavigationBar__HamburgerMenu">
        <MenuIcon />
      </IconButton>
    </nav>
  );
};

export default NavigationBar;
