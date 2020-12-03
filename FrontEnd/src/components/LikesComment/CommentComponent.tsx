import React from "react";
import Comment from "./Comment";
import "./LikesComment.scss";
import { Avatar, Button, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";

const CommentComponent: React.FC = () => {
  return (
    <div className="CommentComponent">
      <div className="Overlay"></div>
      <div className="CommentComponent__OverlayDiv">
        <div className="CommentComponent__UserPost">
          <div className="CommentComponent__AvatarNamePicture">
            <Avatar className="CommentComponent__Avatar">M</Avatar>
            <div className="CommentComponent__AvatarName">
              <h3>Michael</h3>
              <p>@Michael_Smith</p>
            </div>
          </div>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="CommentPosted__Date">
          <p>Date Posted: 28th september</p>
        </div>
        <div className="CommentComponent__Paragraph">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente,
            velit voluptas. Fugiat recusandae numquam accusantium facere
            exercitationem quaerat sequi! Fugiat quaerat inventore quam dolorem
            eveniet quis voluptates veritatis quas error.
          </p>
        </div>
        <div className="CommentComponent__Comments">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
        <div className="CommentComponent__Input">
          <input type="text" placeholder="Post a Comment..." />
          <IconButton>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
