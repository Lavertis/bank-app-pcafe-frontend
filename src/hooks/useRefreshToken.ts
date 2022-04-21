import myAxios from "../api/axios";

const useRefreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken')

    return async () => {
        const response = await myAxios.post('Auth/refresh-token', {refreshToken: refreshToken});
        localStorage.setItem('refreshToken', response.data.refreshToken)
        localStorage.setItem('accessToken', response.data.jwtToken)
        return response.data.refreshToken;
    };
};

export default useRefreshToken;

