import React from "react";
/*import logo from "./logo.svg";*/
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div className='min-h-screen bg-slate-100 box-border'>
      <Routes>
        <Route path='/' element={<Welcome />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
    
  );
}

export default App;
