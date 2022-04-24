import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";
import moment from "moment";
import {AxiosError} from "axios";
import {Alert, Button, Col, FloatingLabel, Form} from "react-bootstrap";
import YupPassword from "yup-password";

YupPassword(yup);
const addCustomerValidationSchema = yup.object().shape({
    userName: yup.string().required().min(4).max(16).label('Username'),
    password: yup.string().password().required().label('Password'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required()
        .label('Password confirmation'),
    firstName: yup.string().required().minUppercase(1).min(2).max(50).label('First name'),
    secondName: yup.string().required().minUppercase(1).min(2).max(50).label('Second name'),
    lastName: yup.string().required().minUppercase(1).min(2).max(50).label('Last name'),
    nationalId: yup.string().required().min(9).matches(/^\d*$/, 'National ID must be a number').label('National ID'),
    dateOfBirth: yup.date()
        .required()
        .min(moment().subtract(18, 'years').format("YYYY-MM-DD"))
        .label('Date of birth'),
    cityOfBirth: yup.string().required().minUppercase(1).min(1).max(50).label('City of birth'),
    fathersName: yup.string().required().minUppercase(1).min(2).max(50).label('Father\'s name'),
});

interface AddCustomerProps {
}

const AddCustomer: FC<AddCustomerProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverErrors, setServerErrors] = React.useState<string[]>([])

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            secondName: '',
            lastName: '',
            nationalId: '',
            dateOfBirth: moment().subtract(15, 'years').format("YYYY-MM-DD"),
            cityOfBirth: '',
            fathersName: '',
        },
        validationSchema: addCustomerValidationSchema,
        onSubmit: values => {
            axios.post("customers", {
                ...values,
                dateOfBirth: moment(values.dateOfBirth).utc()
            })
                .then(() => {
                    navigate('/customers')
                })
                .catch((err: AxiosError) => {
                    if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                        setServerErrors([])
                        const errors = err.response.data.errors
                        Object.keys(errors).forEach(key => {
                            setServerErrors(serverErrors => [...serverErrors, errors[key]])
                        })
                    }
                })
        },
    });

    return (
        <Col xs={11} sm={8} md={6} lg={5} xxl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Add new customer</h3>
            {serverErrors.length > 0 &&
                <Alert variant="danger" className="text-center">
                    {serverErrors.map(error => <p key={error} className="m-0">{error}</p>)}
                </Alert>
            }
            <Form onSubmit={formik.handleSubmit} noValidate>
                <FloatingLabel controlId="inputUserName" label="Username" className="mb-3">
                    <Form.Control
                        type="text"
                        name="userName"
                        placeholder="Username"
                        onChange={formik.handleChange}
                        value={formik.values.userName}
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
                        isValid={formik.touched.password && !formik.errors.password}
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
                        isValid={formik.touched.passwordConfirmation && !formik.errors.passwordConfirmation}
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
                        isValid={formik.touched.firstName && !formik.errors.firstName}
                        isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputSecondName" label="Second name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="secondName"
                        placeholder="Second name"
                        onChange={formik.handleChange}
                        value={formik.values.secondName}
                        isValid={formik.touched.secondName && !formik.errors.secondName}
                        isInvalid={formik.touched.secondName && !!formik.errors.secondName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.secondName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputLastName" label="Last name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        isValid={formik.touched.lastName && !formik.errors.lastName}
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
                        isValid={formik.touched.nationalId && !formik.errors.nationalId}
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
                        isValid={formik.touched.dateOfBirth && !formik.errors.dateOfBirth}
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
                        isValid={formik.touched.cityOfBirth && !formik.errors.cityOfBirth}
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
                        isValid={formik.touched.fathersName && !formik.errors.fathersName}
                        isInvalid={formik.touched.fathersName && !!formik.errors.fathersName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.fathersName}</Form.Control.Feedback>
                </FloatingLabel>
                <Form.Group className="d-grid mt-4">
                    <Button type="submit" variant="primary">Create Customer</Button>
                    <Button variant="secondary" className="mt-2" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default AddCustomer;
