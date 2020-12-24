import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setTrendId } from "../../reducerSlices/appSlicer";
import "./Trends.scss";

interface Props {
  paragraph: string;
  id: string;
}

const Trends: React.FC<Props> = ({ id, paragraph }) => {
  const dispatch = useDispatch();

  return (
    <Link to="/Trends" style={{ textDecoration: "none" }}>
      <div
        className="Trends"
        onClick={() => dispatch(setTrendId({ id: id, name: paragraph }))}
      >
        <p>#{paragraph}</p>
      </div>
    </Link>
  );
};

export default Trends;
