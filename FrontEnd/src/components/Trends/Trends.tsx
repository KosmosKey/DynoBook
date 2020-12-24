import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase";
import "./TrendsPage.scss";
import { Grid, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import TrendsPosts from "./TrendsPosts";
import {
  trends_name,
  trends_id,
  trends_loader,
} from "../../reducerSlices/appSlicer";
import db from "../firebase";
import {
  profile_picture,
  userInformation,
} from "../../reducerSlices/authSlicer";

const Trends: React.FC = () => {
  const trendsName = useSelector(trends_name);
  const trendId = useSelector(trends_id);
  const loadingTrends = useSelector(trends_loader);

  const [trendIdArray, setTrendIdArray] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");

  const user = useSelector(userInformation);
  const profilePicture = useSelector(profile_picture);

  useEffect(() => {
    if (trendId) {
      db.collection("trends")
        .doc(trendId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setTrendIdArray(
            snapshot.docs.map((doc) => ({ id: doc.id, trend: doc.data() }))
          );
        });
    }
  }, [trendId]);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    db.collection("trends")
      .doc(trendId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        value: inputValue,
        full_name: `${user?.first_name} ${user?.last_name}`,
        avatar: profilePicture,
      });
    setInputValue("");
  };

  return (
    <div className="TrendsPage">
      <header>
        <h1>#{trendsName && trendsName}</h1>
      </header>

      <section
        className="TrendsPageSection"
        style={
          trendIdArray?.length === 0
            ? { alignItems: "center", justifyContent: "center" }
            : {}
        }
      >
        {trendIdArray?.length === 0 ? (
          <h1 className="NoResults">
            Be the first one to post in #{trendsName}&nbsp;
            <span>😎</span>
          </h1>
        ) : (
          <Grid container justify="center" direction="row" spacing={7}>
            {trendIdArray?.map(({ id, trend }: any) => (
              <Grid item key={id}>
                <TrendsPosts
                  avatar={trend.avatar}
                  trendHashtag={trendsName}
                  key={id}
                  paragraph={trend?.value}
                  fullName={trend?.full_name}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </section>
      <div className="Trends__InputField">
        <form className="Trends__Input" onSubmit={submitForm}>
          <input
            type="text"
            placeholder={`Send a post to #${trendsName && trendsName}`}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          <IconButton type="submit" className="Trends__SendIcon">
            <SendIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
};

export default Trends;
