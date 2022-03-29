import React from "react";
/*import logo from "./logo.svg";*/
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import "./App.css";
import Login from "./components/Login";
import CreateEmployeeAccount from "./components/admin/CreateEmployeeAccount";
import Welcome from "./components/Welcome";
import WelcomeAdmin from "./components/admin/WelcomeAdmin";
import RequireRole from "./components/RequireRole";
import GetUsers from './components/admin/GetUsers';
import GetUserById from './components/admin/GetUserById';
import UpdateUser from "./components/admin/UpdateUser";
import DeleteEmployee from "./components/admin/DeleteEmployee"

function App() {
  return (
    <div className='min-h-screen bg-slate-100 box-border'>
      <Routes>
        {/*public routes*/}
        <Route path='/' element={<Welcome />}/>
        <Route path='/login' element={<Login />} />

        {/*protected routes */}
        
        {/*<Route element={<RequireRole allowedRole={'Admin'} />}></Route>*/}
          <Route path='/admin/WelcomeAdmin' element={<WelcomeAdmin />} />
          <Route path='/admin/GetUsers' element={<GetUsers />} />
          <Route path='/admin/GetUserByID' element={<GetUserById />} />
          <Route path='/admin/CreateEmployeeAccount' element={<CreateEmployeeAccount />} />
          <Route path='/admin/UpdateUser' element={<UpdateUser />} />
          <Route path='/admin/DeleteEmployee' element={<DeleteEmployee />} />
        
      </Routes>
    </div>
    
  );
}

export default App;
