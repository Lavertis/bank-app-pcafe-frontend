import React, {Dispatch, SetStateAction, useEffect} from 'react';
import './App.scss';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import {isTokenExpired} from "./helpers/token-helper";
import Home from "./components/Home/Home";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import EditEmployee from "./components/EditEmployee/EditEmployee";
import CustomerList from "./components/CustomerList/CustomerList";

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
                    {token && <Route path="/" element={<Home/>}/>}
                    <Route path="/" element={<Login redirectTo="/"/>}/>

                    {!token && <Route path="/login" element={<Login redirectTo="/"/>}/>}

                    <Route element={<ProtectedRoute allowedRoles={['Admin']}/>}>
                        <Route path="/employees" element={<EmployeeList/>}/>
                        <Route path="/employees/create" element={<AddEmployee/>}/>
                        <Route path="/employees/edit/:id" element={<EditEmployee/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['Employee']}/>}>
                        <Route path="/customers" element={<CustomerList/>}/>
                        <Route path="/customers/create" element={<Home/>}/>
                        <Route path="/customers/edit/:id" element={<Home/>}/>
                    </Route>
                </Routes>
            </Layout>
        </TokenContext.Provider>
    );
}

export default App;