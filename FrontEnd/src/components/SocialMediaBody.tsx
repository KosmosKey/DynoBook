import React, { useState, useEffect, Fragment } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CircularProgress,
  Icon,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SendIcon from "@material-ui/icons/Send";
import Suggestions from "./Suggestions/Suggestions";
import Trends from "./Suggestions/Trends";
import Posts from "./Posts/Posts";
import OnlineUsers from "./ActiveUsers/OnlineUsers";
import { userInformation } from "../reducerSlices/authSlicer";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import db, { storage } from "./firebase";
import { Alert, Skeleton } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  profile_picture,
  setProfilePicture,
} from "../reducerSlices/authSlicer";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import {
  commentId,
  setCommentId,
  setUserNull,
  userId,
} from "../reducerSlices/postSlicer";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import firebase from "firebase";
import CommentComponent from "./LikesComment/CommentComponent";
import { closeNavBar, navBarBolean } from "../reducerSlices/appSlicer";

const useStyles = makeStyles((theme: any) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 400,
    backgroundColor: "#fff",
    border: "2px solid #EB5043",
    boxShadow: theme.shadows[5],
    outline: "none",
  },
}));

const SocialMediaBody: React.FC = () => {
  const classes = useStyles();

  const user = useSelector(userInformation);
  const user_profile = useSelector(profile_picture);
  const idComment = useSelector(commentId);
  const dispatch = useDispatch();

  const user_id = useSelector(userId);

  const navigationBarBolean = useSelector(navBarBolean);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [followers, setFollowers] = useState<any>([]);
  const [following, setFollowing] = useState<any>([]);
  const [collection, setCollection] = useState<any>([]);
  const [collectionLoader, setCollectionLoader] = useState<boolean>(true);

  const [comments, setComments] = useState<any>([]);
  const [commentLoader, setCommentLoader] = useState<boolean>(false);
  const [userFollowing, setUserFollowing] = useState<any>([]);

  const [textValue, setTextValue] = useState<string>("");
  const [emojiDisplay, setEmojiDisplay] = useState<boolean>(false);
  const [favorite, setFavourite] = useState(false);
  const [emojiAdd, setEmojiAdd] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [imageName, setImageName] = useState<any>("");
  const [posts, setPosts] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);

  const [commentComponentBolean, setCommentComponentBolean] = useState<boolean>(
    false
  );

  const [userinformationProfile, setUserinformationProfile] = useState<any>(
    null
  );

  const [submitLoader, setSubmitLoader] = useState(false);
  const [suggestionUsers, setSuggestionUser] = useState<any>([]);

  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [failMessage, setFailMessage] = useState<boolean | string>(false);
  const [profilePictureFailed, setProfilePictureFailed] = useState<string>("");
  const [likePostsUser, setLikesPostsUser] = useState<any>([]);

  const [detectFollowers, setDetectFollowers] = useState<any>(null);
  const [detectFollowing, setDetectFollowing] = useState<any>(null);
  const [detectPosts, setDetectPosts] = useState<any>(null);

  useEffect(() => {
    if (idComment) {
      setCommentLoader(true);
      db.collection("posts")
        .doc(idComment)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ id: doc.id, posts: doc.data() }))
          );
          setCommentLoader(false);
        });
    }
  }, [idComment]);

  useEffect(() => {
    if (!idComment && comments) {
      dispatch(setCommentId(collection[0]?.id));
    }
  }, [collection, dispatch, comments, idComment]);

  useEffect(() => {
    db.collection("user").onSnapshot((snapshot) =>
      setSuggestionUser(
        snapshot.docs.map((doc) => ({ id: doc.id, suggestion: doc.data() }))
      )
    );
  }, []);

  useEffect(() => {
    if (user) {
      db.collection("user")
        .doc(user.id)
        .collection("followers")
        .onSnapshot((snapshot) => {
          setFollowers(snapshot.docs.map((doc) => doc.data()));
        });

      db.collection("user")
        .doc(user.id)
        .collection("followingUsers")
        .onSnapshot((snapshot) => {
          setFollowing(snapshot.docs.map((doc) => doc.data()));
        });

      db.collection("user")
        .doc(user.id)
        .collection("posts")
        .onSnapshot((snapshot) => {
          setPosts(snapshot.docs.map((doc) => doc.data()));
        });

      db.collection("user")
        .doc(user.id)
        .collection("likes")
        .onSnapshot((snapshot) =>
          setLikesPostsUser(snapshot.docs.map((doc) => doc.id.toString()))
        );

      db.collection("user")
        .doc(user.id)
        .collection("followingUsers")
        .onSnapshot((snapshot) => {
          setUserFollowing(snapshot.docs.map((doc) => doc.id.toString()));
        });

      db.collection("user")
        .doc(user.id)
        .onSnapshot((snapshot) => {
          dispatch(setProfilePicture(snapshot?.data()?.profile_picture));
          setProfileLoading(false);
        });
    }
  }, [user, dispatch]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setCollection(
          snapshot.docs.map((doc) => ({ id: doc.id, posts: doc.data() }))
        );
        setCollectionLoader(false);
      });
  }, []);

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

    if (file) {
      if (file.size > 3097152) {
        setFailMessage("Your image has more than 3 MB");
      } else if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        setFailMessage("Please select valid image");
      } else {
        setSubmitLoader(true);
        setFailMessage("");

        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on("state_changed", () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              setImage(url);
              setImageName(file);
              setSubmitLoader(false);
            });
        });
      }
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
          profile_picture: user_profile,
          image: image,
          likesCount: 0,
        })
        .then(() => {
          setImage(null);
          setImageName(null);
          setSubmitLoader(false);
          setTextValue("");
          setEmojiAdd(false);
          setFavourite(false);
          setUploadSuccess(true);
        });

      db.collection("user")
        .doc(user.id)
        .collection("posts")
        .add({ message: textValue });

      setTimeout(() => setUploadSuccess(false), 2500);
    }
  };

  const resetImage = () => {
    setImage(null);
    setImageName(null);
  };

  const profilePictureChanger = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3097152) {
        setProfilePictureFailed("Your image has more than 3 MB");
      } else if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        setProfilePictureFailed("Please select valid image");
      } else {
        setProfilePictureFailed("");

        const uploadTask = storage
          .ref(`/profile_picture/${file.name}`)
          .put(file);
        uploadTask.on("state_changed", () => {
          storage
            .ref("profile_picture")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              if (url) {
                setImagePreview(url);
                setProfilePictureFailed("");
                setModalOpen(true);
              }
            });
        });
      }
    }
  };

  const uploadProfilePicture = () => {
    setProfileLoading(true);

    db.collection("user")
      .doc(user.id)
      .update({
        profile_picture: imagePreview,
      })
      .then(() => {
        setProfilePictureFailed("");
        setModalOpen(false);
        setImage(null);
        setProfileLoading(false);
      });
  };

  const cancelProfilePicture = () => {
    setModalOpen(false);
    setProfilePictureFailed("");
    setImagePreview(null);
  };

  const likePost = (id: string) => {
    db.collection("user")
      .doc(user.id)
      .collection("likes")
      .doc(id)
      .set({ uuid: id });

    db.collection("posts")
      .doc(id)
      .update({ likesCount: firebase.firestore.FieldValue.increment(+1) });
  };

  const removeLike = (id: string) => {
    db.collection("user").doc(user.id).collection("likes").doc(id).delete();

    db.collection("posts")
      .doc(id)
      .update({ likesCount: firebase.firestore.FieldValue.increment(-1) });
  };

  const followUser = (userId: string) => {
    db.collection("user")
      .doc(user.id)
      .collection("followingUsers")
      .doc(userId)
      .set({ uuid: userId });

    db.collection("user")
      .doc(userId)
      .collection("followers")
      .doc(user.id)
      .set({ uuid: user.id });
  };

  const unfollowUser = (id: string) => {
    db.collection("user")
      .doc(user.id)
      .collection("followingUsers")
      .doc(id)
      .delete();

    db.collection("user").doc(id).collection("followers").doc(user.id).delete();
  };

  useEffect(() => {
    if (user_id) {
      db.collection("user")
        .doc(user_id)
        .onSnapshot((snapshot) => {
          setUserinformationProfile({ id: snapshot.id, user: snapshot.data() });
          setCommentComponentBolean(true);
        });

      db.collection("user")
        .doc(user_id)
        .collection("followingUsers")
        .onSnapshot((snapshot) => {
          setDetectFollowing(snapshot.docs.map((doc) => doc.data()));
        });

      db.collection("user")
        .doc(user_id)
        .collection("posts")
        .onSnapshot((snapshot) => {
          setDetectPosts(snapshot.docs.map((doc) => doc.data()));
        });

      db.collection("user")
        .doc(user_id)
        .collection("followers")
        .onSnapshot((snapshot) => {
          setDetectFollowers(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [user_id, dispatch]);

  const closeCommentComponent = () => {
    setCommentComponentBolean(false);
    dispatch(setUserNull(null));
  };
  return (
    <div className="SocialMediaBody__">
      <div className={`overlayNavBar ${navigationBarBolean && "active"}`}></div>
      {commentComponentBolean && (
        <CommentComponent
          followers={detectFollowers}
          following={detectFollowing}
          posts={detectPosts}
          closeBrowser={closeCommentComponent}
          arrayFollowing={userFollowing}
          id={userinformationProfile.id}
          user={userinformationProfile.user}
        />
      )}
      {modalOpen && (
        <Modal onClose={cancelProfilePicture}>
          <div className={classes.paper}>
            <h2
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",

                color: "#141414",
              }}
            >
              <AccountBoxIcon
                style={{ color: "#141414", marginRight: "10px" }}
              />
              Edit Profile Picture
            </h2>
            <p style={{ padding: "15px", marginTop: "5px", color: "#696969" }}>
              Are you sure that you want to edit your profile picture?
            </p>
            <div
              style={{
                display: "flex",
                borderTop: "1px solid #979797",
                marginTop: "10px",
              }}
            >
              <Button
                style={{
                  background: "#EB5043",
                  color: "#fff",
                  width: "100%",
                  borderRadius: "0px",
                }}
                onClick={uploadProfilePicture}
              >
                Yes, Change
              </Button>
              <Button
                style={{
                  background: "#fff",
                  color: "#EB5043",
                  width: "100%",
                  borderRadius: "0px",
                }}
                onClick={cancelProfilePicture}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
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
                  <PhotoCameraIcon
                    style={imageName ? { color: "#EB5043" } : {}}
                  />
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
                  <p className="SocialMediaBody__SendParagraph">Send</p>
                  <SendIcon className="SendIcon" />
                </Fragment>
              )}
            </Button>
          </div>
        </form>
        <div
          className="SocialMediaBody__PostsBody"
          style={
            collectionLoader
              ? { display: "flex", justifyContent: "center" }
              : {}
          }
        >
          {collectionLoader ? (
            <CircularProgress
              size={125}
              thickness={2}
              className="SocialMediaBody__Loader"
            />
          ) : (
            collection.map(({ id, posts }: any) => (
              <Posts
                loading={commentLoader}
                comments={comments}
                id={id}
                key={id}
                imagePost={posts.image}
                item={posts}
              >
                {likePostsUser.includes(id) ? (
                  <Fragment>
                    <IconButton onClick={() => removeLike(id)}>
                      <FavoriteIcon style={{ color: "#EB5043" }} />
                    </IconButton>
                    <p style={{ color: "#EB5043" }}>{posts?.likesCount}</p>
                  </Fragment>
                ) : (
                  <Fragment>
                    <IconButton onClick={() => likePost(id)}>
                      <FavoriteBorderIcon style={{ color: "#A7A7A7" }} />
                    </IconButton>
                    <p>{posts?.likesCount}</p>
                  </Fragment>
                )}
              </Posts>
            ))
          )}
        </div>
      </div>
      <div
        className={`SocialMediaBody__ProfileTrends ${
          navigationBarBolean && "active"
        }`}
      >
        <IconButton
          className="SocialMediaBody__CloseIcon"
          onClick={() => dispatch(closeNavBar(false))}
        >
          <CloseIcon className="SocialMediaBody__CloseIconMuiSvg" />
        </IconButton>
        <div className="SocialMediaBodyProfile__Profile">
          <div
            className="SocialMediaBodyProfile__Header"
            style={
              profileLoading
                ? {
                    background: "#fff",
                  }
                : { background: "#eb5043" }
            }
          >
            {!profileLoading && <h1>{user?.first_name}</h1>}
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
                        src={user_profile && user_profile}
                        className="Avatar"
                        style={
                          user_profile && user_profile && { background: "#fff" }
                        }
                      >
                        {`${!user_profile && user?.first_name?.charAt(0)}`}
                      </Avatar>

                      <div className="Avatar__Edit">
                        <input type="file" onChange={profilePictureChanger} />

                        <p>
                          <CreateIcon />
                          <span>Edit</span>
                        </p>
                      </div>
                    </div>
                    <div className="Name">
                      <div className="Name__H1_Icon">
                        <h1>
                          {user?.first_name} {user?.last_name?.charAt(0)}.
                        </h1>
                      </div>
                      <p>@{user?.username}</p>
                    </div>
                  </div>
                </div>
                {profilePictureFailed && (
                  <Alert
                    severity="error"
                    style={{
                      width: "100%",
                      maxWidth: "350px",
                      margin: "0 auto",
                      marginTop: "23px",
                    }}
                  >
                    {profilePictureFailed}
                  </Alert>
                )}
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
            {suggestionUsers.map(({ id, suggestion }: any) => (
              <Suggestions key={id} item={suggestion}>
                {userFollowing.includes(id) ? (
                  <IconButton
                    className="Suggestions__AddButton Following"
                    onClick={() => unfollowUser(id)}
                  >
                    <CheckCircleIcon className="Suggestions__CheckIcon" />
                  </IconButton>
                ) : (
                  <IconButton
                    className="Suggestions__AddButton"
                    onClick={() => followUser(id)}
                  >
                    <AddCircleOutlineOutlinedIcon className="CircleOutlineIcon" />
                  </IconButton>
                )}
              </Suggestions>
            ))}
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
            <Trends paragraph="Manchester City" />
            <Trends paragraph="Manchester City" />
          </div>
        </div>
      </div>
      <div className="SocialMediaBody__OnlineOfflineUsers">
        <div className="SocialMediaBody__Online">
          <p className="SocialMediaBody__OnlineText">Users</p>
          <OnlineUsers />
          <OnlineUsers />
          <OnlineUsers />
          <OnlineUsers />
          <OnlineUsers />
          <OnlineUsers />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBody;
