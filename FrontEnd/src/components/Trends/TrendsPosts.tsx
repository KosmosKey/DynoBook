import React from "react";
import { Avatar } from "@material-ui/core";

type trendProps = {
  paragraph: string;
};

const TrendsPosts: React.FC<trendProps> = ({ paragraph }) => {
  return (
    <div className="TrendsPosts">
      <div className="TrendsPosts__Profile">
        <Avatar>M</Avatar>
        <h3>Magomed Khamidov</h3>
      </div>
      <div className="TrendsPosts__Paragraph">
        <p>{paragraph}</p>
      </div>
      <div className="TrendPosts__RepliedTo">
        <p>
          Replied to <span>#Manchester United</span>
        </p>
      </div>
    </div>
  );
};

export default TrendsPosts;
