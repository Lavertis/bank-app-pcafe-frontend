import React from "react";
/*import logo from "./logo.svg";*/
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
    
  );
}

export default App;
