import useAxios from "./useAxios";


const useRefreshToken = () => {
    const axios = useAxios()
    const refreshToken = localStorage.getItem('refreshToken')

    return async () => {
        const response = await axios.post('Auth/refresh-token', {refreshToken: refreshToken});
        localStorage.setItem('refreshToken', response.data.refreshToken)
        localStorage.setItem('accessToken', response.data.jwtToken)
        return response.data.refreshToken;
    };
};

export default useRefreshToken;

