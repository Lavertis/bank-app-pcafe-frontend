import React, {Dispatch, SetStateAction, useEffect} from 'react';
import './App.scss';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import {isTokenExpired} from "./helpers/token-helper";

export const TokenContext = React.createContext<{ token: string; setToken: Dispatch<SetStateAction<string>>; }>(
    {
        token: '',
        setToken: () => {
        }
    }
);

function App() {
    const [token, setToken] = React.useState<string>(localStorage.getItem('jwtToken') ?? '');

    useEffect(() => {
        document.title = "Bank App"

        const checkToken = () => {
            if (!token) return;
            if (isTokenExpired(token)) {
                localStorage.removeItem('token');
                setToken('');
            }
        };
        checkToken();
    }, [token]);

    return (
        <TokenContext.Provider value={{token, setToken}}>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login redirectTo='/'/>}/>
                </Routes>
            </Layout>
        </TokenContext.Provider>
    );
}

export default App;
