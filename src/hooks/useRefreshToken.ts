import myAxios from "../api/axios";

const useRefreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken')

    return async () => {
        const response = await myAxios.post('auth-management/refresh-token', {refreshToken: refreshToken});
        localStorage.setItem('refreshToken', response.data.refreshToken)
        localStorage.setItem('jwtToken', response.data.jwtToken)
        return response.data.refreshToken;
    };
};

export default useRefreshToken;