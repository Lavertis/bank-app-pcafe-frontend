import React, {FC} from 'react';
import {Account} from "../../../../types/Account";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


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
        <td>
            <Link to={`/accounts/${account.id}/edit`}>
                <Button variant="outline-primary">
                    <FontAwesomeIcon icon={faEdit}/>
                </Button>
            </Link>
        </td>
    </tr>
);

export default AccountTableRow;
