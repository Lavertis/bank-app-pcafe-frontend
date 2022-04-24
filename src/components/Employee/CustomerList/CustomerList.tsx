import React, {FC, useEffect} from 'react';
import useAxios from "../../../hooks/useAxios";
import {Card, Col} from "react-bootstrap";
import CustomerListItem from "./CustomerListItem";
import {Customer} from "../../../types/Customer";


interface CustomerListProps {
}

const CustomerList: FC<CustomerListProps> = () => {
    const axios = useAxios();
    const [customers, setCustomers] = React.useState<Customer[]>([]);

    useEffect(() => {
        axios.get('customers')
            .then(res => {
                setCustomers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [axios]);

    const deleteCustomer = async (id: string) => {
        axios.delete(`customers/${id}`)
            .then(() => {
                setCustomers(customers.filter(customer => customer.id !== id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Col xs={11} xl={10} xxl={8} className="mx-auto my-5">
            {customers.map(customer => (
                <Card className="mb-3">
                    <Card.Body>
                        <CustomerListItem customer={customer} deleteCustomer={deleteCustomer}/>
                    </Card.Body>
                </Card>
            ))}
        </Col>
    );
}

export default CustomerList;
