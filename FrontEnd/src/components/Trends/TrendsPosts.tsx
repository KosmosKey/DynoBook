import React from "react";
import { Avatar } from "@material-ui/core";

type trendProps = {
  paragraph: string;
  trendHashtag: string;
  fullName: string;
  avatar: string;
};

const TrendsPosts: React.FC<trendProps> = ({
  paragraph,
  trendHashtag,
  fullName,
  avatar,
}) => {
  return (
    <div className="TrendsPosts">
      <div className="TrendsPosts__Profile">
        <Avatar className="TrendsPosts__Avatar" src={avatar && avatar}>
          {!avatar && fullName?.charAt(0)}
        </Avatar>
        <h3>{fullName}</h3>
      </div>
      <div className="TrendsPosts__Paragraph">
        <p>{paragraph}</p>
      </div>
      <div className="TrendPosts__RepliedTo">
        <p>
          Replied to <span>#{trendHashtag}</span>
        </p>
      </div>
    </div>
  );
};

export default TrendsPosts;
