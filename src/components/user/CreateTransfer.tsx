import { useState } from 'react'
import React, { FC } from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface RegisterProps{}
export const CreateTransfer: FC<RegisterProps> = () => {
    const axiosPrivate = useAxiosPrivate();
    const[amount, setAmount] = useState<number>();
    const[receiverAccountNumber, setReceiverAccountNumber] = useState<string>();
    const[receiverName, setReceiverName] = useState<string>("");
    const[description, setDescription] = useState<string>("");
    const[accountId, setAccountId] = useState<number>();

    const authToken = localStorage.getItem('accessToken');

    const REGISTER_URL = '/api/Transfer/create'
    const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    
  
    
    if (!amount) {
      alert('Amount field empty')
      return
    }
    if (!receiverAccountNumber) {
      alert('Receiver account number field empty')
      return
    }
    if (!receiverName) {
      alert('Receiver name field empty')
      return
    }
    if (!description) {
        alert('Description field empty')
        return
    }
    if (!accountId) {
        alert('Account id field empty')
        return
    }
   
    


    const transferProps = {
      amount: amount,
      receiverAccountNumber: receiverAccountNumber,
      receiverName: receiverName,
      description: description,
      accountId: accountId
    }
    axiosPrivate.post(REGISTER_URL, transferProps).then((response) => {
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

