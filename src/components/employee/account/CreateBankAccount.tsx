import { useState } from 'react'
import React, { FC } from 'react';
import { axiosPrivate } from '../../../api/axios'

interface RegisterProps{}
const CreateBankAccount: FC<RegisterProps> = () => {
    const[number, setNumber] = useState<string>("");
    const[balance, setBalance] = useState<number>();
    const[transferLimit, setTransferLimit] = useState<number>();
    const[isActive, setisActive] = useState<boolean>(true);
    const[accountTypeId, setAccountTypeId] = useState<number>();
    const[currencyId, setCurrencyId] = useState<number>();
    const[customerId, setCustomerId] = useState<string>("");

    const authToken = localStorage.getItem('accessToken');

    const REGISTER_URL = '/api/Customer/create'
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
    


    //const isoDateEmployment = new Date('December 15, 2000 03:24:00').toISOString();
    
    
    axiosPrivate.post(REGISTER_URL, { number: number, balance: balance, transferLimit: transferLimit, isActive: isActive, accountTypeId: accountTypeId, currencyId: currencyId, customerId: customerId}, { withCredentials: true, headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + authToken
    } }).then((response) => {
      //const accessToken = response.data.jwtToken;
      console.log(response);
 
   
    });

    
  
    setNumber('')
    setBalance(0)
    setTransferLimit(0)
    setAccountTypeId(0)
    setCurrencyId(0)
    setCustomerId('')
  }


  return(
    <div className='flex h-screen w-full'>
    <form onSubmit={onSubmit} className='m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 '>
          <label className ='block text-gray-700 text-sm font-bold mb-2'
          htmlFor="number">
              <input className ='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id="number"
                value={number}
                type="text"
                placeholder="number"
                onChange={(e) => setNumber(e.target.value)}
                onBlur={(e) => setNumber(e.target.value)}
              />
              </label>
              <label 
              className ='block text-gray-700 text-sm font-bold mb-2'
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
                type="number"
                placeholder="transferLimit"
                onChange={(e) => setTransferLimit(+e.target.value)}
                onBlur={(e) => setTransferLimit(+e.target.value)}
              />
          </label>
          <label className ='block text-gray-700 text-sm font-bold mb-2'
          htmlFor="accountTypeId">
              <input className ='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id="accountTypeId"
                value={accountTypeId}
                type="number"
                placeholder="Last name"
                onChange={(e) => setAccountTypeId(+e.target.value)}
                onBlur={(e) => setAccountTypeId(+e.target.value)}
              />
          </label>
          <label className ='block text-gray-700 text-sm font-bold mb-2'
          htmlFor="currencyId">
              <input className ='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id="currencyId"
                value={currencyId}
                type="number"
                placeholder="National Id"
                onChange={(e) => setCurrencyId(+e.target.value)}
                onBlur={(e) => setCurrencyId(+e.target.value)}
              />
          </label>
          <label className ='block text-gray-700 text-sm font-bold mb-2'
          htmlFor="customerId">
              <input className ='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id="customerId"
                value={customerId}
                type="date"
                onChange={(e) => setCustomerId(e.target.value)}
                onBlur={(e) => setCustomerId(e.target.value)}
              />
          </label>
          <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
      </form>
      </div>


  );
}

export default CreateBankAccount;