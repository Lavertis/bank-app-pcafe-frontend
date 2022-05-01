import React, {FC, useEffect, useState} from 'react';
import useAxios from "../../../hooks/useAxios";
import {Alert, Col} from "react-bootstrap";
import CustomerListItem from "./CustomerListItem";
import {Customer} from "../../../types/Customer";


interface CustomerListProps {
}

const CustomerList: FC<CustomerListProps> = () => {
    const axios = useAxios();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const deleteCustomer = async (id: string) => {
        axios.delete(`customer-management/customers/${id}`)
            .then(() => {
                setCustomers(customers.filter(customer => customer.id !== id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get('customer-management/customers')
            .then(res => {
                setCustomers(res.data);
                setIsDataFetched(true);
            })
            .catch(err => {
                console.log(err);
            });
    }, [axios]);

    return (
        <>
            {isDataFetched && (!customers.length ?
                <Alert variant="primary" className="mt-5 mx-auto">No customers</Alert> :
                <Col xs={11} xl={10} xxl={9} className="mx-auto my-5">
                    {customers.map(customer => (
                        <CustomerListItem
                            key={customer.id}
                            customer={customer}
                            deleteCustomer={deleteCustomer}
                        />
                    ))}
                </Col>)}
        </>
    );
}

export default CustomerList;
