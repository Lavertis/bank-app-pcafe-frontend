import axios from 'axios';
const BASE_URL = 'https://bank-app-pcafe-api-stage.herokuapp.com';

const instance = axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export default instance