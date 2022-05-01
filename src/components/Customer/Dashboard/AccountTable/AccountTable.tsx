import React, {FC, useEffect} from 'react';
import {Account} from "../../../../types/Account";
import useAxios from "../../../../hooks/useAxios";
import {Table} from "react-bootstrap";
import AccountTableRow from "./AccountTableRow";


interface AccountTableProps {
}

const AccountTable: FC<AccountTableProps> = () => {
    const axios = useAxios()
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const [isDataFetched, setIsDataFetched] = React.useState(false);

    useEffect(() => {
        axios.get('customers/auth/accounts')
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
            {isDataFetched && (!accounts.length ? <h5 className="text-center">You don't have any account</h5> :
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
                </Table>)}
        </>
    );
}

export default AccountTable;
