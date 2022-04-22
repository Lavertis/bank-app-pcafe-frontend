import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {BankAccount} from "../../../types/BankAccount";
import useAxios from "../../../hooks/useAxios";
import AccountListItem from "./AccountListItem";
import {Col} from "react-bootstrap";


interface BankAccountListProps {
}

const AccountList: FC<BankAccountListProps> = () => {
    const {id} = useParams();
    const axios = useAxios();
    const [bankAccounts, setBankAccounts] = React.useState<BankAccount[]>([]);

    const deleteBankAccount = (id: number) => {
        axios.delete(`/accounts/${id}`)
            .then(() => {
                const newBankAccounts = bankAccounts.filter(bankAccount => bankAccount.id !== id);
                setBankAccounts(newBankAccounts);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        axios.get(`customers/${id}/accounts`)
            .then(({data}) => setBankAccounts(data))
            .catch(console.error);
    }, [axios, id]);

    return (
        <Col xs={11} sm={8} lg={6} className="mx-auto my-5">
            {
                bankAccounts.map(bankAccount => (
                    <Col className="mb-4" key={bankAccount.id}>
                        <AccountListItem bankAccount={bankAccount} deleteBankAccount={deleteBankAccount}/>
                    </Col>
                ))
            }
        </Col>
    );
}

export default AccountList;
