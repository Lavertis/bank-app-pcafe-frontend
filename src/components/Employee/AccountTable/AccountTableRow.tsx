import React, {FC, useState} from 'react';
import {Account} from "../../../types/Account";
import {Button, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../../Modals/ConfirmationModal";


interface AccountTableRowProps {
    account: Account;
    deleteAccount: (accountId: number) => void;
}

const AccountTableRow: FC<AccountTableRowProps> = ({account, deleteAccount}) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);

    const deleteAccountHandler = () => {
        deleteAccount(account.id);
        hideModal();
    };

    return (
        <>
            <tr>
                <td>{account.number}</td>
                <td>{account.accountType.name}</td>
                <td>{account.balance.toFixed(2)} {account.currency.code}</td>
                <td>{account.transferLimit} {account.currency.code}</td>
                <td>+{account.accountType.interestRate}%</td>
                <td>{account.currency.code}</td>
                <td>{account.isActive ? 'Active' : 'Deactivated'}</td>
                <td>
                    <Col className="d-flex justify-content-end">
                        <Link to={`/accounts/${account.id}/edit`}>
                            <Button className="me-2" variant="outline-primary">
                                <FontAwesomeIcon icon={faEdit}/>
                            </Button>
                        </Link>
                        <Button variant="outline-danger" onClick={showModal}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </Button>
                    </Col>
                </td>
            </tr>
            <ConfirmationModal
                variant={'danger'}
                title={"Delete confirmation"}
                message={"Are you sure you want to delete this account?"}
                isShown={modalIsShown}
                confirm={deleteAccountHandler}
                hide={hideModal}
            />
        </>
    );
}

export default AccountTableRow;
