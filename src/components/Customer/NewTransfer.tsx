import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";
import {Alert, Button, Col, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import {Account} from "../../types/Account";
import {getErrorsWithFirstMessages} from "../../utils/validationErrorUtils";

const transferValidationSchema = yup.object().shape({
    amount: yup.number().required().positive().label('Amount'),
    senderAccountId: yup.string().required().label("Sender's account id"),
    receiverAccountNumber: yup.string()
        .required()
        .length(16)
        .matches(/^\d*$/, 'Receiver\'s account number must contain only digits')
        .label("Receiver's account number"),
    receiverName: yup.string().required().min(3).label("Receiver's name"),
    title: yup.string().required().label("Title")
});

interface NewTransferProps {
}

const NewTransfer: FC<NewTransferProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [serverError, setServerError] = useState<string>('')

    const formik = useFormik({
        initialValues: {
            amount: 0,
            senderAccountId: '',
            receiverAccountNumber: '0'.repeat(16),
            receiverName: '',
            title: ''
        },
        validationSchema: transferValidationSchema,
        onSubmit: values => {
            axios.post("transfer-management/transfers", values)
                .then(() => {
                    navigate(`/dashboard`)
                })
                .catch(error => {
                    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                        const fluentValidationErrors = getErrorsWithFirstMessages(error.response.data.errors)
                        formik.setErrors(fluentValidationErrors)
                        setServerError(error.response.data.error)
                    }
                })
        },
    });

    const getSelectedAccountCurrency = () => {
        return accounts.find(account => account.id.toString() === formik.values.senderAccountId)?.currencyCode
            ?? accounts[0]?.currencyCode
    }

    useEffect(() => {
        axios.get(`account-management/customers/auth/accounts`)
            .then(response => {
                const accounts = response.data as Account[]
                const activeAccounts = accounts.filter(account => account.isActive)
                setAccounts(activeAccounts)
                if (activeAccounts.length > 0) {
                    formik.setFieldValue('senderAccountId', activeAccounts[0].id.toString())
                }
                setIsDataFetched(true)
            })
            .catch(error => {
                console.log(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios])

    return (
        <>
            {isDataFetched && (!accounts.length ?
                <Alert variant="primary" className="mt-5 mx-auto">
                    You don't have any (active) account to make a transfer
                </Alert> :
                <Col xs={11} sm={8} md={6} lg={5} xl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
                    <h3 className="mb-4">Send transfer</h3>
                    {serverError && <Alert variant="danger" className="text-center">{serverError}</Alert>}
                    <Form onSubmit={formik.handleSubmit} noValidate>
                        <Form.Floating className="mb-3 flex-grow-1 input-group">
                            <Form.Control
                                type="number"
                                name="amount"
                                id="inputAmount"
                                placeholder="Amount"
                                min={0}
                                step={1}
                                onChange={formik.handleChange}
                                value={formik.values.amount}
                                isValid={formik.touched.amount && !formik.errors.amount}
                                isInvalid={formik.touched.amount && !!formik.errors.amount}
                            />
                            <InputGroup.Text
                                className="rounded-end">{getSelectedAccountCurrency()}</InputGroup.Text>
                            <label htmlFor="inputSalary" className="z-index-3">Amount</label>
                            <Form.Control.Feedback type="invalid">{formik.errors.amount}</Form.Control.Feedback>
                        </Form.Floating>
                        <FloatingLabel controlId="inputSenderAccountId" label="From account" className="mb-3">
                            <Form.Select
                                name="senderAccountId"
                                id="inputSenderAccountId"
                                onChange={formik.handleChange}
                                value={formik.values.senderAccountId}
                                // isValid={formik.touched.senderAccountId && !formik.errors.senderAccountId}
                                isInvalid={formik.touched.senderAccountId && !!formik.errors.senderAccountId}>
                                {accounts.map(account => (
                                    account.isActive && <option key={account.id} value={account.id}>
                                        {account.number} ({account.balance.toFixed(2)} {account.currencyCode})
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback
                                type="invalid">{formik.errors.senderAccountId}</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="inputReceiverAccountNumber" label="Receiver's account number"
                                       className="mb-3">
                            <Form.Control
                                type="text"
                                name="receiverAccountNumber"
                                placeholder="Receiver's account number"
                                onChange={formik.handleChange}
                                value={formik.values.receiverAccountNumber}
                                // isValid={formik.touched.receiverAccountNumber && !formik.errors.receiverAccountNumber}
                                isInvalid={formik.touched.receiverAccountNumber && !!formik.errors.receiverAccountNumber}
                            />
                            <Form.Control.Feedback
                                type="invalid">{formik.errors.receiverAccountNumber}</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="inputReceiverName" label="Receiver's name" className="mb-3">
                            <Form.Control
                                type="text"
                                name="receiverName"
                                placeholder="Receiver's name"
                                onChange={formik.handleChange}
                                value={formik.values.receiverName}
                                isValid={formik.touched.receiverName && !formik.errors.receiverName}
                                isInvalid={formik.touched.receiverName && !!formik.errors.receiverName}
                            />
                            <Form.Control.Feedback
                                type="invalid">{formik.errors.receiverName}</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel controlId="inputTitle" label="Title" className="mb-3">
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                isValid={formik.touched.title && !formik.errors.title}
                                isInvalid={formik.touched.title && !!formik.errors.title}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
                        </FloatingLabel>
                        <Form.Group className="d-grid mt-4">
                            <Button type="submit" variant="primary">Send transfer</Button>
                        </Form.Group>
                    </Form>
                </Col>)}
        </>
    );
}

export default NewTransfer;