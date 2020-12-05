import React, { useState, useEffect, Fragment } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SendIcon from "@material-ui/icons/Send";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Suggestions from "./Suggestions/Suggestions";
import Trends from "./Suggestions/Trends";
import Posts from "./Posts/Posts";
import OnlineUsers from "./ActiveUsers/OnlineUsers";
import OfflineUsers from "./ActiveUsers/OfflineUsers";
import { userInformation } from "../reducerSlices/authSlicer";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import db, { storage } from "./firebase";
import { Alert, Skeleton } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import firebase from "firebase";

const SocialMediaBody: React.FC = () => {
  const user = useSelector(userInformation);

  const [followers, setFollowers] = useState<any>([]);
  const [following, setFollowing] = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);

  const [textValue, setTextValue] = useState<any>("");
  const [emojiDisplay, setEmojiDisplay] = useState<boolean>(false);
  const [favorite, setFavourite] = useState(false);
  const [emojiAdd, setEmojiAdd] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [imageName, setImageName] = useState<any>("");

  const [submitLoader, setSubmitLoader] = useState(false);

  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [failMessage, setFailMessage] = useState<boolean | string>(false);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.id)
        .collection("followers")
        .onSnapshot((snapshot) => {
          setFollowers(snapshot.docs.map((doc) => doc.data()));
        });

      db.collection("users")
        .doc(user.id)
        .collection("following")
        .onSnapshot((snapshot) => {
          setFollowing(snapshot.docs.map((doc) => doc.data()));
        });

      db.collection("users")
        .doc(user.id)
        .collection("posts")
        .onSnapshot((snapshot) => {
          setPosts(snapshot.docs.map((doc) => doc.data()));
        });
    }

    setProfileLoading(false);
  }, [user]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
    if (e.target.value) {
      setFailMessage("");
    }
  };

  const addEmojiInput = (e: any) => {
    let emoji = e.native;
    setTextValue(textValue + " " + emoji + " ");
    setEmojiDisplay(!emojiDisplay);
    setEmojiAdd(true);
  };

  const emoijFunction = () => {
    if (emojiDisplay) {
      setEmojiDisplay(!emojiDisplay);
    }
  };

  const fileChanger = (e: any) => {
    const file = e.target.files[0];
    setImageName(file);
    if (file) {
      const uploadTask = storage.ref(`/images/${file.name}`).put(file);
      uploadTask.on("state_changed", () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setImage(url);
          });
      });
    }
  };

  const upload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textValue) {
      setFailMessage("Please do not leave the field blank.");
    } else {
      setSubmitLoader(true);
      setFailMessage(false);

      db.collection("posts")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          message: textValue,
          favorite: favorite,
          image: image,
        })
        .then(() => {
          setTextValue("");
          setImage(null);
          setImageName(null);
          setEmojiAdd(false);
          setFavourite(false);
          setSubmitLoader(false);
          setUploadSuccess(true);
        });

      setTimeout(() => setUploadSuccess(false), 2500);
    }
  };

  const resetImage = () => {
    setImage(null);
    setImageName(null);
  };

  return (
    <div className="SocialMediaBody__">
      {/*  <CommentComponent /> */}

      {emojiDisplay && (
        <div className="SocialMediaBody__Overlay" onClick={emoijFunction}></div>
      )}
      <div className="SocialMediaBody__Posts">
        <form className="SocialMediaBody__InputContainer" onSubmit={upload}>
          {uploadSuccess && (
            <Alert severity="success">
              Nice! You have successfully posted a post
            </Alert>
          )}
          {failMessage && <Alert severity="error">{failMessage}</Alert>}
          <div
            className="SocialMediaBody__InputContainerDiv"
            style={
              submitLoader
                ? {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : {}
            }
          >
            {submitLoader ? (
              <CircularProgress
                size={100}
                thickness={2.5}
                className="SocialMediaBody__SubmitLoaderSpinner"
              />
            ) : (
              <textarea
                placeholder={`What's going on ${user?.first_name}?`}
                value={textValue}
                onChange={onChange}
              />
            )}
          </div>
          {imageName && (
            <div
              className="SocialMediaBody__ImageDiv"
              style={submitLoader ? { display: "none" } : {}}
            >
              <ImageIcon />
              <p>{imageName.name}</p>
              <IconButton
                className="SocialMediaBody__CloseButton"
                onClick={resetImage}
              >
                <CloseIcon />
              </IconButton>
            </div>
          )}
          <div
            className="SocialMediaBody__IconsSend"
            style={imageName ? { marginTop: "10px" } : { marginTop: "30px" }}
          >
            {submitLoader ? (
              <div className="SocialMediaBody__SkeletonLoaders">
                <Skeleton animation="wave" style={{ width: "100%" }} />
                <Skeleton animation="wave" style={{ width: "100%" }} />
              </div>
            ) : (
              <div className="Icons__">
                <IconButton className="InputFileBox">
                  <input type="file" onChange={fileChanger} />
                  <PhotoCameraIcon style={image ? { color: "#EB5043" } : {}} />
                </IconButton>
                {emojiDisplay && (
                  <span className="emoji__picker">
                    <Picker onSelect={addEmojiInput} />
                  </span>
                )}
                <IconButton
                  className="Emoji__Button"
                  onClick={() => setEmojiDisplay(!emojiDisplay)}
                >
                  <EmojiEmotionsIcon
                    style={emojiAdd ? { color: "#F0CD0D" } : {}}
                  />
                </IconButton>
                <IconButton onClick={() => setFavourite(!favorite)}>
                  <BookmarkIcon style={favorite ? { color: "#FF786D" } : {}} />
                </IconButton>
              </div>
            )}

            <Button type="submit" className="SendBtn">
              {submitLoader ? (
                <p>Sending...</p>
              ) : (
                <Fragment>
                  <p>Send</p>
                  <SendIcon className="SendIcon" />
                </Fragment>
              )}
            </Button>
          </div>
        </form>
        <div className="SocialMediaBody__PostsBody">
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
        </div>
      </div>
      <div className="SocialMediaBody__ProfileTrends">
        <div className="SocialMediaBodyProfile__Profile">
          <div className="SocialMediaBodyProfile__Header">
            <h1>DynoBook</h1>
          </div>
          <div className="SocialMediaBodyProfile__ProfileInformation">
            {profileLoading ? (
              <Fragment>
                <div className="SocialMediaProfile__Info">
                  <div className="AvatarProfile skeleton">
                    <div className="Avatar__Div">
                      <Skeleton
                        variant="circle"
                        animation="wave"
                        className="Avatar__Skeleton"
                      />
                    </div>
                    <div className="Name">
                      <div className="Name__H1_Icon">
                        <Skeleton
                          animation="wave"
                          className="SocialMediaBody__Skeleton"
                        />
                      </div>
                      <Skeleton
                        animation="wave"
                        className="SocialMediaBody__Skeleton"
                      />
                    </div>
                  </div>
                </div>
                <div className="SocialMediaProfile__Followers loading">
                  <div className="Posts">
                    <Skeleton
                      animation="wave"
                      className="SocialMediaBody__Skeleton"
                    />
                    <Skeleton
                      animation="wave"
                      className="SocialMediaBody__Skeleton"
                    />
                  </div>
                  <div className="Posts">
                    <Skeleton
                      animation="wave"
                      className="SocialMediaBody__Skeleton"
                    />
                    <Skeleton
                      animation="wave"
                      className="SocialMediaBody__Skeleton"
                    />
                  </div>
                  <div className="Posts">
                    <Skeleton
                      animation="wave"
                      className="SocialMediaBody__Skeleton"
                    />
                    <Skeleton
                      animation="wave"
                      className="SocialMediaBody__Skeleton"
                    />
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="SocialMediaProfile__Info">
                  <div className="AvatarProfile">
                    <div className="Avatar__Div">
                      <Avatar
                        src={user?.image && user.image}
                        className="Avatar"
                      >
                        {`${!user?.image && user?.username?.charAt(0)}`}
                      </Avatar>
                      <div className="Avatar__Edit">
                        <p>
                          <CreateIcon />
                          Edit
                        </p>
                      </div>
                    </div>
                    <div className="Name">
                      <div className="Name__H1_Icon">
                        <h1>
                          {user?.first_name} {user?.last_name?.charAt(0)}.
                        </h1>
                        <CheckCircleIcon />
                      </div>
                      <p>@{user?.username}</p>
                    </div>
                  </div>
                </div>
                <div className="SocialMediaProfile__Followers">
                  <div className="Posts">
                    <h4>POSTS</h4>
                    <h2>{posts?.length}</h2>
                  </div>
                  <div className="Posts">
                    <h4>FOLLOWING</h4>
                    <h2>{following?.length}</h2>
                  </div>
                  <div className="Posts">
                    <h4>FOLLOWERS</h4>
                    <h2>{followers?.length}</h2>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
        <div className="SocialMediaBody__Suggestions">
          <h3>Suggestions</h3>
          <div className="SocialMediaBody__SuggestionsResults">
            <Suggestions />
            <Suggestions />
            <Suggestions />
          </div>
        </div>
        <div className="SocialMediaBody__Trends">
          <h3>Trends</h3>
          <div className="SocialMediaBody__TrendsBody">
            <Trends paragraph="Manchester United" />
            <Trends paragraph="Liverpool" />
            <Trends paragraph="Chelsea" />
            <Trends paragraph="Real Madrid" />
            <Trends paragraph="Manchester City" />
          </div>
        </div>
      </div>
      <div className="SocialMediaBody__OnlineOfflineUsers">
        <div className="SocialMediaBody__Online">
          <p className="SocialMediaBody__OnlineText">ONLINE</p>
          <OnlineUsers />
          <OnlineUsers />
          <OnlineUsers />
          <OnlineUsers />
          <OnlineUsers />
          <OnlineUsers />
        </div>
        <div className="SocialMediaBody__OfflineContainer">
          <p className="SocialMediaBody__OfflineText">OFFLINE</p>
          <OfflineUsers />
          <OfflineUsers />
          <OfflineUsers />
          <OfflineUsers />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBody;
