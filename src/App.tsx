import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import './App.scss';
import Layout from "./components/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import EmployeeTable from "./components/Admin/EmployeeTable/EmployeeTable";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AddEmployee from "./components/Admin/AddEmployee";
import CustomerList from "./components/Employee/CustomerList/CustomerList";
import AddCustomer from "./components/Employee/AddCustomer";
import AddAccount from "./components/Employee/AddAccount";
import AccountTable from "./components/Employee/AccountTable/AccountTable";
import NotYetImplemented from "./components/NotYetImplemented";
import Dashboard from "./components/Customer/Dashboard/Dashboard";
import NewTransfer from "./components/Customer/NewTransfer";
import EditAccountByCustomer from "./components/Customer/EditAccountByCustomer";
import EditAccountByEmployee from "./components/Employee/EditAccountByEmployee";
import EditEmployee from "./components/Admin/EditEmployee";


export const TokenContext = React.createContext<{ token: string; setToken: Dispatch<SetStateAction<string>>; }>(
    {
        token: '',
        setToken: () => {
        }
    }
);

function App() {
    const [token, setToken] = useState<string>(localStorage.getItem('jwtToken') ?? '');

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
                        <Route path="/employees" element={<EmployeeTable/>}/>
                        <Route path="/employees/create" element={<AddEmployee/>}/>
                        <Route path="/employees/:employeeId/edit" element={<EditEmployee/>}/>
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['Employee']}/>}>
                        <Route path="/customers" element={<CustomerList/>}/>
                        <Route path="/customers/create" element={<AddCustomer/>}/>
                        <Route path="/customers/:customerId/edit" element={<NotYetImplemented/>}/>
                        <Route path="/customers/:customerId/accounts" element={<AccountTable/>}/>
                        <Route path="/customers/:customerId/accounts/create" element={<AddAccount/>}/>

                        <Route
                            path="/customers/:customerId/accounts/:accountId/edit"
                            element={<EditAccountByEmployee/>}
                        />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['Customer']}/>}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/transfers/new" element={<NewTransfer/>}/>
                        <Route path="/accounts/:accountId/edit" element={<EditAccountByCustomer/>}/>
                    </Route>
                </Routes>
            </Layout>
        </TokenContext.Provider>
    );
}

export default App;