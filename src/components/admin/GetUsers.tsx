import React from 'react'
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { AccountInfo } from '../../types/accountInfo';
import { UserInfo } from './UserInfo';

const GetUsers = () => {
    const [account, setAccount] = useState<AccountInfo | null>(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response= await axiosPrivate.get('https://bank-app-pcafe-api-stage.herokuapp.com/api/Employee', {
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
                return <UserInfo account={acc} key={acc.id}/>
            }
                )}
            
        </main>
  )
}

export default GetUsers