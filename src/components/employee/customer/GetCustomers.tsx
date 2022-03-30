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
        <main>
            {account && Object.keys(account).map(
                (c)=>{
                    let acc = account[c]
                return <CustomerInfo account={acc} key={acc.id}/>
            }
                )}
            
        </main>
  )
}

export default GetCustomers