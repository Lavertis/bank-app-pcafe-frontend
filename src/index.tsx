import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {InputValueProvider } from './context/AuthProvider';
ReactDOM.render(
  <BrowserRouter>
  <InputValueProvider>
    <App />
  </InputValueProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();