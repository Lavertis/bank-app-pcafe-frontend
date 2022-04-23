import React from "react";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <div>
      <Link to={"/admin/GetUsers"}>
        <div>Select all users</div>
      </Link>
      <Link to={"/admin/GetUserById"}>
        <div>Select by id</div>
      </Link>
      <Link to={"/admin/CreateEmployeeAccount"}>
        <div>CreateUser</div>
      </Link>
      <Link to={"/admin/UpdateUser"}>
        <div>UpdateUser</div>
      </Link>
      <Link to={"/admin/DeleteEmployee"}>
        <div>DeleteUser</div>
      </Link>
    </div>
  );
};
