import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { trends_id } from "./reducerSlices/appSlicer";

interface IProps {
  exact?: boolean;
  component: React.ComponentType<any>;
  path?: any;
}

const TrendsRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const trendId = useSelector(trends_id);
  return (
    <Route
      {...rest}
      render={(props: any) =>
        trendId ? <Component {...props} /> : <Redirect to="/Home" />
      }
    />
  );
};

export default TrendsRoute;
