import React, { Fragment } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./Posts.scss";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import moment from "moment";

interface iProps {
  imagePost: string;
  item: any;
}

const Posts: React.FC<iProps> = ({ imagePost, item }) => {
  return (
    <div className="Posts__">
      {item?.image && (
        <div
          style={{
            width: "100%",
            height: "350px",
            borderRadius: "5px 5px 2px 2px",
            backgroundImage: `url(${imagePost})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}
      <div className="Posts__NameInformation">
        <div className="Posts__Name">
          <div className="Posts__AvatarTitle">
            <Avatar
              className="Avatar"
              style={
                !item?.profile_picture
                  ? { background: "#EB5043" }
                  : { background: "#fff" }
              }
              src={item?.profile_picture && item.profile_picture}
            >
              {!item?.profile_picture && (
                <p style={{ fontSize: "25px", fontWeight: "bold" }}>
                  {item?.first_name?.charAt(0)}
                </p>
              )}
            </Avatar>
            <div className="Posts__NameUsername">
              <h3>{item?.first_name}</h3>
              <p>@{item?.username}</p>
            </div>
          </div>
          <span>
            {moment(new Date(item?.timestamp?.toDate()), "YYYYMMDD").fromNow()}
          </span>
        </div>
        <div className="Posts__Paragraph">
          <p>{item?.message}</p>
        </div>
        <div className="Posts__LikesComments">
          <div className="Posts__Icons">
            <div className="PostIconButton favourite">
              <IconButton>
                <FavoriteBorderOutlinedIcon className="HeartIcon" />
              </IconButton>
              <p>{item?.likes}</p>
            </div>
            <div className="PostIconButton messagebtn">
              <IconButton>
                <TextsmsOutlinedIcon className="MessageOutline" />
              </IconButton>
              <p>{item?.likes}</p>
            </div>
          </div>
          <div className="Posts__Location">
            {item?.favorite && (
              <Fragment>
                <p>One of favorite user's post</p>
                <BookmarkIcon className="LocationIcon" />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
