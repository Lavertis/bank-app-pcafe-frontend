import React from 'react'
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


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
    <div className='flex h-screen w-full'>
    <form
    className='m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 '
    onSubmit={handleSubmit}
    >
      <label htmlFor='id'
      className ='form-label-input'>
      <input className ='form-input'
      placeholder='podaj xd'
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


export const DeleteEmployee = () =>{
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (n:string) =>{
    const response = await axiosPrivate.delete(`${Delete_URL}/${n}`)
    console.log(response)
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

