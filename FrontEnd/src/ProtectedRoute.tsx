import React from "react";
import { Redirect, Route } from "react-router-dom";
import { userInformation } from "./reducerSlices/authSlicer";
import { useSelector } from "react-redux";

interface IProps {
  exact?: boolean;
  component: React.ComponentType<any>;
  path?: any;
}

const ProtectedRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}) => {
  const user = useSelector(userInformation);
  return (
    <Route
      {...rest}
      render={(props: any) =>
        !user ? <Component {...props} /> : <Redirect to="/Home" />
      }
    />
  );
};

export default ProtectedRoute;
