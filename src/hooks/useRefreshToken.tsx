import axios from "../api/axios";
import { useState } from "react";

const useRefreshToken = () => {
  const [refreshToken, setReToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [authToken, setAuthToken] = useState();
  const refresh = async () => {
    const response = await axios.post(
      "https://bank-app-pcafe-api-stage.herokuapp.com/api/Auth/refresh-token",
      { refreshToken: refreshToken },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    setReToken(response.data.refreshToken);
    setAuthToken(response.data.jwtToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("accessToken", response.data.jwtToken);
    return response.data.refreshToken;
  };
  return refresh;
};

export default useRefreshToken;
