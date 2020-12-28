import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import HomeIcon from "@material-ui/icons/Home";
import {
  Avatar,
  CircularProgress,
  IconButton,
  Paper,
  Popover,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { profile_picture, userInformation } from "../reducerSlices/authSlicer";
import MenuIcon from "@material-ui/icons/Menu";
import db from "./firebase";
import NavigationBarUsers from "./NavigationBarUsers";
import { setNavBar } from "../reducerSlices/appSlicer";
import { profileLoader } from "../reducerSlices/authSlicer";
import { setUserId } from "../reducerSlices/postSlicer";
import { Link, useHistory } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import { motion } from "framer-motion";

const NavigationBar: React.FC = () => {
  const user_profile = useSelector(profile_picture);
  const user = useSelector(userInformation);
  const [listOfUsers, setListOfUsers] = useState<any>([]);
  const [modalUsers, setModalUsers] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(true);
  const [navShow, setNavShow] = useState<boolean>(false);
  const [anchorElMessage, setAnchorElMessage] = useState<null | any>(null);
  const [anchorElNotification, setAnchorElNotification] = useState<null | any>(
    null
  );

  const history = useHistory();

  const profilePictureLoader = useSelector(profileLoader);

  const dispatch = useDispatch();

  const handlePopOverMessage = (e: any) => {
    setAnchorElMessage(e.currentTarget);
  };

  const handleClosePopOverMessage = (e: any) => {
    setAnchorElMessage(null);
  };

  const handlePopOverNotification = (e: any) => {
    setAnchorElNotification(e.currentTarget);
  };

  const handleClosePopOverNotification = (e: any) => {
    setAnchorElNotification(null);
  };

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setNavShow(true);
    } else {
      setNavShow(false);
    }
  };

  useEffect(() => {
    db.collection("user").onSnapshot((snapshot) =>
      setListOfUsers(
        snapshot.docs.map((doc) => ({ id: doc.id, users: doc.data() }))
      )
    );
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const openMessage = Boolean(anchorElMessage);
  const openNotification = Boolean(anchorElNotification);

  return (
    <nav className={`NavigationBar ${navShow && "changeColor"}`}>
      <motion.div
        className="NavigationBar__Input"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={onChangeInputValue}
        />
        <SearchIcon />
      </motion.div>
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
        <motion.h1
          className="NavigationBar__TitleLogo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          DynoBook
        </motion.h1>
      </Link>
      <motion.div
        className="NavigationBar__ProfilePicture"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Link to="/Home">
          <IconButton className="NavigationBar__HomeIcon">
            <HomeIcon />
          </IconButton>
        </Link>
        <IconButton
          className="NavigationBar__ChatIcon"
          aria-describedby={openMessage ? "popoverMessageBubble" : undefined}
          onClick={handlePopOverMessage}
        >
          <ChatBubbleIcon />
        </IconButton>
        <Popover
          id="mouse-over-popover"
          open={openMessage}
          anchorEl={anchorElMessage}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handleClosePopOverMessage}
        >
          <Paper
            style={{
              maxWidth: "150px",
              padding: "10px",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Messages coming soon...
          </Paper>
        </Popover>
        <IconButton
          className="NavigationBar__NofiticationIcon"
          aria-describedby={
            openNotification ? "popoverNotificationBubble" : undefined
          }
          onClick={handlePopOverNotification}
        >
          <NotificationsIcon />
        </IconButton>
        <Popover
          id="mouse-over-popover"
          open={openNotification}
          anchorEl={anchorElNotification}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          onClose={handleClosePopOverNotification}
        >
          <Paper
            style={{
              maxWidth: "150px",
              padding: "10px",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Notifications coming soon...
          </Paper>
        </Popover>
        {profilePictureLoader ? (
          <Skeleton
            variant="circle"
            className="NavigationBar__Skeleton"
            width={40}
            height={40}
          />
        ) : (
          <Avatar
            src={user_profile && user_profile}
            style={{ background: "#EB5043" }}
            className="NavigationBar__Avatar"
          >
            {!user_profile && user.first_name.charAt(0)}
          </Avatar>
        )}
      </motion.div>
      <IconButton
        className="NavigationBar__HamburgerMenu"
        onClick={() => {
          dispatch(setNavBar(true));
          history.push("/Home");
        }}
      >
        <MenuIcon />
      </IconButton>
    </nav>
  );
};

export default NavigationBar;
