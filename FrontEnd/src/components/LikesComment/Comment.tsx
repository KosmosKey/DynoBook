import React from "react";
import { Avatar } from "@material-ui/core";

const Comment = () => {
  return (
    <div className="Comment">
      <div className="Comment__Avatar">
        <Avatar className="Comment__AvatarPicture">M</Avatar>
      </div>
      <div className="Comment__Messages">
        <div className="Comment__TitleReply">
          <h1>SniperCode</h1>
          <p>November 2019, september 20</p>
        </div>

        <div className="Comment__ReplyText">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
            molestiae animi, atque excepturi unde error nostrum deserunt quod
            sed! Autem, veniam. Officiis, sequi necessitatibus! Ducimus unde
            obcaecati excepturi quo ipsa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
