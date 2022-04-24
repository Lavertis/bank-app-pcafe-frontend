import React, {FC} from 'react';
import {Account} from "../../../../types/Account";


interface AccountTableRowProps {
    account: Account
}

const AccountTableRow: FC<AccountTableRowProps> = ({account}) => (
    <tr>
        <td>{account.accountType.name}</td>
        <td>{account.number}</td>
        <td>{account.balance.toFixed(2)} {account.currency.code}</td>
        <td>{account.isActive ? 'Active' : 'Deactivated'}</td>
        <td>{account.currency.code}</td>
    </tr>
);

export default AccountTableRow;
