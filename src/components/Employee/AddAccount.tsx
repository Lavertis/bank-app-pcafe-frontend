import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";
import {AxiosError, AxiosResponse} from "axios";
import {Alert, Button, Col, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import {AccountType} from "../../types/AccountType";
import {Currency} from "../../types/Currency";


const accountValidationSchema = yup.object().shape({
    balance: yup.number().required().min(0).label('Balance'),
    transferLimit: yup.number().required().min(10).label('Transfer Limit'),
    accountTypeId: yup.number().required().label('Account Type Id'),
    currencyId: yup.number().required().label('Currency Id'),
});

interface AddAccountProps {
}

const AddAccount: FC<AddAccountProps> = () => {
    const {id} = useParams<{ id: string }>();
    const axios = useAxios()
    const navigate = useNavigate()
    const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [serverErrors, setServerErrors] = useState<string[]>([])

    const formik = useFormik({
        initialValues: {
            balance: 1000,
            transferLimit: 100,
            accountTypeId: '1',
            currencyId: '0',
            customerId: id
        },
        validationSchema: accountValidationSchema,
        onSubmit: values => {
            console.log(values)
            axios.post("accounts", values)
                .then((response: AxiosResponse) => {
                    console.log(response.data)
                    navigate(`/customers/${id}/accounts`)
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

    const getSelectedCurrencyCode = () => {
        const currency = currencies.find(currency => currency.id.toString() === formik.values.currencyId)
        return currency ? currency.code : ''
    }

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
                formik.setFieldValue('currencyId', response.data[0].id.toString())
            })
            .catch((err: AxiosError) => {
                console.log(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios, formik.values.accountTypeId])

    return (
        <Col xs={11} sm={8} md={6} lg={5} xxl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Add new account</h3>
            {
                serverErrors.length > 0 &&
                <Alert variant="danger" className="text-center">
                    {serverErrors.map(error => <p key={error} className="m-0">{error}</p>)}
                </Alert>
            }
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Form.Floating className="mb-3 flex-grow-1 input-group">
                    <Form.Control
                        type="number"
                        name="balance"
                        id="inputBalance"
                        placeholder="Balance"
                        min={0}
                        step={100}
                        onChange={formik.handleChange}
                        value={formik.values.balance}
                        isValid={formik.touched.balance && !formik.errors.balance}
                        isInvalid={formik.touched.balance && !!formik.errors.balance}
                    />
                    <InputGroup.Text className="rounded-end">{getSelectedCurrencyCode()}</InputGroup.Text>
                    <label htmlFor="inputBalance" style={{zIndex: 3}}>Balance</label>
                    <Form.Control.Feedback type="invalid">{formik.errors.balance}</Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3 flex-grow-1 input-group">
                    <Form.Control
                        type="number"
                        name="transferLimit"
                        id="inputTransferLimit"
                        placeholder="Transfer limit"
                        min={0}
                        step={10}
                        onChange={formik.handleChange}
                        value={formik.values.transferLimit}
                        isValid={formik.touched.transferLimit && !formik.errors.transferLimit}
                        isInvalid={formik.touched.transferLimit && !!formik.errors.transferLimit}
                    />
                    <InputGroup.Text className="rounded-end">{getSelectedCurrencyCode()}</InputGroup.Text>
                    <label htmlFor="inputTransferLimit" style={{zIndex: 3}}>Transfer limit</label>
                    <Form.Control.Feedback type="invalid">{formik.errors.transferLimit}</Form.Control.Feedback>
                </Form.Floating>
                <FloatingLabel controlId="inputAccountTypeId" label="Account type" className="mb-3">
                    <Form.Select
                        name="accountTypeId"
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
                    <Form.Control.Feedback type="invalid">{formik.errors.accountTypeId}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputCurrencyId" label="Currency" className="mb-3">
                    <Form.Select
                        name="currencyId"
                        onChange={formik.handleChange}
                        value={formik.values.currencyId}
                        isValid={formik.touched.currencyId && !formik.errors.currencyId}
                        isInvalid={formik.touched.currencyId && !!formik.errors.currencyId}>
                        {currencies.map(currency => (
                            <option key={currency.id} value={currency.id}>
                                {currency.code}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formik.errors.currencyId}</Form.Control.Feedback>
                </FloatingLabel>
                <Form.Group className="d-grid mt-4">
                    <Col className="d-flex justify-content-end">
                        <Button type="submit" variant="primary" className="me-2">
                            Create Account
                        </Button>
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default AddAccount;
