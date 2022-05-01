import React, {FC, useEffect, useState} from 'react';
import {Account} from "../../../../types/Account";
import useAxios from "../../../../hooks/useAxios";
import {Table} from "react-bootstrap";
import AccountTableRow from "./AccountTableRow";


interface AccountTableProps {
}

const AccountTable: FC<AccountTableProps> = () => {
    const axios = useAxios()
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        axios.get('account-management/customers/auth/accounts')
            .then(res => {
                setAccounts(res.data)
                setIsDataFetched(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [axios])

    return (
        <>
            {isDataFetched && (!accounts.length ? <h5 className="text-center mb-0 p-3">You don't have any account</h5> :
                <Table responsive striped className="text-center mb-0">
                    <thead>
                    <tr>
                        <th>Account type</th>
                        <th>Account number</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Currency</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.map(account => (
                        <AccountTableRow account={account} key={account.id}/>
                    ))}
                    </tbody>
                </Table>)}
        </>
    );
}

export default AccountTable;
