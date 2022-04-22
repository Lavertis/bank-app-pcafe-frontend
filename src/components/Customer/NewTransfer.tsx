import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";
import {AxiosError, AxiosResponse} from "axios";
import {Alert, Button, Col, Form, InputGroup} from "react-bootstrap";
import {Account} from "../../types/Account";


interface NewTransferProps {
}

const NewTransfer: FC<NewTransferProps> = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [serverErrors, setServerErrors] = useState<string[]>([])
    const navigate = useNavigate()
    const axios = useAxios()

    const schema = yup.object().shape({
        amount: yup.number().required().positive(),
        receiverAccountNumber: yup.string().required().length(16),
        receiverName: yup.string().required().min(3),
        description: yup.string(),
        accountId: yup.string().required()
    });

    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            amount: 0,
            receiverAccountNumber: '0'.repeat(16),
            receiverName: '',
            description: '',
            accountId: ''
        },
        onSubmit: values => {
            console.log(values)
            axios.post("transfers", values)
                .then((response: AxiosResponse) => {
                    console.log(response.data)
                    navigate(`/dashboard`)
                })
                .catch((err: AxiosError) => {
                    if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                        setServerErrors([])
                        const errors = err.response.data.errors
                        console.log(errors)
                        Object.keys(errors).forEach(key => {
                            setServerErrors(serverErrors => [...serverErrors, errors[key]])
                        })
                    }
                })
        },
    });

    useEffect(() => {
        axios.get(`accounts/auth`)
            .then((response: AxiosResponse) => {
                setAccounts(response.data)
                if (response.data.length > 0) {
                    formik.setFieldValue('accountId', response.data[0].id)

                }
            })
            .catch((err: AxiosError) => {
                console.log(err)
            })
    }, [axios])

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            {
                serverErrors.length > 0 &&
                <Alert variant="danger" className="text-center">
                    {serverErrors.map(error => <p key={error} className="m-0">{error}</p>)}
                </Alert>
            }
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputAmount">Amount</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="number"
                            name="amount"
                            id="inputAmount"
                            step={0.01}
                            min={0.01}
                            onChange={formik.handleChange}
                            value={formik.values.amount}
                            isValid={formik.touched.amount && !formik.errors.amount}
                            isInvalid={formik.touched.amount && !!formik.errors.amount}
                        />
                        <InputGroup.Text>
                            {
                                accounts.find(account => account.id.toString() === formik.values.accountId)?.currency.code
                                ?? accounts[0]?.currency.code
                            }
                        </InputGroup.Text>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.amount}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputAccountId">From account</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Select
                            name="accountId"
                            id="inputAccountId"
                            onChange={formik.handleChange}
                            value={formik.values.accountId}
                            isValid={formik.touched.accountId && !formik.errors.accountId}
                            isInvalid={formik.touched.accountId && !!formik.errors.accountId}>
                            {accounts.map(account => (
                                <option key={account.id} value={account.id}>
                                    {account.number} ({account.balance} {account.currency.code})
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.accountId}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputReceiverAccountNumber">Receiver's account number</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="receiverAccountNumber"
                            id="inputReceiverAccountNumber"
                            onChange={formik.handleChange}
                            value={formik.values.receiverAccountNumber}
                            isValid={formik.touched.receiverAccountNumber && !formik.errors.receiverAccountNumber}
                            isInvalid={formik.touched.receiverAccountNumber && !!formik.errors.receiverAccountNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.receiverAccountNumber}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputReceiverName">Receiver's name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="receiverName"
                            id="inputReceiverName"
                            onChange={formik.handleChange}
                            value={formik.values.receiverName}
                            isValid={formik.touched.receiverName && !formik.errors.receiverName}
                            isInvalid={formik.touched.receiverName && !!formik.errors.receiverName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.receiverName}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputDescription">Description</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            id="inputDescription"
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            isValid={formik.touched.description && !formik.errors.description}
                            isInvalid={formik.touched.description && !!formik.errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.description}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="d-grid mt-4">
                    <Button type="submit" variant="primary">Send Transfer</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default NewTransfer;
