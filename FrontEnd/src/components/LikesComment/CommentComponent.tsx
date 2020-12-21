import React from "react";
import { useSelector } from "react-redux";
import "./LikesComment.scss";
import { Avatar, Button, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import db from "../firebase";
import { userInformation } from "../../reducerSlices/authSlicer";

type user = {
  user: any;
  id: string;
  arrayFollowing: any;
  closeBrowser: () => any;
  followers: any;
  posts: any;
  following: any;
};

const CommentComponent: React.FC<user> = ({
  id,
  user,
  arrayFollowing,
  closeBrowser,
  followers,
  posts,
  following,
}) => {
  const user_profile = useSelector(userInformation);

  const followUser = (id: string) => {
    db.collection("user")
      .doc(user_profile.id)
      .collection("followingUsers")
      .doc(id)
      .set({ uuid: id });

    db.collection("user")
      .doc(id)
      .collection("followers")
      .doc(user_profile.id)
      .set({ uuid: user_profile.id });
  };

  const unFollow = (id: string) => {
    db.collection("user")
      .doc(user_profile.id)
      .collection("followingUsers")
      .doc(id)
      .delete();

    db.collection("user")
      .doc(id)
      .collection("followers")
      .doc(user_profile.id)
      .delete();
  };

  return (
    <div className="CommentComponent">
      <div className="Overlay" onClick={closeBrowser}></div>
      <div className="CommentComponent__OverlayDiv">
        <IconButton
          className="CommentComponent__CloseBtn"
          onClick={closeBrowser}
        >
          <CloseIcon />
        </IconButton>

        <div className="CommentComponent__AvatarName">
          <Avatar
            className="CommentComponent__Avatar"
            src={user?.profile_picture && user?.profile_picture}
          >
            {!user?.profile_picture && user?.first_name.charAt(0)}
          </Avatar>
          <div className="CommentComponent__Name">
            <div className="CommentComopnent__UsersName">
              <h1>
                {user?.first_name} {user?.last_name}
              </h1>
              <p>@{user?.username}</p>
            </div>
            <div className="CommentComponent__FollowersContainer">
              <div className="CommentComponent__Posts">
                <p>Posts</p>
                <p>{posts?.length}</p>
              </div>
              <div className="CommentComponent__Following">
                <p>Following</p>
                <p>{following?.length}</p>
              </div>
              <div className="CommentComponent__Followers">
                <p>Followers</p>
                <p>{followers?.length}</p>
              </div>
            </div>
            {arrayFollowing.includes(id) ? (
              <Button
                className="CommentComponent__FollowingButton"
                onClick={() => unFollow(id)}
              >
                <p>Following</p>
                <CheckIcon />
              </Button>
            ) : (
              <Button
                className="CommentComponent__FollowButton"
                onClick={() => followUser(id)}
              >
                <p>
                  Follow {user?.first_name} {user?.last_name}
                </p>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
