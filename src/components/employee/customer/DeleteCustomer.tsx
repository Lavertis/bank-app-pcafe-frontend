import React from 'react'
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
//import { AccountInfo } from '../../types/accountInfo';


const Delete_URL = 'api/Employee/delete';
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


const DeleteCustomer = () =>{
  //const [account,setAccount ] = useState<AccountInfo | null>(null)
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (n:string) =>{
    const response = await axiosPrivate.delete(`${Delete_URL}/${n}`)
    console.log(response)
    //setAccount(response.data)
    console.log("siema")
    return (
        <p>Podane konto zostalo usuniete</p>
    );
  }

  return(
     <main>
         <Form onSubmit={handleSubmit} />
     </main>

  )
}

export default DeleteCustomer