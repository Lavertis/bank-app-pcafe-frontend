import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Account} from "../../../types/Account";
import useAxios from "../../../hooks/useAxios";
import AccountTableRow from "./AccountTableRow";
import {Col, Table} from "react-bootstrap";


interface AccountTableProps {
}

const AccountTable: FC<AccountTableProps> = () => {
    const {customerId} = useParams();
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
        axios.get(`accounts/customer/${customerId}`)
            .then(({data}) => setAccounts(data))
            .catch(console.error);
    }, [axios, customerId]);

    return (
        <Col xs={11} xxl={9} className="mx-auto my-5 card py-4 px-5">
            <Table responsive className="text-center caption-top">
                <caption>Customer's accounts</caption>
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Type</th>
                    <th>Balance</th>
                    <th>Transfer limit</th>
                    <th>Interest rate</th>
                    <th>Currency</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    accounts.map(account => (
                        <AccountTableRow
                            key={account.id}
                            account={account}
                            deleteAccount={deleteAccount}
                        />
                    ))
                }
                </tbody>
            </Table>
        </Col>
    );
}

export default AccountTable;
