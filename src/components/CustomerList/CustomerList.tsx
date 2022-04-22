import React, {FC, useEffect} from 'react';
import useAxios from "../../hooks/useAxios";
import {Col} from "react-bootstrap";
import CustomerListItem from "../CustomerListItem/CustomerListItem";
import {Customer} from "../../types/Customer";


interface CustomerListProps {
}

const CustomerList: FC<CustomerListProps> = () => {
    const [customers, setCustomers] = React.useState<Customer[]>([]);
    const axios = useAxios();

    useEffect(() => {
        (async () => {
            const response = await axios.get('customer')
            const employees = await response.data;
            setCustomers(employees);
        })();
    }, [axios]);

    const deleteCustomer = async (id: string) => {
        axios.delete(`customer/${id}`)
            .then(() => {
                setCustomers(customers.filter(customer => customer.id !== id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Col xs={11} sm={8} lg={6} className="mx-auto my-5">
            {
                customers.map(customer => (
                    <div className="mt-4" key={customer.id}>
                        <CustomerListItem customer={customer} deleteCustomer={deleteCustomer}/>
                    </div>
                ))
            }
        </Col>
    );
}

export default CustomerList;
