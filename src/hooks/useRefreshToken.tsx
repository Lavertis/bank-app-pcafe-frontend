import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { authToken, dispatch } = useAuth();

    const refresh = async () => {
        const response = await axios.get('https://bank-app-pcafe-stage.herokuapp.com/api/Auth/refresh-token', {
            withCredentials: true
        });
        console.log(authToken)
        dispatch({authToken: response.data.accessToken})
        
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;

//dispatch({authToken} => {
          //  console.log(JSON.stringify(authToken));
            //console.log(response.data.accessToken);
            //return { ...prev, accessToken: response.data.accessToken }
       // });