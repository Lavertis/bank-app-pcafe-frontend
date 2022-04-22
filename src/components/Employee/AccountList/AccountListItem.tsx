import React, {FC, useState} from 'react';
import {Account} from "../../../types/Account";
import {Button, Card, Col, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../../Modals/ConfirmationModal";


interface BankAccountListItemProps {
    bankAccount: Account;
    deleteBankAccount: (bankAccountId: number) => void;
}

const AccountListItem: FC<BankAccountListItemProps> = ({bankAccount, deleteBankAccount}) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);

    const deleteAccountHandler = () => {
        deleteBankAccount(bankAccount.id);
        hideModal();
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{bankAccount.number}</Card.Title>
                    <Table>
                        <tbody>
                        <tr>
                            <td><strong>Interest rate</strong></td>
                            <td>{bankAccount.accountType.interestRate}</td>
                        </tr>
                        <tr>
                            <td><strong>Balance</strong></td>
                            <td>{bankAccount.balance} WALUTA</td>
                        </tr>
                        <tr>
                            <td><strong>Transfer limit</strong></td>
                            <td>{bankAccount.transferLimit}</td>
                        </tr>
                        <tr>
                            <td><strong>Active</strong></td>
                            <td>{bankAccount.isActive ? 'Yes' : 'No'}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <Col className="d-flex justify-content-end">
                        <Link to={`/accounts/${bankAccount.id}/edit`}>
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
