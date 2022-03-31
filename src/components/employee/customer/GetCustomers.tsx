import React from 'react'
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { AccountInfo } from '../../../types/accountInfo';
import { CustomerInfo } from './CustomerInfo';


const CUSTOMER_URL = '/api/Customer';
const GetCustomers = () => {
    const [account, setAccount] = useState<AccountInfo | null>(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response= await axiosPrivate.get(CUSTOMER_URL, {
                    signal: controller.signal
                });
                isMounted && setAccount(response.data);

            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        
        getUsers();
        
        return () => {
            isMounted = false;
            controller.abort();
        }
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

export default GetCustomers