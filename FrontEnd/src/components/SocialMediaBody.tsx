import React, { useState, useEffect, Fragment } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useSelector } from "react-redux";
import { Avatar, Button, IconButton } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SendIcon from "@material-ui/icons/Send";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Suggestions from "./Suggestions/Suggestions";
import Trends from "./Suggestions/Trends";
import Posts from "./Posts/Posts";
import OnlineUsers from "./ActiveUsers/OnlineUsers";
import OfflineUsers from "./ActiveUsers/OfflineUsers";
import { userInformation } from "../reducerSlices/authSlicer";
import CreateIcon from "@material-ui/icons/Create";
import db from "./firebase";
import { Skeleton } from "@material-ui/lab";

const SocialMediaBody: React.FC = () => {
  const user = useSelector(userInformation);

  const [followers, setFollowers] = useState<any>([]);
  const [following, setFollowing] = useState<any>([]);
  const [posts, setPosts] = useState<any>([]);

  const [textValue, setTextValue] = useState<string>("");

  const [emojiDisplay, setEmojiDisplay] = useState<boolean>(false);

  const [profileLoading, setProfileLoading] = useState<boolean>(true);

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
  };

  const addEmojiInput = (e: any) => {
    let emoji = e.native;
    setTextValue(textValue + " " + emoji + " ");
    setEmojiDisplay(!emojiDisplay);
  };

  const emoijFunction = () => {
    if (emojiDisplay) {
      setEmojiDisplay(!emojiDisplay);
    }
  };

  return (
    <div className="SocialMediaBody__">
      {emojiDisplay && (
        <div className="SocialMediaBody__Overlay" onClick={emoijFunction}></div>
      )}
      <div className="SocialMediaBody__Posts">
        <div className="SocialMediaBody__InputContainer">
          <div className="SocialMediaBody__InputContainerDiv">
            <textarea
              placeholder={`What's going on ${user?.first_name}?`}
              value={textValue}
              onChange={onChange}
            />
          </div>
          <div className="SocialMediaBody__IconsSend">
            <div className="Icons__">
              <IconButton>
                <PhotoCameraIcon />
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
                <EmojiEmotionsIcon />
              </IconButton>
              <IconButton>
                <BookmarkIcon />
              </IconButton>
              <IconButton>
                <LocationOnIcon />
              </IconButton>
            </div>
            <Button className="SendBtn">
              Send
              <SendIcon className="SendIcon" />
            </Button>
          </div>
        </div>
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

            {/* <div className="SocialMediaProfile__Info">
              <div className="AvatarProfile">
                <div className="Avatar__Div">
                  <Avatar src={user?.image && user.image} className="Avatar">
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
            </div> */}
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
