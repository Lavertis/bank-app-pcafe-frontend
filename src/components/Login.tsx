import { useState} from 'react';
import React, { FC } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';
import  instance  from '../api/axios';
//import { isNamedImports } from 'typescript'
//import Props from '../context/AuthProvider';
//import { json } from 'stream/consumers';
import jwt from 'jwt-decode'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoginProps {}

const LOGIN = '/api/Auth/authenticate'



const Login: FC<LoginProps> = () => {


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
           
            
            instance.post(LOGIN, {userName: userName, password: password}, { withCredentials: true }).then((response) => {


              const accessToken = response.data.jwtToken;
              const refreshToken = response.data.refreshToken;
              localStorage.setItem('accessToken', accessToken)
              localStorage.setItem('refreshToken', refreshToken)

              const user: string = jwt(accessToken)
              if(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']==='Admin'){
                console.log("Przejscie do strony dla admina")
              }
              if(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']==='Employee'){
                console.log("Przejscie do strony dla employee")
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

        
         
        
      </form>
  
  );
};

export default Login;


