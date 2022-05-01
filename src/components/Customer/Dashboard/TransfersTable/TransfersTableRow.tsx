import React, {FC} from 'react';
import {Transfer} from "../../../../types/Transfer";


interface TransfersTableRowProps {
    transfer: Transfer
}

const TransfersTableRow: FC<TransfersTableRowProps> = ({transfer}) => (
    <tr>
        <td>{transfer.title}</td>
        <td>{transfer.amount.toFixed(2)} {transfer.senderAccountCurrencyCode}</td>
        <td>{transfer.senderAccountNumber}</td>
        <td>{transfer.receiverAccountNumber} </td>
    </tr>
);

export default TransfersTableRow;
