import React, {FC, useEffect, useState} from 'react';
import useAxios from "../../hooks/useAxios";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import moment from "moment";
import {getErrorsWithFirstMessages} from "../../utils/validationErrorUtils";
import {Alert, Button, Col, FloatingLabel, Form} from "react-bootstrap";
import YupPassword from "yup-password";
import * as yup from "yup";
import {Customer} from "../../types/Customer";

YupPassword(yup);
const addCustomerValidationSchema = yup.object().shape({
    userName: yup.string().required().min(4).max(16).label('Username'),
    password: yup.string().password().label('Password'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .when('password', {
            is: (val: string) => val && val.length > 0,
            then: yup.string().required()
        })
        .label('Password confirmation'),
    firstName: yup.string().required().minUppercase(1).min(2).max(50).label('First name'),
    middleName: yup.string().required().minUppercase(1).min(2).max(50).label('Second name'),
    lastName: yup.string().required().minUppercase(1).min(2).max(50).label('Last name'),
    nationalId: yup.string().required().length(11).matches(/^\d*$/, 'National ID must be a number').label('National ID'),
    dateOfBirth: yup.date()
        .required()
        .max(moment().subtract(18, 'years').format("YYYY-MM-DD"), 'Customer must be at least 18 years old')
        .label('Date of birth'),
    cityOfBirth: yup.string().required().minUppercase(1).min(1).max(50).label('City of birth'),
    fathersName: yup.string().required().minUppercase(1).min(2).max(50).label('Father\'s name'),
});

interface EditCustomerProps {
}

const EditCustomer: FC<EditCustomerProps> = () => {
    const {customerId} = useParams();
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState<string>('')

    const formik = useFormik({
        initialValues: {
            customerId: customerId,
            userName: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            middleName: '',
            lastName: '',
            nationalId: '',
            dateOfBirth: moment().subtract(18, 'years').format("YYYY-MM-DD"),
            cityOfBirth: '',
            fathersName: '',
        },
        validationSchema: addCustomerValidationSchema,
        onSubmit: values => {
            axios.patch(`customer-management/customers/${customerId}`, {
                ...values,
                dateOfBirth: moment(values.dateOfBirth).utc()
            })
                .then(() => {
                    navigate('/customers')
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
        axios.get(`customer-management/customers/${customerId}`)
            .then(response => {
                const customer = response.data as Customer
                formik.setValues({
                    ...formik.values,
                    userName: customer.userName,
                    firstName: customer.firstName,
                    middleName: customer.middleName,
                    lastName: customer.lastName,
                    nationalId: customer.nationalId,
                    dateOfBirth: customer.dateOfBirth,
                    cityOfBirth: customer.cityOfBirth,
                    fathersName: customer.fathersName,
                })
            })
            .catch(error => {
                console.log(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios, customerId])

    return (
        <Col xs={11} sm={8} md={6} lg={5} xxl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Update customer details</h3>
            {serverError && <Alert variant="danger" className="text-center">{serverError}</Alert>}
            <Form onSubmit={formik.handleSubmit} noValidate>
                <FloatingLabel controlId="inputUserName" label="Username" className="mb-3">
                    <Form.Control
                        type="text"
                        name="userName"
                        placeholder="Username"
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                        // isValid={formik.touched.userName && !formik.errors.userName}
                        isInvalid={formik.touched.userName && !!formik.errors.userName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.userName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputPassword" label="Password" className="mb-3">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        // isValid={formik.touched.password && !formik.errors.password}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputPasswordConfirmation" label="Password confirmation" className="mb-3">
                    <Form.Control
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Password confirmation"
                        onChange={formik.handleChange}
                        value={formik.values.passwordConfirmation}
                        // isValid={formik.touched.passwordConfirmation && !formik.errors.passwordConfirmation}
                        isInvalid={formik.touched.passwordConfirmation && !!formik.errors.passwordConfirmation}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputFirstName" label="First name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        // isValid={formik.touched.firstName && !formik.errors.firstName}
                        isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputSecondName" label="Middle name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="middleName"
                        placeholder="Middle name"
                        onChange={formik.handleChange}
                        value={formik.values.middleName}
                        // isValid={formik.touched.middleName && !formik.errors.middleName}
                        isInvalid={formik.touched.middleName && !!formik.errors.middleName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.middleName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputLastName" label="Last name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        // isValid={formik.touched.lastName && !formik.errors.lastName}
                        isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputNationalId" label="National ID" className="mb-3">
                    <Form.Control
                        type="text"
                        name="nationalId"
                        placeholder="National ID"
                        onChange={formik.handleChange}
                        value={formik.values.nationalId}
                        // isValid={formik.touched.nationalId && !formik.errors.nationalId}
                        isInvalid={formik.touched.nationalId && !!formik.errors.nationalId}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.nationalId}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputDateOfBirth" label="Date of birth" className="mb-3">
                    <Form.Control
                        type="date"
                        name="dateOfBirth"
                        onChange={formik.handleChange}
                        value={moment(formik.values.dateOfBirth).format("YYYY-MM-DD")}
                        // isValid={formik.touched.dateOfBirth && !formik.errors.dateOfBirth}
                        isInvalid={formik.touched.dateOfBirth && !!formik.errors.dateOfBirth}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.dateOfBirth}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputCityOfBirth" label="City of birth" className="mb-3">
                    <Form.Control
                        type="text"
                        name="cityOfBirth"
                        placeholder="City of birth"
                        onChange={formik.handleChange}
                        value={formik.values.cityOfBirth}
                        // isValid={formik.touched.cityOfBirth && !formik.errors.cityOfBirth}
                        isInvalid={formik.touched.cityOfBirth && !!formik.errors.cityOfBirth}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.cityOfBirth}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputFathersName" label="Father's name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="fathersName"
                        placeholder="Father's name"
                        onChange={formik.handleChange}
                        value={formik.values.fathersName}
                        // isValid={formik.touched.fathersName && !formik.errors.fathersName}
                        isInvalid={formik.touched.fathersName && !!formik.errors.fathersName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.fathersName}</Form.Control.Feedback>
                </FloatingLabel>
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

export default EditCustomer;
