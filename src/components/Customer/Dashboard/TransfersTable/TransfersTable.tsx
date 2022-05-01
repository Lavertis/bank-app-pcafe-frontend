import React, {FC, useEffect, useState} from 'react';
import useAxios from "../../../../hooks/useAxios";
import {Table} from "react-bootstrap";
import {Transfer} from "../../../../types/Transfer";
import TransfersTableRow from "./TransfersTableRow";


interface TransfersTableProps {
}

const TransfersTable: FC<TransfersTableProps> = () => {
    const axios = useAxios()
    const [transfers, setTransfers] = useState<Transfer[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        axios.get('transfer-management/customer/auth/transfers')
            .then(res => {
                setTransfers(res.data.slice(0, 5))
                setIsDataFetched(true)
            })
            .catch(err => {
                console.log(err)
            })
    }, [axios])

    return (
        <>
            {isDataFetched && (!transfers.length ? <h5 className="text-center mb-0 p-3">No transfer history</h5> :
                <Table responsive striped className="text-center mb-0">
                    <thead>
                    <tr>
                        <th>Title</th>
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
                </Table>)}
        </>
    );
}

export default TransfersTable;
