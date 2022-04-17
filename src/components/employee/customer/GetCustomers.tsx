import React from 'react'
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { AccountInfo } from '../../../types/accountInfo';
import { CustomerInfo } from './CustomerInfo';


const CUSTOMER_URL = '/api/Customer';
export const GetCustomers = () => {
    const [account, setAccount] = useState<AccountInfo | null>(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
      (async () =>{
        
        const response = await axiosPrivate.get(CUSTOMER_URL);
        (response.status===403) ? navigate('/login', { state: { from: location }, replace: true }) : 
        setAccount(response.data)
    })()
  }, [])
  

    
  return (
        <table>
            <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                Id
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                User Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                First Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                Second Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                Last Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                National Id
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                City Of Birth
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                Fathers Name
              </th>
            </tr>
          </thead>
          <tbody>
            {account && Object.keys(account).map(
                (c)=>{
                    let acc = account[c]
                return <CustomerInfo account={acc} key={acc.id}/>
            }
                )}
          </tbody>  
        </table>
  )
}
