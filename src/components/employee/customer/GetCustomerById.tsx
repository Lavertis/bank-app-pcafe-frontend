import React from 'react'
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Customer } from '../../../types/accountInfo';
import { CustomerInfo } from './CustomerInfo';


const USER_URL = 'api/Customer/'
type FormProps = {
  onSubmit: (n: string) =>void;
}


const Form = ({onSubmit}: FormProps) =>{
  const [userId, setUserId] = useState("")
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    onSubmit(userId)
  }

  return (
    <div className='flex h-screen w-full'>
    <form
    className='m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 '
    onSubmit={handleSubmit}
    >
      <label className ='form-label-input'>

      <input className ='form-input'
       placeholder='podaj id'
      value={userId} 
      onChange={(e)=>setUserId(e.target.value)}
      onBlur={(e)=>setUserId(e.target.value)}/>
     
      <input className ='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      type="submit" />
      </label>
    
     </form>
     </div>
  )
}


export const GetCustomerById = () =>{
  const [account,setAccount ] = useState<Customer | null>(null)
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (n:string) =>{
    const response = await axiosPrivate.get(`${USER_URL}${n}`)
    console.log(response)
    setAccount(response.data)
    console.log("siema")
  }

  return(
     <main>
       <Form onSubmit={handleSubmit} />
       <section>
        {account && <CustomerInfo account={account} />}
       </section>
     </main>

  )

}
