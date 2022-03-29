import { useState} from 'react';
import React, { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import  instance  from '../api/axios';
//import { isNamedImports } from 'typescript'
//import Props from '../context/AuthProvider';
//import { json } from 'stream/consumers';
import jwt from 'jwt-decode'
import Logo from "./Logo"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoginProps {}

const LOGIN = '/api/Auth/authenticate'



const Login: FC<LoginProps> = () => {


        
        const[userName, setUserName] = useState<string>("");
        const[password, setPassword] = useState<string>("");
        const navigate = useNavigate();
        const location = useLocation();
        const from = location.state || "/admin/WelcomeAdmin";

    
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
              console.log(typeof(user))
              if(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']==='Admin'){
                console.log("Przejscie do strony dla admina");
                navigate(from, { replace: true });
                //<Link to='../admin/WelcomeAdmin'></Link>
              }
              if(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']==='Employee'){
                console.log("Przejscie do strony dla employee")
                navigate(from, { replace: true });
              }
              });
              //await authenticate()
              
          }

  return (
    <div>
      <div className='absolute left-40 '>
      <Logo />
      </div>
      <div className='flex h-screen w-full'>
      <form onSubmit={onSubmit} className='m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 '>
          <label className ='block text-gray-700 text-sm font-bold mb-2' htmlFor="userName">
            Login
              <input className ='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id="userName"
                value={userName}
                type="text"
                placeholder="userName"
                onChange={(e) => setUserName(e.target.value)}
                onBlur={(e) => setUserName(e.target.value)}
              />
          </label>
          <label className ='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
            Password
              <input  className ='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                id="password"
                value={password}
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => setPassword(e.target.value)}
              />
          </label>
          <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' value='Login'>Submit</button>
      </form>
      </div>
    </div>
      
  
  );
};

export default Login;


