import React from 'react'
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { TransferProps } from '../../types/accountInfo';
import { TransferInfo } from './TransferInfo';

const GET_TRANSFER_BY_ID= '/api/Transfer/'
type FormProps = {
  onSubmit: (n: string, link:string) =>void;
}
const Form = ({onSubmit}: FormProps) =>{
  const [userId, setUserId] = useState("")
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    onSubmit(userId,  GET_TRANSFER_BY_ID)
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

const GetTransferById = () =>{
    
  const [account,setAccount ] = useState<TransferProps | null>(null)
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
        {account && <TransferInfo account={account} />}
       </section>
     </main>

  )

}

export default GetTransferById