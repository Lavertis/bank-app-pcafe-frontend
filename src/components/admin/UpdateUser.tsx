import React, { FC } from 'react'
import { useState } from 'react'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const REGISTER_URL = '/api/Employee/update'
interface UpdateProps{}
export const UpdateUser: FC<UpdateProps> = () => {

    const axiosPrivate = useAxiosPrivate();
    const[userName, setUserName] = useState<string>();
    const[password, setPassword] = useState<string>();
    const[firstName, setFirstName] = useState<string>();
    const[lastName, setLastName] = useState<string>();
    const[salary, setSalary] = useState<string>();
    const[id, setId] = useState<string>();
    

    const onSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault()
  
      
      
      if (!id) {
        alert('Login field empty')
        return
      }
      if (!userName) {
        alert('Login field empty')
        return
      }
      if (!password) {
        alert('Password field empty')
        return
      }
      if (!firstName) {
        alert('First name field empty')
        return
      }
      if (!lastName) {
          alert('Last name field empty')
          return
      }
      if (!salary) {
          alert('Salary field empty')
          return
      } 
       const userProps ={
          userName: userName,
          password: password,
          firstName: firstName,
          lastName: lastName,
          salary: salary
       }
      
      axiosPrivate.patch(`${REGISTER_URL}/${id}`, userProps).then((response) => {
        console.log(response);

      });
  
      
      setId('')
      setUserName('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setSalary('')
    }

    
  return (
    <div className='flex h-screen w-full'>
    <form onSubmit={onSubmit} className='m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 '>
        <label className ='form-label-input'
        htmlFor="id">
              <input className ='form-input'
              id="id"
                value={id}
                type="text"
                placeholder="id"
                onChange={(e) => setId(e.target.value)}
                onBlur={(e) => setId(e.target.value)}
              />
              </label>
         <label className ='form-label-input'
         htmlFor="userName">
              <input className ='form-input'
              id="userName"
                value={userName}
                type="text"
                placeholder="userName"
                onChange={(e) => setUserName(e.target.value)}
                onBlur={(e) => setUserName(e.target.value)}
              />
              </label>
              <label className='form-label-input'
              htmlFor="password">
              <input className ='form-input'
              id="password"
                value={password}
                type="text"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => setPassword(e.target.value)}
              />
          </label>
          <label className ='form-label-input'
          htmlFor="firstName">
              <input className ='form-input'
              id="firstName"
                value={firstName}
                type="text"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) => setFirstName(e.target.value)}
              />
          </label>
          <label className ='form-label-input'
          htmlFor="lastName">
              <input className ='form-input'
              id="lastName"
                value={lastName}
                type="text"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                onBlur={(e) => setLastName(e.target.value)}
              />
          </label>
          <label className ='form-label-input'
          htmlFor="salary">
              <input className='form-input'
              id="salary"
                value={salary}
                type="text"
                placeholder="Salary"
                onChange={(e) => setSalary(e.target.value)}
                onBlur={(e) => setSalary(e.target.value)}
              />
          </label>
          <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>

    </form>
    </div>
  )
}

