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
    <form
    onSubmit={handleSubmit}
    >
    <div>
      <input placeholder='podaj id'
      value={userId} 
      onChange={(e)=>setUserId(e.target.value)}
      onBlur={(e)=>setUserId(e.target.value)}/>
     
      <input type="submit" />
     </div>
     </form>
  )
}


const GetCustomerById = () =>{
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

export default GetCustomerById