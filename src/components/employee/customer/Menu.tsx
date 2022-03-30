import React from 'react'
import { Link } from "react-router-dom";

const Menu = () => {
  return (
      <div>
          <Link to={"/employee/customer/GetCustomers"}><div>Select all users</div></Link>
          <Link to={"/employee/customer/GetCustomersById"}><div>Select by id</div></Link>
          <Link to={"/employee/customer/CreateCustomerAccount"}><div>CreateUser</div></Link>
          <Link to={"/employee/customer/UpdateCustomer"}><div>UpdateUser</div></Link>
          <Link to={"/employee/customer/DeleteCustomer"}><div>DeleteUser</div></Link>
          <Link to={"/employee/account/CreateBankAccount"}><div>AddBankAccount</div></Link> 
          <Link to={"/employee/account/GetBankAccounts"}><div>GetBankAccounts</div></Link>   
          <Link to={"/employee/account/GetBankAccountById"}><div>GetBankAccountById</div></Link>
          <Link to={"/employee/account/UpdateAccount"}><div>UpdateAccount</div></Link>
      </div>
    
  )
}

export default Menu