import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import {useFormik} from "formik";
import * as yup from "yup";
import {Alert, Button, Col, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import {Account} from "../../types/Account";
import {getErrorsWithFirstMessages} from "../../utils/validationErrorUtils";

const editAccountByCustomerValidationSchema = yup.object().shape({
    balance: yup.number().required().min(0).label('Balance'),
    transferLimit: yup.number().required().min(10).label('Transfer Limit'),
});

interface EditAccountByCustomerProps {
}

const EditAccountByCustomer: FC<EditAccountByCustomerProps> = () => {
    const {accountId} = useParams();
    const axios = useAxios()
    const navigate = useNavigate()
    const [account, setAccount] = useState<Account | null>(null)
    const [serverError, setServerError] = useState<string>('')

    const formik = useFormik({
        initialValues: {
            balance: 0,
            transferLimit: 0,
        },
        validationSchema: editAccountByCustomerValidationSchema,
        onSubmit: values => {
            axios.patch(`account-management/customers/auth/accounts/${accountId}`, values)
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

    useEffect(() => {
        axios.get(`account-management/customers/auth/accounts/${accountId}`)
            .then(response => {
                setAccount(response.data)
                formik.setFieldValue('balance', response.data.balance)
                formik.setFieldValue('transferLimit', response.data.transferLimit)
            })
            .catch(error => {
                console.log(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountId, axios])

    return (
        <Col xs={11} sm={8} md={6} lg={5} xxl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Edit account</h3>
            {serverError && <Alert variant="danger" className="text-center">{serverError}</Alert>}
            <Form onSubmit={formik.handleSubmit} noValidate>
                <FloatingLabel label="Account number" className="mb-3">
                    <Form.Control defaultValue={account?.number} disabled/>
                </FloatingLabel>
                <FloatingLabel label="Account type" className="mb-3">
                    <Form.Control defaultValue={account?.accountTypeName} disabled/>
                </FloatingLabel>
                <FloatingLabel label="Account type" className="mb-3">
                    <Form.Control defaultValue={account?.currencyCode} disabled/>
                </FloatingLabel>
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
                    <InputGroup.Text className="rounded-end">{account?.currencyCode}</InputGroup.Text>
                    <label htmlFor="inputBalance" className="z-index-3">Balance</label>
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
                    <InputGroup.Text className="rounded-end">{account?.currencyCode}</InputGroup.Text>
                    <label htmlFor="inputTransferLimit" className="z-index-3">Transfer limit</label>
                    <Form.Control.Feedback type="invalid">{formik.errors.transferLimit}</Form.Control.Feedback>
                </Form.Floating>
                <Form.Group className="mb-3 d-flex justify-content-center">
                    <Form.Check
                        type="switch"
                        label={account?.isActive ? 'Active' : 'Inactive'}
                        className="mb-3"
                        defaultChecked={account?.isActive}
                        disabled
                    />
                </Form.Group>
                <Form.Group className="d-grid mt-4">
                    <Col className="d-flex justify-content-end">
                        <Button type="submit" variant="success" className="me-2">
                            Save changes
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

export default EditAccountByCustomer;
