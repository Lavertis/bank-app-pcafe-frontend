import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import "./App.css";
import {Login, DeleteEmployee, CreateEmployeeAccount, Welcome, WelcomeAdmin, RequireRole, GetUsers, GetUserById, UpdateUser, DeleteCustomer, WelcomeEmployee, GetCustomerById, GetCustomers, UpdateCustomer, CreateCustomerAccount, CreateBankAccount, GetBankAccountById, GetBankAccounts, UpdateBankAccount, CreateTransfer, GetTransferById, GetTransfers, WelcomeUser} from './imports'



function App() {
  return (
    <div className='min-h-screen bg-slate-100 box-border'>
      <Routes>
        {/*public routes*/}
        <Route path='/' element={<Welcome />}/>
        <Route path='/login' element={<Login />} />

        {/*protected routes */}
        {/* CRUD Employee*/}

        {/*<Route element={<RequireRole allowedRole={'Admin'} />}></Route>*/}
          <Route path='/admin/WelcomeAdmin' element={<WelcomeAdmin />} />
          <Route path='/admin/GetUsers' element={<GetUsers />} />
          <Route path='/admin/GetUserByID' element={<GetUserById />} />
          <Route path='/admin/CreateEmployeeAccount' element={<CreateEmployeeAccount />} />
          <Route path='/admin/UpdateUser' element={<UpdateUser />} />
          <Route path='/admin/DeleteEmployee' element={<DeleteEmployee />} />
            {/*CRUD customer*/}

          <Route path='/employee/WelcomeEmployee' element={<WelcomeEmployee />} />
          <Route path='/employee/customer/GetCustomers' element={<GetCustomers />} />
          <Route path='/employee/customer/GetCustomersByID' element={<GetCustomerById />} />
          <Route path='/employee/customer/CreateCustomerAccount' element={<CreateCustomerAccount />} />
          <Route path='/employee/customer/UpdateCustomer' element={<UpdateCustomer />} />
          <Route path='/employee/customer/DeleteCustomer' element={<DeleteCustomer />} />
          {/* CRUD account*/}
          <Route path='/employee/account/CreateBankAccount' element={<CreateBankAccount />} />
          <Route path='/employee/account/GetBankAccounts' element={<GetBankAccounts />} />
          <Route path='/employee/account/GetBankAccountById' element={<GetBankAccountById />} />
          <Route path='/employee/account/UpdateBankAccount' element={<UpdateBankAccount />} />
          {/*CRUD transfer */}
          <Route path='/user/GetTransfers' element={<GetTransfers />} />
          <Route path='/user/GetTransferById' element={<GetTransferById />} />
          <Route path='/user/CreateTransfer' element={<CreateTransfer />} />
          <Route path='/user/WelcomeUser' element={<WelcomeUser />} />
      </Routes>
    </div>
    
  );
}

export default App;
