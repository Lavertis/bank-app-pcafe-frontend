import React, {FC, useState} from 'react';
import {Customer} from "../../types/Customer";
import {Button, Card, Col, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";


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
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{customer.firstName} {customer.secondName} {customer.lastName}</Card.Title>
                    <Table>
                        <tbody>
                        <tr>
                            <td><strong>Id</strong></td>
                            <td>{customer.id}</td>
                        </tr>
                        <tr>
                            <td><strong>National ID</strong></td>
                            <td>{customer.nationalId}</td>
                        </tr>
                        <tr>
                            <td><strong>Date of birth</strong></td>
                            <td>{getDate(customer.dateOfBirth)}</td>
                        </tr>
                        <tr>
                            <td><strong>Father's name</strong></td>
                            <td>{customer.fathersName}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <Col className="d-flex justify-content-end">
                        <Link replace={false} to={`/customers/edit/${customer.id}`}>
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
                message={"Are you sure you want to delete this customer?"}
                isShown={modalIsShown}
                confirm={deleteCustomerHandler}
                hide={hideModal}
            />
        </>
    );
}

export default CustomerListItem;
