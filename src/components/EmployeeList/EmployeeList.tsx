import React, {FC, useEffect} from 'react';
import {Employee} from "../../types/Employee";
import useAxios from "../../hooks/useAxios";
import {Col} from "react-bootstrap";
import EmployeeListItem from "../EmployeeListItem/EmployeeListItem";


interface EmployeeListProps {
}

const EmployeeList: FC<EmployeeListProps> = () => {
    const [employees, setEmployees] = React.useState<Employee[]>([]);
    const axios = useAxios();

    useEffect(() => {
        (async () => {
            const response = await axios.get('employees')
            const employees = await response.data;
            setEmployees(employees);
        })();
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
        <Col xs={11} sm={8} lg={6} className="mx-auto my-5">
            {
                employees.map(employee => (
                    <Col className="mb-4" key={employee.id}>
                        <EmployeeListItem employee={employee} deleteEmployee={deleteEmployee}/>
                    </Col>
                ))
            }
        </Col>
    );
}

export default EmployeeList;
