import React from 'react'
import { Link } from "react-router-dom";

const Menu = () => {
  return (
      <div>
          <Link to={"/user/GetTransfers"}><div>Select all users</div></Link>
          <Link to={"/user/GetTransferById"}><div>Select by id</div></Link>
          <Link to={"/user/CreateTransfer"}><div>CreateUser</div></Link>
      </div>
    
  )
}

export default Menu