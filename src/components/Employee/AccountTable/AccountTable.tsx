import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Account} from "../../../types/Account";
import useAxios from "../../../hooks/useAxios";
import AccountTableRow from "./AccountTableRow";
import {Alert, Card, Col, Table} from "react-bootstrap";


interface AccountTableProps {
}

const AccountTable: FC<AccountTableProps> = () => {
    const {customerId} = useParams();
    const axios = useAxios();
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const [isDataFetched, setIsDataFetched] = React.useState(false);

    const deleteAccount = (id: number) => {
        axios.delete(`/accounts/${id}`)
            .then(() => {
                const newAccounts = accounts.filter(account => account.id !== id);
                setAccounts(newAccounts);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        axios.get(`customers/${customerId}/accounts`)
            .then(({data}) => {
                setAccounts(data)
                setIsDataFetched(true)
            })
            .catch(error => {
                console.log(error);
            });
    }, [axios, customerId]);

    return (
        <>
            {isDataFetched && (!accounts.length ?
                <Alert variant="primary" className="text-center mx-auto mt-5">No accounts</Alert> :
                <Col xs={11} xxl={9} className="mx-auto my-5">
                    <Card className="mb-4 border-bottom-0">
                        <h5 className="card-header">Customer's accounts</h5>
                        <Table responsive className="text-center caption-top mb-0">
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
                            {accounts.map(account => (
                                <AccountTableRow
                                    key={account.id}
                                    account={account}
                                    customerId={customerId}
                                    deleteAccount={deleteAccount}
                                />
                            ))}
                            </tbody>
                        </Table>
                    </Card>

                </Col>)}
        </>
    );
}

export default AccountTable;
