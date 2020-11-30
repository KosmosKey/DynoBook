import React from "react";
import { LinearProgress } from "@material-ui/core";

const LoadingScreen: React.FC = () => {
  return (
    <div className="LoadingScreen">
      <div className="LoadingScreen__Logo">
        <h1>DynoBook</h1>
        <LinearProgress color="secondary" className="LoadingScreen__Linear" />
      </div>
    </div>
  );
};

export default LoadingScreen;
