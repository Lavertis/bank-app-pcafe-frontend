import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Account} from "../../../types/Account";
import useAxios from "../../../hooks/useAxios";
import AccountListItem from "./AccountListItem";
import {Col} from "react-bootstrap";


interface AccountListProps {
}

const AccountList: FC<AccountListProps> = () => {
    const {id} = useParams();
    const axios = useAxios();
    const [accounts, setAccounts] = React.useState<Account[]>([]);

    const deleteAccount = (id: number) => {
        axios.delete(`/accounts/${id}`)
            .then(() => {
                const newAccounts = accounts.filter(account => account.id !== id);
                setAccounts(newAccounts);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        axios.get(`accounts/customer/${id}`)
            .then(({data}) => setAccounts(data))
            .catch(console.error);
    }, [axios, id]);

    return (
        <Col xs={11} sm={8} lg={6} className="mx-auto my-5">
            {
                accounts.map(account => (
                    <Col className="mb-4" key={account.id}>
                        <AccountListItem account={account} deleteAccount={deleteAccount}/>
                    </Col>
                ))
            }
        </Col>
    );
}

export default AccountList;
