import React, {FC, useState} from 'react';
import {Employee} from "../../../types/Employee";
import {Button, Col} from "react-bootstrap";
import ConfirmationModal from "../../Modals/ConfirmationModal";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";


interface EmployeeTableRowProps {
    employee: Employee;
    deleteEmployee: (id: string) => void;
}

const EmployeeTableRow: FC<EmployeeTableRowProps> = ({employee, deleteEmployee}) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);

    const getDate = (date: Date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString();
    }

    const deleteEmployeeHandler = () => {
        deleteEmployee(employee.id);
        hideModal();
    };

    return (
        <>
            <tr>
                <td>{employee.userName}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.salary}</td>
                <td>{employee.gender === 'F' ? "Female" : "Male"}</td>
                <td>{getDate(employee.dateOfBirth)}</td>
                <td>{getDate(employee.dateOfEmployment)}</td>
                <td>
                    <Col className="d-flex justify-content-center">
                        <Link to={`/employees/${employee.id}/edit`}>
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
                message={"Are you sure you want to delete this employee?"}
                isShown={modalIsShown}
                confirm={deleteEmployeeHandler}
                hide={hideModal}
            />
        </>
    );
}

export default EmployeeTableRow;
