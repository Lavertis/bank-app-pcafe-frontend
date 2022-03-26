import { useState} from 'react';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import  instance  from '../api/axios';
import jwt from 'jwt-decode'
import Logo from "./Logo"


interface LoginProps {}

const LOGIN = '/api/Auth/authenticate'



export const Login: FC<LoginProps> = () => {


        
        const[userName, setUserName] = useState<string>("");
        const[password, setPassword] = useState<string>("");
        const navigate = useNavigate();
        

    
        const onSubmit = (e: { preventDefault: () => void; }) => {
            e.preventDefault()
            if (!userName) {
              alert('Login field empty')
              return
            }
            if (!password) {
              alert('Password field empty')
              return
            }
           
            
            instance.post(LOGIN, {userName: userName, password: password}).then((response) => {

              const accessToken = response.data.jwtToken;
              const refreshToken = response.data.refreshToken;
              localStorage.setItem('accessToken', accessToken)
              localStorage.setItem('refreshToken', refreshToken)
              const user: string = jwt(accessToken)
              const Role = user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

              Navigate(Role);
              
              });
                 
          }

          function Navigate(role: string): void{
            switch(role){
              case 'Admin':
              navigate("/admin/WelcomeAdmin", { replace: true });
              break;
              case 'Employee':
              navigate("/employee/WelcomeEmployee", { replace: true });
              break;
              case 'Customer':
              navigate("/user/WelcomeUser", { replace: true });
              break;
              default:
                navigate("/Login", { replace: true });
            }
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



