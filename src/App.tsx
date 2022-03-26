import React from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import "./App.css";
import * as Component from './Components'





function App() {
  return (
    <div className='min-h-screen bg-slate-100 box-border'>
      <Routes>
        {/*public routes*/}
        <Route path='/' element={<Component.Welcome />}/>
        <Route path='/login' element={<Component.Login />} />

        {/*protected routes */}
        {/* CRUD Employee*/}

        {/*<Route element={<RequireRole allowedRole={'Admin'} />}></Route>*/}
          <Route path='/admin/WelcomeAdmin' element={<Component.WelcomeAdmin />} />
          <Route path='/admin/GetUsers' element={<Component.GetUsers />} />
          <Route path='/admin/GetUserByID' element={<Component.GetUserById />} />
          <Route path='/admin/CreateEmployeeAccount' element={<Component.CreateEmployeeAccount />} />
          <Route path='/admin/UpdateUser' element={<Component.UpdateUser />} />
          <Route path='/admin/DeleteEmployee' element={<Component.DeleteEmployee />} />
            {/*CRUD customer*/}

          <Route path='/employee/WelcomeEmployee' element={<Component.WelcomeEmployee />} />
          <Route path='/employee/customer/GetCustomers' element={<Component.GetCustomers />} />
          <Route path='/employee/customer/GetCustomersByID' element={<Component.GetCustomerById />} />
          <Route path='/employee/customer/CreateCustomerAccount' element={<Component.CreateCustomerAccount />} />
          <Route path='/employee/customer/UpdateCustomer' element={<Component.UpdateCustomer />} />
          <Route path='/employee/customer/DeleteCustomer' element={<Component.DeleteCustomer />} />
          {/* CRUD account*/}
          <Route path='/employee/account/CreateBankAccount' element={<Component.CreateBankAccount />} />
          <Route path='/employee/account/GetBankAccounts' element={<Component.GetBankAccounts />} />
          <Route path='/employee/account/GetBankAccountById' element={<Component.GetBankAccountById />} />
          <Route path='/employee/account/UpdateBankAccount' element={<Component.UpdateBankAccount />} />
          {/*CRUD transfer */}
          <Route path='/user/GetTransfers' element={<Component.GetTransfers />} />
          <Route path='/user/GetTransferById' element={<Component.GetTransferById />} />
          <Route path='/user/CreateTransfer' element={<Component.CreateTransfer />} />
          <Route path='/user/WelcomeUser' element={<Component.WelcomeUser />} />
      </Routes>
    </div>
    
  );
}

export default App;
