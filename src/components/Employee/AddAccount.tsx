import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";
import {AxiosError, AxiosResponse} from "axios";
import {Alert, Button, Col, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import {AccountType} from "../../types/AccountType";
import {Currency} from "../../types/Currency";
import {getErrorsWithFirstMessages} from "../../helpers/fluent-validation";


const accountValidationSchema = yup.object().shape({
    Balance: yup.number().required().min(0).label('Balance'),
    TransferLimit: yup.number().required().min(10).label('Transfer Limit'),
    AccountTypeId: yup.number().required().label('Account Type Id'),
    CurrencyId: yup.number().required().label('Currency Id'),
});

interface AddAccountProps {
}

const AddAccount: FC<AddAccountProps> = () => {
    const {id} = useParams<{ id: string }>();
    const axios = useAxios()
    const navigate = useNavigate()
    const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [serverError, setServerError] = React.useState<string>('')

    const formik = useFormik({
        initialValues: {
            Balance: 1000,
            TransferLimit: 100,
            AccountTypeId: '1',
            CurrencyId: '0',
            CustomerId: id
        },
        validationSchema: accountValidationSchema,
        onSubmit: values => {
            console.log(values)
            axios.post("accounts", values)
                .then(() => {
                    navigate(`/customers/${id}/accounts`)
                })
                .catch(error => {
                    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                        const fluentValidationErrors = getErrorsWithFirstMessages(error.response.data.errors)
                        formik.setErrors(fluentValidationErrors)
                        console.log(fluentValidationErrors)
                        setServerError(error.response.data.error)
                    }
                })
        },
    });

    const getSelectedCurrencyCode = () => {
        const currency = currencies.find(currency => currency.id.toString() === formik.values.CurrencyId)
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
        axios.get(`account-types/${formik.values.AccountTypeId}/currencies`)
            .then((response: AxiosResponse) => {
                setCurrencies(response.data)
                formik.setFieldValue('CurrencyId', response.data[0].id.toString())
            })
            .catch((err: AxiosError) => {
                console.log(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios, formik.values.AccountTypeId])

    return (
        <Col xs={11} sm={8} md={6} lg={5} xxl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Add new account</h3>
            {serverError && <Alert variant="danger" className="text-center">{serverError}</Alert>}
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Form.Floating className="mb-3 flex-grow-1 input-group">
                    <Form.Control
                        type="number"
                        name="Balance"
                        id="inputBalance"
                        placeholder="Balance"
                        min={0}
                        step={100}
                        onChange={formik.handleChange}
                        value={formik.values.Balance}
                        isValid={formik.touched.Balance && !formik.errors.Balance}
                        isInvalid={formik.touched.Balance && !!formik.errors.Balance}
                    />
                    <InputGroup.Text className="rounded-end">{getSelectedCurrencyCode()}</InputGroup.Text>
                    <label htmlFor="inputBalance" className="z-index-3">Balance</label>
                    <Form.Control.Feedback type="invalid">{formik.errors.Balance}</Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating className="mb-3 flex-grow-1 input-group">
                    <Form.Control
                        type="number"
                        name="TransferLimit"
                        id="inputTransferLimit"
                        placeholder="Transfer limit"
                        min={0}
                        step={10}
                        onChange={formik.handleChange}
                        value={formik.values.TransferLimit}
                        isValid={formik.touched.TransferLimit && !formik.errors.TransferLimit}
                        isInvalid={formik.touched.TransferLimit && !!formik.errors.TransferLimit}
                    />
                    <InputGroup.Text className="rounded-end">{getSelectedCurrencyCode()}</InputGroup.Text>
                    <label htmlFor="inputTransferLimit" className="z-index-3">Transfer limit</label>
                    <Form.Control.Feedback type="invalid">{formik.errors.TransferLimit}</Form.Control.Feedback>
                </Form.Floating>
                <FloatingLabel controlId="inputAccountTypeId" label="Account type" className="mb-3">
                    <Form.Select
                        name="AccountTypeId"
                        onChange={formik.handleChange}
                        value={formik.values.AccountTypeId}
                        isValid={formik.touched.AccountTypeId && !formik.errors.AccountTypeId}
                        isInvalid={formik.touched.AccountTypeId && !!formik.errors.AccountTypeId}>
                        {accountTypes.map(accountType => (
                            <option key={accountType.id} value={accountType.id}>
                                {accountType.name} (+{accountType.interestRate}%)
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formik.errors.AccountTypeId}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputCurrencyId" label="Currency" className="mb-3">
                    <Form.Select
                        name="CurrencyId"
                        onChange={formik.handleChange}
                        value={formik.values.CurrencyId}
                        isValid={formik.touched.CurrencyId && !formik.errors.CurrencyId}
                        isInvalid={formik.touched.CurrencyId && !!formik.errors.CurrencyId}>
                        {currencies.map(currency => (
                            <option key={currency.id} value={currency.id}>
                                {currency.code}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{formik.errors.CurrencyId}</Form.Control.Feedback>
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
