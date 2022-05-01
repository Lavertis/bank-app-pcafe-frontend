import React, {FC, useEffect} from 'react';
import {Employee} from "../../../types/Employee";
import useAxios from "../../../hooks/useAxios";
import {Alert, Card, Col, Table} from "react-bootstrap";
import EmployeeTableRow from "./EmployeeTableRow";


interface EmployeeTableProps {
}

const EmployeeTable: FC<EmployeeTableProps> = () => {
    const axios = useAxios();
    const [employees, setEmployees] = React.useState<Employee[]>([]);
    const [isDataFetched, setIsDataFetched] = React.useState(false);

    useEffect(() => {
        axios.get('employees')
            .then(res => {
                console.log(res.data);
                setEmployees(res.data);
                setIsDataFetched(true);
            })
            .catch(err => {
                console.log(err);
            });
    }, [axios]);

    const deleteEmployee = async (id: string) => {
        axios.delete(`employees/${id}`)
            .then(() => {
                setEmployees(employees.filter(employee => employee.id !== id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            {isDataFetched && (!employees.length ?
                <Alert variant="primary" className="mx-auto mt-5">No employees</Alert> :
                <Col xs={11} xl={10} xxl={9} className="mx-auto my-5">
                    <Card className="mb-4 border-bottom-0">
                        <h5 className="card-header">List of employees</h5>
                        <Table responsive striped className="text-center caption-top mb-0">
                            <thead>
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Salary</th>
                                <th>Gender</th>
                                <th>Date of birth</th>
                                <th>Date of employment</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.map(employee => (
                                <EmployeeTableRow
                                    key={employee.id}
                                    employee={employee}
                                    deleteEmployee={deleteEmployee}
                                />
                            ))}
                            </tbody>
                        </Table>
                    </Card>
                </Col>)}
        </>
    );
}

export default EmployeeTable;
