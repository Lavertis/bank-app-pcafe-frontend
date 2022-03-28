import React from 'react'
import { Link } from "react-router-dom";
import Logo from "./Logo"



const Welcome = () => {

    const moveTOLoginPage = () =>{
        <Link to={"/Login"}></Link>

    }

  return (
    <div >
      <div className='relative h-8 w-full bg-peru-300'>
        <Link to={"Login"} >
          <div className='absolute right-40 top-0 h-8 mx-1 my-1 px-1 py-1 justify-evenly flex-1'>
            Zaloguj się
          </div>
        </Link>
      </div >
      <div className='absolute left-40 '>
        <Logo />
      </div>
    </div>
  )
}

export default Welcome