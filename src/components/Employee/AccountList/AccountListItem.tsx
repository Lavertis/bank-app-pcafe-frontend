import React, {FC, useState} from 'react';
import {Account} from "../../../types/Account";
import {Button, Card, Col, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../../Modals/ConfirmationModal";


interface AccountListItemProps {
    account: Account;
    deleteAccount: (accountId: number) => void;
}

const AccountListItem: FC<AccountListItemProps> = ({account, deleteAccount}) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);

    const deleteAccountHandler = () => {
        deleteAccount(account.id);
        hideModal();
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{account.number}</Card.Title>
                    <Table>
                        <tbody>
                        <tr>
                            <td><strong>Interest rate</strong></td>
                            <td>{account.accountType.interestRate}</td>
                        </tr>
                        <tr>
                            <td><strong>Balance</strong></td>
                            <td>{account.balance} {account.currency.code}</td>
                        </tr>
                        <tr>
                            <td><strong>Transfer limit</strong></td>
                            <td>{account.transferLimit}</td>
                        </tr>
                        <tr>
                            <td><strong>Active</strong></td>
                            <td>{account.isActive ? 'Yes' : 'No'}</td>
                        </tr>
                        </tbody>
                    </Table>
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
                </Card.Body>
            </Card>
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

export default AccountListItem;
