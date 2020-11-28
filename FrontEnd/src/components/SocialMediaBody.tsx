import React from "react";
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

const SocialMediaBody: React.FC = () => {
  return (
    <div className="SocialMediaBody__">
      <div className="SocialMediaBody__Posts">
        <div className="SocialMediaBody__InputContainer">
          <div className="SocialMediaBody__InputContainerDiv">
            <textarea placeholder="What's going on Mago?" />
          </div>
          <div className="SocialMediaBody__IconsSend">
            <div className="Icons__">
              <IconButton>
                <PhotoCameraIcon />
              </IconButton>
              <IconButton>
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
          <div className="SocialMediaBodyProfile__Header"></div>
          <div className="SocialMediaBodyProfile__ProfileInformation">
            <div className="SocialMediaProfile__Info">
              <div className="AvatarProfile">
                <Avatar
                  src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
                  className="Avatar"
                >
                  H
                </Avatar>
                <div className="Name">
                  <div className="Name__H1_Icon">
                    <h1>Gautham SK</h1>
                    <CheckCircleIcon />
                  </div>
                  <p>@gautham</p>
                </div>
              </div>
            </div>
            <div className="SocialMediaProfile__Followers">
              <div className="Posts">
                <h4>POSTS</h4>
                <h2>1200</h2>
              </div>
              <div className="Posts">
                <h4>FOLLOWING</h4>
                <h2>200</h2>
              </div>
              <div className="Posts">
                <h4>FOLLOWERS</h4>
                <h2>10.2k</h2>
              </div>
            </div>
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
