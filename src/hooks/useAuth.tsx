import { useContext, useDebugValue } from "react";
import {AuthContext} from "../context/AuthProvider";

const useAuth = () => {
    const { authToken  } = useContext(AuthContext);
    useDebugValue(authToken, (auth:string) => auth ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
    //return useContext(AuthContext);
}

export default useAuth;