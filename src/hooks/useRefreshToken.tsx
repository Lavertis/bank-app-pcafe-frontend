import axios from '../api/axios';

import {  useState } from 'react';

const useRefreshToken = () => {
    const [refreshToken, setReToken] = useState<string>(localStorage.getItem('refreshToken'))
    const [authToken, setAuthToken] = useState()

    const refresh = async () => {
        const response = await axios.get('https://bank-app-pcafe-stage.herokuapp.com/api/Auth/refresh-token', {
            withCredentials: true
        });
        setReToken(response.data.refreshToken)
        setAuthToken(response.data.jwtToken)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('accessToken', authToken)
        
        return response.data.refreshToken;
    }
    return refresh;
};

export default useRefreshToken;

