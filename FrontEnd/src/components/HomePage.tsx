import React from "react";
import { Button } from "@material-ui/core";
import "./HomePage.scss";
import BackgroundImage from "./header-hero.png";
import Particles from "react-particles-js";

const HomePage = () => {
  return (
    <div className="HomePage">
      <div className="HomePage__Body">
        <header>
          <div className="HomePage__Title">
            <h3>Welcome to DynoBook</h3>
            <h1>A Place to Share Your Ideas</h1>
            <p>
              Place to share anything online. Share ideas makes it easier. Let's
              get started!
            </p>
            <div className="HomePage__Buttons">
              <Button className="HomePage__GetStarted">Get Started</Button>
              <Button className="HomePage__LogIn">Log In</Button>
            </div>
          </div>
          <svg viewBox="0 0 500 80" preserveAspectRatio="none">
            <path d="M0,0 L0,40 Q250,80 500,40 L500,0 Z" fill="#eb4233" />
          </svg>
          <img src={BackgroundImage} alt="Laptop" />
          <Particles
            params={{
              particles: {
                number: {
                  value: 20,
                  density: {
                    enable: false,
                  },
                },
                size: {
                  value: 30,
                  random: false,
                  anim: {
                    enable: true,
                    speed: 0.2,
                    size_min: 10,
                    sync: false,
                  },
                },
                move: {
                  speed: 1.5,
                  direction: "top",
                  out_mode: "out",
                },
                color: {
                  value: "rgba(255, 255, 255, 0.422)",
                },
                line_linked: {
                  enable: false,
                  opacity: 0.02,
                },
              },
            }}
            className="ParticlesJS"
          />
        </header>
      </div>
    </div>
  );
};

export default HomePage;
