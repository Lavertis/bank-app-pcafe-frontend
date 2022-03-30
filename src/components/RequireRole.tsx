import React from 'react'
import jwt from 'jwt-decode'
import { Outlet, } from "react-router-dom";

const RequireRole = ({allowedRole}) => {
    console.log(allowedRole);

    const accessToken = localStorage.getItem('refreshToken')
    const user: string = jwt(accessToken)
    const role: string = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    console.log(role);
  return (
    <>
    abc
    {console.log(role)}
    {console.log(allowedRole)}
    
    {role===allowedRole} ? <Outlet /> : console.log(role)
    </>
  )
}

export default RequireRole


