import React, {FC, useState} from 'react';
import {Customer} from "../../../types/Customer";
import {Button, Card, Col, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../../Modals/ConfirmationModal";


interface CustomerListItemProps {
    customer: Customer
    deleteCustomer: (id: string) => void
}

const CustomerListItem: FC<CustomerListItemProps> = ({customer, deleteCustomer}) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);

    const getDate = (date: Date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString();
    }

    const deleteCustomerHandler = () => {
        deleteCustomer(customer.id);
        hideModal()
    };

    return (
        <>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>National ID: {customer.nationalId}</Card.Title>
                    <Table responsive className="text-center">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>First name</th>
                            <th>Middle name</th>
                            <th>Last name</th>
                            <th>Date of birth</th>
                            <th>City of birth</th>
                            <th>Father's name</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{customer.userName}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.middleName}</td>
                            <td>{customer.lastName}</td>
                            <td>{getDate(customer.dateOfBirth)}</td>
                            <td>{customer.cityOfBirth}</td>
                            <td>{customer.fathersName}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <Col xs={12} className="d-flex justify-content-between">
                        <Col className="d-flex flex-row" xs={"auto"}>
                            <Link to={`/customers/${customer.id}/accounts/create`}>
                                <Button className="me-2" variant="outline-primary">
                                    Create new account
                                </Button>
                            </Link>
                            <Link to={`/customers/${customer.id}/accounts`}>
                                <Button className="me-2" variant="outline-primary">
                                    View Accounts
                                </Button>
                            </Link>
                        </Col>
                        <Col className="d-flex justify-content-end" xs={"auto"}>
                            <Link to={`/customers/${customer.id}/edit`}>
                                <Button className="me-2" variant="outline-primary">
                                    <FontAwesomeIcon icon={faEdit}/>
                                </Button>
                            </Link>
                            <Button variant="outline-danger" onClick={showModal}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </Col>
                    </Col>
                </Card.Body>
            </Card>
            <ConfirmationModal
                variant={'danger'}
                title={"Delete confirmation"}
                message={"Are you sure you want to delete this customer?"}
                isShown={modalIsShown}
                confirm={deleteCustomerHandler}
                hide={hideModal}
            />
        </>
    );
}

export default CustomerListItem;
