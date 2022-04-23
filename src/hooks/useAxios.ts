import {useEffect} from "react";
import useRefreshToken from "./useRefreshToken";
import myAxios from "../api/axios";

const useAxios = () => {
    const refreshToken = useRefreshToken();
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const requestIntercept = myAxios.interceptors.request.use(
            config => {
                if (jwtToken && config.headers)
                    config.headers['Authorization'] = `Bearer ${jwtToken}`;
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = myAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refreshToken();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return myAxios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            myAxios.interceptors.request.eject(requestIntercept);
            myAxios.interceptors.response.eject(responseIntercept);
        }
    }, [jwtToken, refreshToken]);

    return myAxios;
}

export default useAxios;