import React from 'react'
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { AccountInfo } from '../../types/accountInfo';
import {TransferInfo} from './TransferInfo';

const GET_TRANSFERS= '/api/Transfer'
const GetTransfers = () => {
    const [account, setAccount] = useState<AccountInfo | null>(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response= await axiosPrivate.get(GET_TRANSFERS, {
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
        
            <table className="min-w-full border text-center">
            <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                Id
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                First Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                Last Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                Salary
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                Date of employment
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                AppUserId
              </th>
            </tr>
          </thead>
          <tbody>
            {account && Object.keys(account).map(
            (c)=>{
                let acc = account[c]
                return <TransferInfo account={acc} key={acc.id}/>
            }
            )}        
          </tbody>   
          </table>
          
  )
}

export default GetTransfers