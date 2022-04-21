import React, {FC, useState} from 'react';
import {Employee} from "../../types/Employee";
import {Button, Card, Col, Table} from "react-bootstrap";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";


interface EmployeeListItemProps {
    employee: Employee;
    deleteEmployee: (id: string) => void;
}

const EmployeeListItem: FC<EmployeeListItemProps> = ({employee, deleteEmployee}) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);

    const getDate = (date: Date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString();
    }

    const deleteEmployeeHandler = () => {
        deleteEmployee(employee.id);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>{employee.firstName} {employee.lastName}</Card.Title>
                    <Table>
                        <tbody>
                        <tr>
                            <td><strong>Id</strong></td>
                            <td>{employee.id}</td>
                        </tr>
                        <tr>
                            <td><strong>Salary</strong></td>
                            <td>{employee.salary} PLN</td>
                        </tr>
                        <tr>
                            <td><strong>Gender</strong></td>
                            <td>{employee.gender === 'F' ? "Female" : "Male"}</td>
                        </tr>
                        <tr>
                            <td><strong>Date of birth</strong></td>
                            <td>{getDate(employee.dateOfBirth)}</td>
                        </tr>
                        <tr>
                            <td><strong>Date of employment</strong></td>
                            <td>{getDate(employee.dateOfEmployment)}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <Col className="d-flex justify-content-end">
                        <Link replace={false} to={`/employees/edit/${employee.id}`}>
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
                message={"Are you sure you want to delete this employee?"}
                isShown={modalIsShown}
                confirm={deleteEmployeeHandler}
                hide={hideModal}
            />
        </>
    );
}

export default EmployeeListItem;
