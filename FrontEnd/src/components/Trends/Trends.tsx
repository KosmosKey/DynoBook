import React from "react";
import "./TrendsPage.scss";
import { Grid, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import TrendsPosts from "./TrendsPosts";

const Trends: React.FC = () => {
  return (
    <div className="TrendsPage">
      <header>
        <h1>#Machester United</h1>
      </header>

      <section className="TrendsPageSection">
        <Grid container justify="center" direction="row" spacing={7}>
          <Grid item>
            <TrendsPosts
              paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat
      dolorem cumque delectus necessitatibus quae deserunt illo optio possimus.
      Voluptatibus nesciunt facilis repellat magnam non nobis doloribus culpa
      mollitia harum."
            />
          </Grid>
          <Grid item>
            <TrendsPosts
              paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat
      dolorem cumque delectus necessitatibus quae deserunt illo optio possimus.
      Voluptatibus nesciunt facilis repellat magnam non nobis doloribus culpa
      mollitia harum."
            />
          </Grid>
          <Grid item>
            <TrendsPosts
              paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat
      dolorem cumque delectus necessitatibus quae deserunt illo optio possimus.
      Voluptatibus nesciunt facilis repellat magnam non nobis doloribus culpa
      mollitia harum."
            />
          </Grid>
          <Grid item>
            <TrendsPosts
              paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat
      dolorem cumque delectus necessitatibus quae deserunt illo optio possimus.
      Voluptatibus nesciunt facilis repellat magnam non nobis doloribus culpa
      mollitia harum."
            />
          </Grid>
          <Grid item>
            <TrendsPosts
              paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat
      dolorem cumque delectus necessitatibus quae deserunt illo optio possimus.
      Voluptatibus nesciunt facilis repellat magnam non nobis doloribus culpa
      mollitia harum."
            />
          </Grid>
          <Grid item>
            <TrendsPosts
              paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat
      dolorem cumque delectus necessitatibus quae deserunt illo optio possimus.
      Voluptatibus nesciunt facilis repellat magnam non nobis doloribus culpa
      mollitia harum."
            />
          </Grid>
          <Grid item>
            <TrendsPosts paragraph=" Lorem " />
          </Grid>
          <Grid item>
            <TrendsPosts paragraph=" Lorem " />
          </Grid>
          <Grid item>
            <TrendsPosts paragraph=" Lorem " />
          </Grid>
          <Grid item>
            <TrendsPosts paragraph=" Lorem " />
          </Grid>
          <Grid item>
            <TrendsPosts
              paragraph=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat
      dolorem cumque delectus necessitatibus quae deserunt illo optio possimus.
      Voluptatibus nesciunt facilis repellat magnam non nobis doloribus culpa
      mollitia harum."
            />
          </Grid>
        </Grid>
      </section>
      <div className="Trends__InputField">
        <div className="Trends__Input">
          <input type="text" placeholder="Send a post to #Manchester United" />
          <IconButton className="Trends__SendIcon">
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Trends;
