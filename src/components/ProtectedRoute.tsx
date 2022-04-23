import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwt from "jwt-decode";
import React, { FC } from "react";

export const ProtectedRoute = ({ allowedRoles }) => {
  let accessToken;
  let user;
  let Role;
  if (!accessToken) {
    Role = "none";
  } else {
    accessToken = localStorage.getItem("accessToken");
    user = jwt(accessToken);
    Role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  var location = useLocation();

  return allowedRoles?.includes(Role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
