import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";
import moment from "moment";
import {Alert, Button, Col, FloatingLabel, Form} from "react-bootstrap";
import YupPassword from "yup-password";
import {getErrorsWithFirstMessages} from "../../helpers/fluent-validation";

YupPassword(yup);
const addCustomerValidationSchema = yup.object().shape({
    UserName: yup.string().required().min(4).max(16).label('Username'),
    Password: yup.string().password().required().label('Password'),
    PasswordConfirmation: yup.string()
        .oneOf([yup.ref('Password'), null], 'Passwords must match')
        .required()
        .label('Password confirmation'),
    FirstName: yup.string().required().minUppercase(1).min(2).max(50).label('First name'),
    MiddleName: yup.string().required().minUppercase(1).min(2).max(50).label('Second name'),
    LastName: yup.string().required().minUppercase(1).min(2).max(50).label('Last name'),
    NationalId: yup.string().required().min(9).matches(/^\d*$/, 'National ID must be a number').label('National ID'),
    DateOfBirth: yup.date()
        .required()
        .max(moment().subtract(18, 'years').format("YYYY-MM-DD"), 'Customer must be at least 18 years old')
        .label('Date of birth'),
    CityOfBirth: yup.string().required().minUppercase(1).min(1).max(50).label('City of birth'),
    FathersName: yup.string().required().minUppercase(1).min(2).max(50).label('Father\'s name'),
});

interface AddCustomerProps {
}

const AddCustomer: FC<AddCustomerProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverError, setServerError] = React.useState<string>('')

    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: '',
            PasswordConfirmation: '',
            FirstName: '',
            MiddleName: '',
            LastName: '',
            NationalId: '',
            DateOfBirth: moment().subtract(18, 'years').format("YYYY-MM-DD"),
            CityOfBirth: '',
            FathersName: '',
        },
        validationSchema: addCustomerValidationSchema,
        onSubmit: values => {
            axios.post("customer-management/customers", {
                ...values,
                DateOfBirth: moment(values.DateOfBirth).utc()
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

    return (
        <Col xs={11} sm={8} md={6} lg={5} xxl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Add new customer</h3>
            {serverError && <Alert variant="danger" className="text-center">{serverError}</Alert>}
            <Form onSubmit={formik.handleSubmit} noValidate>
                <FloatingLabel controlId="inputUserName" label="Username" className="mb-3">
                    <Form.Control
                        type="text"
                        name="UserName"
                        placeholder="Username"
                        onChange={formik.handleChange}
                        value={formik.values.UserName}
                        // isValid={formik.touched.UserName && !formik.errors.UserName}
                        isInvalid={formik.touched.UserName && !!formik.errors.UserName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.UserName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputPassword" label="Password" className="mb-3">
                    <Form.Control
                        type="password"
                        name="Password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.Password}
                        isValid={formik.touched.Password && !formik.errors.Password}
                        isInvalid={formik.touched.Password && !!formik.errors.Password}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.Password}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputPasswordConfirmation" label="Password confirmation" className="mb-3">
                    <Form.Control
                        type="password"
                        name="PasswordConfirmation"
                        placeholder="Password confirmation"
                        onChange={formik.handleChange}
                        value={formik.values.PasswordConfirmation}
                        isValid={formik.touched.PasswordConfirmation && !formik.errors.PasswordConfirmation}
                        isInvalid={formik.touched.PasswordConfirmation && !!formik.errors.PasswordConfirmation}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.PasswordConfirmation}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputFirstName" label="First name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="FirstName"
                        placeholder="First name"
                        onChange={formik.handleChange}
                        value={formik.values.FirstName}
                        isValid={formik.touched.FirstName && !formik.errors.FirstName}
                        isInvalid={formik.touched.FirstName && !!formik.errors.FirstName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.FirstName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputSecondName" label="Middle name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="MiddleName"
                        placeholder="Middle name"
                        onChange={formik.handleChange}
                        value={formik.values.MiddleName}
                        isValid={formik.touched.MiddleName && !formik.errors.MiddleName}
                        isInvalid={formik.touched.MiddleName && !!formik.errors.MiddleName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.MiddleName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputLastName" label="Last name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="LastName"
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        value={formik.values.LastName}
                        isValid={formik.touched.LastName && !formik.errors.LastName}
                        isInvalid={formik.touched.LastName && !!formik.errors.LastName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.LastName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputNationalId" label="National ID" className="mb-3">
                    <Form.Control
                        type="text"
                        name="NationalId"
                        placeholder="National ID"
                        onChange={formik.handleChange}
                        value={formik.values.NationalId}
                        // isValid={formik.touched.NationalId && !formik.errors.NationalId}
                        isInvalid={formik.touched.NationalId && !!formik.errors.NationalId}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.NationalId}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputDateOfBirth" label="Date of birth" className="mb-3">
                    <Form.Control
                        type="date"
                        name="DateOfBirth"
                        onChange={formik.handleChange}
                        value={moment(formik.values.DateOfBirth).format("YYYY-MM-DD")}
                        isValid={formik.touched.DateOfBirth && !formik.errors.DateOfBirth}
                        isInvalid={formik.touched.DateOfBirth && !!formik.errors.DateOfBirth}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.DateOfBirth}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputCityOfBirth" label="City of birth" className="mb-3">
                    <Form.Control
                        type="text"
                        name="CityOfBirth"
                        placeholder="City of birth"
                        onChange={formik.handleChange}
                        value={formik.values.CityOfBirth}
                        isValid={formik.touched.CityOfBirth && !formik.errors.CityOfBirth}
                        isInvalid={formik.touched.CityOfBirth && !!formik.errors.CityOfBirth}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.CityOfBirth}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputFathersName" label="Father's name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="FathersName"
                        placeholder="Father's name"
                        onChange={formik.handleChange}
                        value={formik.values.FathersName}
                        isValid={formik.touched.FathersName && !formik.errors.FathersName}
                        isInvalid={formik.touched.FathersName && !!formik.errors.FathersName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.FathersName}</Form.Control.Feedback>
                </FloatingLabel>
                <Form.Group className="d-grid mt-4">
                    <Col className="d-flex justify-content-end">
                        <Button type="submit" variant="primary" className="me-2">
                            Create Customer
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

export default AddCustomer;