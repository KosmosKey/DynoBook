import React from "react";
import "./Trends.scss";

interface Props {
  paragraph: string;
}

const Trends: React.FC<Props> = ({ paragraph }) => {
  return (
    <div className="Trends">
      <p>#{paragraph}</p>
    </div>
  );
};

export default Trends;
