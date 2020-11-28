import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./Posts.scss";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import TextsmsOutlinedIcon from "@material-ui/icons/TextsmsOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const Posts: React.FC = () => {
  return (
    <div className="Posts__">
      <div className="Posts__Image"></div>
      <div className="Posts__NameInformation">
        <div className="Posts__Name">
          <div className="Posts__AvatarTitle">
            <Avatar
              className="Avatar"
              src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
            />
            <div className="Posts__NameUsername">
              <h3>Niclas Ernst</h3>
              <p>@Niclas</p>
            </div>
          </div>
          <span>Tuesday, November 17, 2020</span>
        </div>
        <div className="Posts__Paragraph">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            unde consequuntur nihil quisquam eveniet, est debitis a expedita
            voluptatum non veritatis alias optio officiis hic similique,
            voluptates sapiente recusandae? Nihil? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nihil alias eveniet iusto nesciunt
            maiores soluta unde esse odio ex rerum sit a accusantium, adipisci
            atque ea in possimus dicta corrupti! Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Tenetur unde consequuntur nihil
            quisquam eveniet, est debitis a expedita voluptatum non veritatis
            alias optio officiis hic similique, voluptates sapiente recusandae?
            Nihil? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nihil alias eveniet iusto nesciunt maiores soluta unde esse odio ex
            rerum sit a accusantium, adipisci atque ea in possimus dicta
            corrupti! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Tenetur unde consequuntur nihil quisquam eveniet, est debitis a
            expedita voluptatum non veritatis alias optio officiis hic
            similique, voluptates sapiente recusandae? Nihil? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Nihil alias eveniet iusto
            nesciunt maiores soluta unde esse odio ex rerum sit a accusantium,
            adipisci atque ea in possimus dicta corrupti!
          </p>
        </div>
        <div className="Posts__LikesComments">
          <div className="Posts__Icons">
            <div className="PostIconButton favourite">
              <IconButton>
                <FavoriteBorderOutlinedIcon className="HeartIcon" />
              </IconButton>
              <p>25</p>
            </div>
            <div className="PostIconButton messagebtn">
              <IconButton>
                <TextsmsOutlinedIcon className="MessageOutline" />
              </IconButton>
              <p>35</p>
            </div>
            <div className="PostIconButton sharebtn">
              <IconButton>
                <ShareOutlinedIcon className="ShareIcon" />
              </IconButton>
            </div>
          </div>
          <div className="Posts__Location">
            <p>London, United Kingdom</p>
            <LocationOnIcon className="LocationIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
