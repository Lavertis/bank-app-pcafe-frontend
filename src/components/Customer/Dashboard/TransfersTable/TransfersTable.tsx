import React, {FC, useEffect} from 'react';
import useAxios from "../../../../hooks/useAxios";
import {Table} from "react-bootstrap";
import {Transfer} from "../../../../types/Transfer";
import TransfersTableRow from "./TransfersTableRow";


interface TransfersTableProps {
}

const TransfersTable: FC<TransfersTableProps> = () => {
    const [transfers, setTransfers] = React.useState<Transfer[]>([]);
    const axios = useAxios()

    useEffect(() => {
        axios.get('transfers/customer/auth')
            .then(res => {
                setTransfers(res.data.slice(0, 10))
            })
            .catch(err => {
                console.log(err)
            })
    }, [axios])

    return (
        <Table className="text-center">
            <thead>
            <tr>
                <th>Receiver's name</th>
                <th>Amount</th>
                <th>Sender's account</th>
                <th>Receiver's account</th>
            </tr>
            </thead>
            <tbody>
            {transfers.map(transfer => (
                <TransfersTableRow transfer={transfer} key={transfer.id}/>
            ))}
            </tbody>
        </Table>
    );
}

export default TransfersTable;
