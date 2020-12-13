import React from "react";
import { Avatar } from "@material-ui/core";
import moment from "moment";

interface props {
  post: any;
}

const Comment: React.FC<props> = ({ post }) => {
  return (
    <div className="Post__CommentChildren">
      <div className="Post_CommentAvatarName">
        <Avatar
          className="Post__CommentAvatar"
          src={post?.profile_picture && post?.profile_picture}
        >
          {!post?.profile_picture && post?.first_name?.charAt(0)}
        </Avatar>
      </div>
      <div className="Post__CommentResultDiv">
        <div className="Post__CommentUsername">
          <p>
            {post?.first_name} {post?.last_name}
          </p>
          <span>@{post?.username}</span>
        </div>
        <div className="Post__CommentResult">
          <span>
            {moment(new Date(post?.timestamp?.toDate()), "YYYYMMDD").fromNow()}
          </span>
          <p>{post?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
