import React, {Dispatch, SetStateAction, useEffect} from 'react';
import './App.scss';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import EmployeeList from "./components/Admin/EmployeeList/EmployeeList";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AddEmployee from "./components/Admin/AddEmployee";
import CustomerList from "./components/Employee/CustomerList/CustomerList";
import AddCustomer from "./components/Employee/AddCustomer";
import AddBankAccount from "./components/Employee/AddBankAccount";
import AccountList from "./components/Employee/AccountList/AccountList";
import NotYetImplemented from "./components/NotYetImplemented";


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
    }, []);

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
                        <Route path="/employees/:id/edit" element={<NotYetImplemented/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['Employee']}/>}>
                        <Route path="/customers" element={<CustomerList/>}/>
                        <Route path="/customers/create" element={<AddCustomer/>}/>
                        <Route path="/customers/:id/edit" element={<NotYetImplemented/>}/>
                        <Route path="/customers/:id/accounts" element={<AccountList/>}/>
                        <Route path="/customers/:id/accounts/create" element={<AddBankAccount/>}/>

                        <Route path="/accounts/:id/edit" element={<NotYetImplemented/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['Customer']}/>}>
                        <Route path="/accounts" element={<NotYetImplemented/>}/>
                    </Route>
                </Routes>
            </Layout>
        </TokenContext.Provider>
    );
}

export default App;