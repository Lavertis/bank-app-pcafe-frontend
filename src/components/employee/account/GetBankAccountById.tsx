import React from 'react'
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {  BankAccount } from '../../../types/accountInfo';
import { BankAccountInfo } from './BankAccountInfo';


const BANK_URL = '/api/Account/';
type FormProps = {
  onSubmit: (n: string, link:string) =>void;
}


const Form = ({onSubmit}: FormProps) =>{
  const [userId, setUserId] = useState("")
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    onSubmit(userId, BANK_URL)
  }

  return (
    <div className='flex h-screen w-full'>
    <form
    className='m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 '
    onSubmit={handleSubmit}
    >
      <label htmlFor='id'
      className ='form-label-input'>
      
      
      <input className ='form-input'
      placeholder='podaj id'
      value={userId} 
      onChange={(e)=>setUserId(e.target.value)}
      onBlur={(e)=>setUserId(e.target.value)}/>
     </label>
      <input className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      type="submit" />
    
     </form>
     </div>
  )
}


const GetAccountById = () =>{
  const [account,setAccount ] = useState<BankAccount | null>(null)
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (n:string, link:string) =>{
    const response = await axiosPrivate.get(link+n)
    console.log(response)
    setAccount(response.data)
  }

  return(
     <main>
       <Form onSubmit={handleSubmit} />
       <section>
        {account && <BankAccountInfo account={account} />}
       </section>
     </main>

  )

}

export default GetAccountById