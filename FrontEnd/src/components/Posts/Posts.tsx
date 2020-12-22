import React, { Fragment, useState } from "react";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton } from "@material-ui/core";
import "./Posts.scss";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import moment from "moment";
import Comment from "./Comment";
import SendIcon from "@material-ui/icons/Send";
import {
  setCommentId,
  commentId,
  setUserId,
} from "../../reducerSlices/postSlicer";
import CircularProgress from "@material-ui/core/CircularProgress";
import db from "../firebase";
import {
  profile_picture,
  userInformation,
} from "../../reducerSlices/authSlicer";

interface iProps {
  imagePost: string;
  item: any;
  id: string;
  comments: any;
  loading: boolean;
}

const Posts: React.FC<iProps> = ({
  id,
  imagePost,
  item,
  children,
  comments,
  loading,
}) => {
  const dispatch = useDispatch();

  const [commentValue, setCommentValue] = useState<string>("");

  const user = useSelector(userInformation);
  const pfp = useSelector(profile_picture);

  const idComment = useSelector(commentId);

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentValue) {
      return null;
    } else {
      db.collection("posts").doc(idComment).collection("comments").add({
        id: user?.id,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        first_name: user?.first_name,
        last_name: user?.last_name,
        username: user?.username,
        profile_picture: pfp,
        message: commentValue,
      });

      setCommentValue("");
    }
  };

  const dispatchFunction = (id: string) => {
    dispatch(setCommentId(id));
    setCommentValue("");
  };

  return (
    <div className="Posts__" id={id}>
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
          <div
            className="Posts__AvatarTitle"
            onClick={() => dispatch(setUserId(item.id))}
          >
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
              <h3>
                {item?.first_name}1111 {item?.last_name.charAt(0)}.
              </h3>
              <p>@{item?.username}</p>
            </div>
          </div>
          <span className="Posts__DateSpan">
            {moment(new Date(item?.timestamp?.toDate()), "YYYYMMDD").fromNow()}
          </span>
        </div>
        <div className="Posts__Paragraph">
          <p>{item?.message}</p>
        </div>
        <div className="Posts__LikesComments">
          <div className="Posts__Icons">
            <div className="PostIconButton favourite">{children}</div>

            <div className="PostIconButton messagebtn">
              <IconButton onClick={() => dispatchFunction(id)}>
                <TextsmsOutlinedIcon
                  className="MessageOutline"
                  style={idComment === id ? { color: "#93e2f8" } : {}}
                />
              </IconButton>
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

      {idComment === id && loading ? (
        <CircularProgress
          thickness={3}
          size={75}
          style={{ color: "#EB5043", marginBottom: "75px" }}
        />
      ) : (
        <div className="Post__Comments">
          {idComment === id && comments !== null && comments.length === 0 && (
            <p className="Post__CommentsNoComments">
              No Comments. Be the first one 😎
            </p>
          )}
          <div className="Post__CommentSection">
            {idComment === id &&
              comments &&
              comments?.map((item: any) => (
                <Comment key={item.id} post={item?.posts} />
              ))}
          </div>

          {id === idComment && (
            <form className="PostCommentsInput" onSubmit={submitComment}>
              <input
                type="text"
                placeholder="Write your comments here..."
                value={commentValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCommentValue(e.target.value)
                }
              />
              <IconButton
                type="submit"
                disabled={!commentValue}
                style={!commentValue ? { opacity: 0.4 } : { opacity: 1 }}
              >
                <SendIcon className="PostComment__PostIcon" />
              </IconButton>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
