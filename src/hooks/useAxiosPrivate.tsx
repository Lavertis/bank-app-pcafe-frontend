import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { AxiosRequestConfig } from "axios";
import { useLocation, Navigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const authToken = localStorage.getItem("accessToken");
  const location = useLocation();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: AxiosRequestConfig<string | null>) => {
        console.log(authToken);
        if (config.headers && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        if (error?.response?.status === 401 && !prevRequest.sent) {
          <Navigate to="/login" state={{ from: location }} replace />;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
