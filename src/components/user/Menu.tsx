import React from 'react'
import { Link } from "react-router-dom";

const Menu = () => {
  return (
      <div>
          <Link to={"/user/GetTransfers"}><div>GetTransfers</div></Link>
          <Link to={"/user/GetTransferById"}><div>GetTransferById</div></Link>
          <Link to={"/user/CreateTransfer"}><div>CreateTransfer</div></Link>
      </div>
    
  )
}

export default Menu