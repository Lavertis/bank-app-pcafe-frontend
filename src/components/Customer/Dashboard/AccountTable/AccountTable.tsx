import React, {FC, useEffect} from 'react';
import {Account} from "../../../../types/Account";
import useAxios from "../../../../hooks/useAxios";
import {Table} from "react-bootstrap";
import AccountTableRow from "./AccountTableRow";


interface AccountTableProps {
}

const AccountTable: FC<AccountTableProps> = () => {
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const axios = useAxios()

    useEffect(() => {
        axios.get('customers/auth/accounts')
            .then(res => {
                setAccounts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [axios])

    return (
        <>
            {!accounts.length ? <h5 className="text-center">No accounts</h5> :
                <Table responsive striped className="text-center">
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
                </Table>
            }
        </>
    );
}

export default AccountTable;
