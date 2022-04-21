import React, {FC} from 'react';
import {Employee} from "../../types/Employee";
import {Button, Card, Col, Table} from "react-bootstrap";


interface EmployeeListItemProps {
    employee: Employee;
}

const EmployeeListItem: FC<EmployeeListItemProps> = ({employee}) => {

    const getDate = (date: Date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString();
    }

    return (
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
                        <td>{employee.salary}</td>
                    </tr>
                    <tr>
                        <td><strong>Gender</strong></td>
                        <td>{employee.gender}</td>
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
                    <Button variant="primary" className="me-2">Edit</Button>
                    <Button variant="danger">Delete</Button>
                </Col>
            </Card.Body>
        </Card>
    );
}

export default EmployeeListItem;
