import { useState } from 'react'
import React, { FC } from 'react';
import { axiosPrivate } from '../../api/axios'

interface RegisterProps{}
const CreateTransfer: FC<RegisterProps> = () => {
    const[amount, setAmount] = useState<number>();
    const[receiverAccountNumber, setReceiverAccountNumber] = useState<string>();
    const[receiverName, setReceiverName] = useState<string>("");
    const[description, setDescription] = useState<string>("");
    const[accountId, setAccountId] = useState<number>();

    const authToken = localStorage.getItem('accessToken');

    const REGISTER_URL = '/api/Transfer/create'
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

    
    axiosPrivate.post(REGISTER_URL, { amount: amount, receiverAccountNumber: receiverAccountNumber, receiverName: receiverName, description: description, accountId: accountId}, { withCredentials: true, headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + authToken
    } }).then((response) => {
      //const accessToken = response.data.jwtToken;
      console.log(response);
 
   
    });

    
  
    setAmount(0)
    setReceiverAccountNumber("")
    setReceiverName("")
    setDescription("")
    setAccountId(0)
  }


  return(
    <div className='flex h-screen w-full'>
    <form onSubmit={onSubmit} className='m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 '>
          <label className='form-label-input'
          htmlFor="amount">
              <input className='form-input' 
              id="amount"
                value={amount}
                type="text"
                placeholder="number"
                onChange={(e) => setAmount(+e.target.value)}
                onBlur={(e) => setAmount(+e.target.value)}
              />
          </label>
              <label className='form-label-input'
              htmlFor="receiverAccountNumber">
              <input className='form-input' id="receiverAccountNumber"
                value={receiverAccountNumber}
                type="text"
                placeholder="receiverAccountNumber"
                onChange={(e) => setReceiverAccountNumber(e.target.value)}
                onBlur={(e) => setReceiverAccountNumber(e.target.value)}
              />
          </label>
          <label className='form-label-input'
          htmlFor="receiverName">
              <input className='form-input' id="receiverName"
                value={receiverName}
                type="text"
                placeholder="receiverName"
                onChange={(e) => setReceiverName(e.target.value)}
                onBlur={(e) => setReceiverName(e.target.value)}
              />
          </label>
          <label className='form-label-input'
          htmlFor="description">
              <input className='form-input' id="description"
                value={description}
                type="text"
                placeholder="Last name"
                onChange={(e) => setDescription(e.target.value)}
                onBlur={(e) => setDescription(e.target.value)}
              />
          </label>
          <label className='form-label-input'
          htmlFor="accountId">
              <input className='form-input' id="accountId"
                value={accountId}
                type="text"
                placeholder="accountId"
                onChange={(e) => setAccountId(+e.target.value)}
                onBlur={(e) => setAccountId(+e.target.value)}
              />
          </label>
          <button className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
      </form>
      </div>


  );
}

export default CreateTransfer;