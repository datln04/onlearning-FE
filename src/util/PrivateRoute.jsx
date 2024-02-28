import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = Cookies.get("user");
  let auth;
  if (user) {
    auth = JSON.parse(user);
  }

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
