import React, { FC } from 'react'
import { useState } from 'react'
import { axiosPrivate } from '../../../api/axios';

const REGISTER_URL = '/api/Account/update'
interface UpdateProps{}
const UpdateBankAccount: FC<UpdateProps> = () => {
    const[id, setId] = useState<number>();
    const[balance, setBalance] = useState<number>();
    const[transferLimit, setTransferLimit] = useState<number>();
    const[isActive, setIsActive] = useState<boolean>();
    const authToken = localStorage.getItem('accessToken');

    const onSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault()
  
      
      /*
      
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
      if (!gender) {
          alert('Gender field empty')
          return
      }
      if (!dateOfEmployment) {
          alert('Date of employment field empty')
          return
      }
      if (!dateOfBirth) {
          alert('Datw of birth field empty')
          return
      }
        */
      
      axiosPrivate.patch(`${REGISTER_URL}/${id}`, { balance: balance, transferLimit: transferLimit, isActive: isActive}, { withCredentials: true, headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + authToken
      } }).then((response) => {
        //const accessToken = response.data.jwtToken;
        console.log(response);
   
     
      });
  
      
    
     
    }

    
  return (
    <div className='flex h-screen w-full'>


    <form onSubmit={onSubmit}
    className='m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 '
    >
        <label className ='block text-gray-700 text-sm font-bold mb-2'
        htmlFor="id">
              <input className ='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id="id"
                value={id}
                type="text"
                placeholder="id"
                onChange={(e) => setId(+e.target.value)}
                onBlur={(e) => setId(+e.target.value)}
              />
              </label>
         <label className ='block text-gray-700 text-sm font-bold mb-2'
         htmlFor="balance">
              <input className ='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id="balance"
                value={balance}
                type="number"
                placeholder="balance"
                onChange={(e) => setBalance(+e.target.value)}
                onBlur={(e) => setBalance(+e.target.value)}
              />
              </label>
              <label className ='block text-gray-700 text-sm font-bold mb-2'
              htmlFor="transferLimit">
              <input className ='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id="transferLimit"
                value={transferLimit}
                type="text"
                placeholder="transferLimit"
                onChange={(e) => setTransferLimit(+e.target.value)}
                onBlur={(e) => setTransferLimit(+e.target.value)}
              />
          </label>
          <label className ='block text-gray-700 text-sm font-bold mb-2'
          htmlFor="theme">
          Is Active
          <select
            value={`${isActive}`}
            onClick={(e) => setIsActive(!!e.target)}
            
          >
            <option value="False">False</option>
            <option value="True">True</option>
          </select>
        </label>
          <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>

    </form>
    </div>
  )
}

export default UpdateBankAccount