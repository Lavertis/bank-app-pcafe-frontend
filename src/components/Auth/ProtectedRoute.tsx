import React, {FC, useContext} from 'react';
import {TokenContext} from "../../App";
import {getRoleFromToken} from "../../utils/tokenUtils";
import {Outlet, useLocation} from "react-router-dom";
import Error403Forbidden from "../Errors/Error403Forbidden";
import Login from "./Login";


interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({allowedRoles}) => {
    const {token} = useContext(TokenContext);
    const location = useLocation();

    if (!token)
        return <Login redirectTo={location.pathname}/>;

    const role = getRoleFromToken(token);
    return (
        allowedRoles.includes(role) ?
            <Outlet/> : <Error403Forbidden/>
    );
}

export default ProtectedRoute;
