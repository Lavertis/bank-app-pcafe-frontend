import React, {FC} from 'react';
import {Account} from "../../../../types/Account";


interface AccountTableRowProps {
    account: Account
}

const AccountsTableRow: FC<AccountTableRowProps> = ({account}) => (
    <tr>
        <td>{account.accountType.name}</td>
        <td>{account.number}</td>
        <td>{account.balance}</td>
        <td>{account.isActive ? 'Active' : 'Deactivated'}</td>
        <td>{account.currency.code}</td>
    </tr>
);

export default AccountsTableRow;
