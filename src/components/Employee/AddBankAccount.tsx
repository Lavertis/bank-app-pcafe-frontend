import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";
import {AxiosError, AxiosResponse} from "axios";
import {Alert, Button, Col, Form, InputGroup} from "react-bootstrap";
import {AccountType} from "../../types/AccountType";
import {Currency} from "../../types/Currency";


interface AddBankAccountProps {
}

const AddBankAccount: FC<AddBankAccountProps> = () => {
    const {id} = useParams<{ id: string }>();
    const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [serverErrors, setServerErrors] = useState<string[]>([])
    const navigate = useNavigate()
    const axios = useAxios()

    const schema = yup.object().shape({
        balance: yup.number().required().min(0),
        transferLimit: yup.number().required().min(100)
    });

    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            balance: 1000,
            transferLimit: 100,
            accountTypeId: '1',
            currencyId: '',
            customerId: id
        },
        onSubmit: values => {
            console.log(values)
            axios.post("accounts", values)
                .then((response: AxiosResponse) => {
                    console.log(response.data)
                    navigate(`/customers/${id}/accounts`, {replace: true})
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
        axios.get("account-types")
            .then((response: AxiosResponse) => {
                setAccountTypes(response.data)
            })
            .catch((err: AxiosError) => {
                console.log(err)
            })

    }, [axios])

    useEffect(() => {
        axios.get(`account-types/${formik.values.accountTypeId}/currencies`)
            .then((response: AxiosResponse) => {
                setCurrencies(response.data)
                formik.setFieldValue('currencyId', response.data[0].id)
            })
            .catch((err: AxiosError) => {
                console.log(err)
            })
    }, [axios, formik])

    return (
        <Col xs={11} sm={8} md={6} lg={5} xxl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            {
                serverErrors.length > 0 &&
                <Alert variant="danger" className="text-center">
                    {serverErrors.map(error => <p key={error} className="m-0">{error}</p>)}
                </Alert>
            }
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputBalance">Balance</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="number"
                            name="balance"
                            id="inputBalance"
                            min={0}
                            onChange={formik.handleChange}
                            value={formik.values.balance}
                            isValid={formik.touched.balance && !formik.errors.balance}
                            isInvalid={formik.touched.balance && !!formik.errors.balance}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.balance}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputTransferLimit">Transfer limit</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="number"
                            name="transferLimit"
                            id="inputTransferLimit"
                            min={100}
                            onChange={formik.handleChange}
                            value={formik.values.transferLimit}
                            isValid={formik.touched.transferLimit && !formik.errors.transferLimit}
                            isInvalid={formik.touched.transferLimit && !!formik.errors.transferLimit}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.transferLimit}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputAccountTypeId">Account type</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Select
                            name="accountTypeId"
                            id="inputAccountTypeId"
                            onChange={formik.handleChange}
                            value={formik.values.accountTypeId}
                            isValid={formik.touched.accountTypeId && !formik.errors.accountTypeId}
                            isInvalid={formik.touched.accountTypeId && !!formik.errors.accountTypeId}>
                            {accountTypes.map(accountType => (
                                <option key={accountType.id} value={accountType.id}>
                                    {accountType.name} (+{accountType.interestRate}%)
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.accountTypeId}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="inputCurrencyId">Currency</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Select
                            name="currencyId"
                            id="inputCurrencyId"
                            onChange={formik.handleChange}
                            value={formik.values.currencyId}
                            isValid={formik.touched.currencyId && !formik.errors.currencyId}
                            isInvalid={formik.touched.currencyId && !!formik.errors.currencyId}>
                            {
                                currencies.map(currency => (
                                    <option key={currency.id} value={currency.id}>
                                        {currency.code}
                                    </option>
                                ))
                            }
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.currencyId}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="d-grid">
                    <Button type="submit" variant="primary">Create Account</Button>
                    <Button variant="secondary" className="mt-2" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default AddBankAccount;
