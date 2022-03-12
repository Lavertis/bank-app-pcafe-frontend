import { useState} from 'react';
import axios from 'axios';
import { useContext } from 'react';
import {AuthContext} from '../context/AuthProvider';
import React, { FC } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';
//import { isNamedImports } from 'typescript';
//import Props from '../context/AuthProvider';
//import { json } from 'stream/consumers';

interface LoginProps { }



const Login: FC<LoginProps> = () => {

        const { authToken, dispatch } = useContext(AuthContext);  
        const navigate = useNavigate();
        const location = useLocation();
        const from = location.state || "/register";
        const[userName, setUserName] = useState<string>("");
        const[password, setPassword] = useState<string>("");
        
    

          const onSubmit = async (e: { preventDefault: () => void; }) => {
            e.preventDefault()
            if (!userName) {
              alert('Login field empty')
              return
            }
            if (!password) {
              alert('Password field empty')
              return
            }
           
            
            axios.post('https://bank-app-pcafe-stage.herokuapp.com/api/Auth/authenticate', {userName: userName, password: password}, { withCredentials: true }).then((response) => {
                const accessToken = response.data.jwtToken;
              dispatch({ authToken: accessToken})
               if(response.status === 200){
                navigate(from, { replace: true });
              }
              });
              //await authenticate()
              
          }

  return (
      <form onSubmit={onSubmit}>
          <label htmlFor="userName">
              <input id="userName"
                value={userName}
                type="text"
                placeholder="userName"
                onChange={(e) => setUserName(e.target.value)}
                onBlur={(e) => setUserName(e.target.value)}
              />
              <input id="password"
                value={password}
                type="text"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => setPassword(e.target.value)}
              />
          </label>
         <button value='Login'>Submit</button>

        
         <p>token: {authToken}</p>
         
        
      </form>
  
  );
};

export default Login;


