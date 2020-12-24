import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import HomeIcon from "@material-ui/icons/Home";
import { Avatar, CircularProgress, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { profile_picture, userInformation } from "../reducerSlices/authSlicer";
import MenuIcon from "@material-ui/icons/Menu";
import db from "./firebase";
import NavigationBarUsers from "./NavigationBarUsers";
import { setNavBar } from "../reducerSlices/appSlicer";
import { setUserId, userId } from "../reducerSlices/postSlicer";
import { Link } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const user_profile = useSelector(profile_picture);
  const user = useSelector(userInformation);
  const [listOfUsers, setListOfUsers] = useState<any>([]);
  const [modalUsers, setModalUsers] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("user").onSnapshot((snapshot) =>
      setListOfUsers(
        snapshot.docs.map((doc) => ({ id: doc.id, users: doc.data() }))
      )
    );
  }, []);

  const arratFiltered = listOfUsers?.filter(
    (item: any) =>
      item.users.full_name.toLowerCase().indexOf(inputValue.toLowerCase()) !==
        -1 ||
      item.users.username.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
  );

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (e.target.value !== "") {
      setModalUsers(true);
      setLoader(false);
    } else {
      setLoader(true);
      setModalUsers(false);
    }
  };

  const onClickUser = (id: string) => {
    dispatch(setUserId(id));
    setModalUsers(false);
    setInputValue("");
  };

  return (
    <nav className="NavigationBar">
      <div className="NavigationBar__Input">
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={onChangeInputValue}
        />
        <SearchIcon />
      </div>
      {modalUsers && (
        <div
          className="NavigationBar__Modal"
          style={loader ? { alignItems: "center" } : {}}
        >
          {loader ? (
            <CircularProgress className="NavigationBar__Spinner" size={50} />
          ) : arratFiltered.length === 0 ? (
            <p
              style={{ textAlign: "center", padding: "15px", fontWeight: 500 }}
            >
              No Users Found
            </p>
          ) : (
            arratFiltered.map(({ id, users }: any) => (
              <NavigationBarUsers
                onClickUser={() => onClickUser(id)}
                id={id}
                key={id}
                item={users}
              />
            ))
          )}
        </div>
      )}
      <Link to="/Home" style={{ textDecoration: "none" }}>
        <h1 className="NavigationBar__TitleLogo">DynoBook</h1>
      </Link>
      <div className="NavigationBar__ProfilePicture">
        <Link to="/Home">
          <IconButton className="NavigationBar__HomeIcon">
            <HomeIcon />
          </IconButton>
        </Link>
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
      <IconButton
        className="NavigationBar__HamburgerMenu"
        onClick={() => dispatch(setNavBar(true))}
      >
        <MenuIcon />
      </IconButton>
    </nav>
  );
};

export default NavigationBar;
