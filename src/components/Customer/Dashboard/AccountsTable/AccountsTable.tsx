import React, {FC, useEffect} from 'react';
import {Account} from "../../../../types/Account";
import useAxios from "../../../../hooks/useAxios";
import {Table} from "react-bootstrap";
import AccountsTableRow from "./AccountsTableRow";


interface AccountTableProps {
}

const AccountsTable: FC<AccountTableProps> = () => {
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const axios = useAxios()

    useEffect(() => {
        axios.get('accounts/customer/auth')
            .then(res => {
                setAccounts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [axios])

    return (
        <Table className="text-center">
            <thead>
            <tr>
                <th>Account type</th>
                <th>Account number</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Currency</th>
            </tr>
            </thead>
            <tbody>
            {accounts.map(account => (
                <AccountsTableRow account={account} key={account.id}/>
            ))}
            </tbody>
        </Table>
    );
}

export default AccountsTable;
