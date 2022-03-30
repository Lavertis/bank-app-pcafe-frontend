import React, { FC } from 'react'
import { useState } from 'react'
import { axiosPrivate } from '../../../api/axios';

const REGISTER_URL = '/api/Employee/update'
interface UpdateProps{}
const UpdateAccount: FC<UpdateProps> = () => {
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
  
      
    
      setBalance(0)
      setTransferLimit(0)
      setIsActive(true)
    }

    
  return (
    
    <form onSubmit={onSubmit}>
        <label htmlFor="id">
              <input id="id"
                value={id}
                type="text"
                placeholder="id"
                onChange={(e) => setId(+e.target.value)}
                onBlur={(e) => setId(+e.target.value)}
              />
              </label>
         <label htmlFor="balance">
              <input id="balance"
                value={balance}
                type="number"
                placeholder="balance"
                onChange={(e) => setBalance(+e.target.value)}
                onBlur={(e) => setBalance(+e.target.value)}
              />
              </label>
              <label htmlFor="transferLimit">
              <input id="transferLimit"
                value={transferLimit}
                type="text"
                placeholder="transferLimit"
                onChange={(e) => setTransferLimit(+e.target.value)}
                onBlur={(e) => setTransferLimit(+e.target.value)}
              />
          </label>
          <label htmlFor="theme">
          Theme
          <select
            value={`${isActive}`}
            onChange={(e) => setIsActive(!!e.target.value)}
            onBlur={(e) => setIsActive(!!e.target.value)}
          >
            <option value="False">Peru</option>
            <option value="True">Dark Blue</option>
          </select>
        </label>
          <button>Submit</button>

    </form>
  )
}

export default UpdateAccount