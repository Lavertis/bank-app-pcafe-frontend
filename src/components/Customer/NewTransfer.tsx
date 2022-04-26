import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";
import {Alert, Button, Col, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import {Account} from "../../types/Account";
import {getErrorsWithFirstMessages} from "../../helpers/fluent-validation";

const transferValidationSchema = yup.object().shape({
    Amount: yup.number().required().positive().label('Amount'),
    SenderAccountId: yup.string().required().label("Sender's account id"),
    ReceiverAccountNumber: yup.string()
        .required()
        .length(16)
        .matches(/^\d*$/, 'Receiver\'s account number must contain only digits')
        .label("Receiver's account number"),
    ReceiverName: yup.string().required().min(3).label("Receiver's name"),
    Title: yup.string().required().label("Title")
});

interface NewTransferProps {
}

const NewTransfer: FC<NewTransferProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [serverError, setServerError] = React.useState<string>('')

    const formik = useFormik({
        initialValues: {
            Amount: 0,
            SenderAccountId: '',
            ReceiverAccountNumber: '0'.repeat(16),
            ReceiverName: '',
            Title: ''
        },
        validationSchema: transferValidationSchema,
        onSubmit: values => {
            axios.post("transfers", values)
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
        return accounts.find(account => account.id.toString() === formik.values.SenderAccountId)?.currency.code
            ?? accounts[0]?.currency.code
    }

    useEffect(() => {
        axios.get(`customers/auth/accounts`)
            .then(response => {
                setAccounts(response.data)
                if (response.data.length > 0) {
                    formik.setFieldValue('SenderAccountId', response.data[0].id)
                }
            })
            .catch(error => {
                console.log(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios])

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Send transfer</h3>
            {serverError && <Alert variant="danger" className="text-center">{serverError}</Alert>}
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Form.Floating className="mb-3 flex-grow-1 input-group">
                    <Form.Control
                        type="number"
                        name="Amount"
                        id="inputAmount"
                        placeholder="Amount"
                        min={0}
                        step={1}
                        onChange={formik.handleChange}
                        value={formik.values.Amount}
                        isValid={formik.touched.Amount && !formik.errors.Amount}
                        isInvalid={formik.touched.Amount && !!formik.errors.Amount}
                    />
                    <InputGroup.Text className="rounded-end">{getSelectedAccountCurrency()}</InputGroup.Text>
                    <label htmlFor="inputSalary" className="z-index-3">Amount</label>
                    <Form.Control.Feedback type="invalid">{formik.errors.Amount}</Form.Control.Feedback>
                </Form.Floating>
                <FloatingLabel controlId="inputSenderAccountId" label="From account" className="mb-3">
                    <Form.Select
                        name="SenderAccountId"
                        id="inputSenderAccountId"
                        onChange={formik.handleChange}
                        value={formik.values.SenderAccountId}
                        // isValid={formik.touched.SenderAccountId && !formik.errors.SenderAccountId}
                        isInvalid={formik.touched.SenderAccountId && !!formik.errors.SenderAccountId}>
                        {accounts.map(account => (
                            <option key={account.id} value={account.id}>
                                {account.number} ({account.balance.toFixed(2)} {account.currency.code})
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formik.errors.SenderAccountId}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputReceiverAccountNumber" label="Receiver's account number"
                               className="mb-3">
                    <Form.Control
                        type="text"
                        name="ReceiverAccountNumber"
                        placeholder="Receiver's account number"
                        onChange={formik.handleChange}
                        value={formik.values.ReceiverAccountNumber}
                        // isValid={formik.touched.ReceiverAccountNumber && !formik.errors.ReceiverAccountNumber}
                        isInvalid={formik.touched.ReceiverAccountNumber && !!formik.errors.ReceiverAccountNumber}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.ReceiverAccountNumber}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputReceiverName" label="Receiver's name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="ReceiverName"
                        placeholder="Receiver's name"
                        onChange={formik.handleChange}
                        value={formik.values.ReceiverName}
                        isValid={formik.touched.ReceiverName && !formik.errors.ReceiverName}
                        isInvalid={formik.touched.ReceiverName && !!formik.errors.ReceiverName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.ReceiverName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputTitle" label="Title" className="mb-3">
                    <Form.Control
                        type="text"
                        name="Title"
                        placeholder="Title"
                        onChange={formik.handleChange}
                        value={formik.values.Title}
                        isValid={formik.touched.Title && !formik.errors.Title}
                        isInvalid={formik.touched.Title && !!formik.errors.Title}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.Title}</Form.Control.Feedback>
                </FloatingLabel>
                <Form.Group className="d-grid mt-4">
                    <Button type="submit" variant="primary">Send transfer</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default NewTransfer;