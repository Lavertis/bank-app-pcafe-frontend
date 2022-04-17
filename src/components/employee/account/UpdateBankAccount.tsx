import React, { FC } from 'react'
import { useState } from 'react'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const REGISTER_URL = '/api/Account/update'
interface UpdateProps{}
export const UpdateBankAccount: FC<UpdateProps> = () => {
    const axiosPrivate = useAxiosPrivate();
    const[id, setId] = useState<number>();
    const[balance, setBalance] = useState<number>();
    const[transferLimit, setTransferLimit] = useState<number>();
    const[isActive, setIsActive] = useState<boolean>();
    const authToken = localStorage.getItem('accessToken');

    const onSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault()
  
      
      
      
      if (!id) {
        alert('Login field empty')
        return
      }
      if (!balance) {
        alert('Password field empty')
        return
      }
      if (!transferLimit) {
        alert('First name field empty')
        return
      }
      if (!isActive) {
          alert('Last name field empty')
          return
      }
     
        
      const bankAccountProps = {
        balance: balance,
        transferLimit: transferLimit,
        isActive: isActive
      }
      axiosPrivate.patch(`${REGISTER_URL}/${id}`, bankAccountProps).then((response) => {
        
        console.log(response);
   
     
      });
  
      
    
     
    }

    
  return (
    <div className='flex h-screen w-full'>


    <form onSubmit={onSubmit}
    className='m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 '
    >
        <label className ='form-label-input'
        htmlFor="id">
              <input className ='form-input'
              id="id"
                value={id}
                type="text"
                placeholder="id"
                onChange={(e) => setId(+e.target.value)}
                onBlur={(e) => setId(+e.target.value)}
              />
              </label>
         <label className ='form-label-input'
         htmlFor="balance">
              <input className ='form-input'
              id="balance"
                value={balance}
                type="number"
                placeholder="balance"
                onChange={(e) => setBalance(+e.target.value)}
                onBlur={(e) => setBalance(+e.target.value)}
              />
              </label>
              <label className ='form-label-input'
              htmlFor="transferLimit">
              <input className ='form-input'
              id="transferLimit"
                value={transferLimit}
                type="text"
                placeholder="transferLimit"
                onChange={(e) => setTransferLimit(+e.target.value)}
                onBlur={(e) => setTransferLimit(+e.target.value)}
              />
          </label>
          <label className ='form-label-input'
          htmlFor="theme">
          Is Active
          <select
            value={`${isActive}`}
            onClick={(e) => setIsActive(!!e.target)}
            
          >
            <option className='form-input' value="False">False</option>
            <option value="True">True</option>
          </select>
        </label>
          <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>

    </form>
    </div>
  )
}
