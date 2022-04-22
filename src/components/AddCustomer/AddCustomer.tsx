import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";
import moment from "moment";
import {AxiosError, AxiosResponse} from "axios";
import {Alert, Button, Col, Form, InputGroup} from "react-bootstrap";


interface AddCustomerProps {
}

const AddCustomer: FC<AddCustomerProps> = () => {
    const navigate = useNavigate()
    const [serverErrors, setServerErrors] = React.useState<string[]>([])
    const axios = useAxios()

    const schema = yup.object().shape({
        userName: yup.string().required().min(3),
        password: yup.string().required().min(4),
        firstName: yup.string().required().min(2),
        secondName: yup.string().required().min(2),
        lastName: yup.string().required().min(2),
        nationalId: yup.string().required().length(11).matches(/^\d*$/, 'National ID must be a number'),
        dateOfBirth: yup.mixed().required(),
        cityOfBirth: yup.string().required().min(2),
        fathersName: yup.string().required().min(2),
    });

    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            userName: '',
            password: '',
            firstName: '',
            secondName: '',
            lastName: '',
            nationalId: '',
            dateOfBirth: Date.now(),
            cityOfBirth: '',
            fathersName: '',
        },
        onSubmit: values => {
            axios.post("customer", {
                ...values,
                dateOfBirth: moment(values.dateOfBirth).utc()
            })
                .then((response: AxiosResponse) => {
                    console.log(response.data)
                    navigate('/customers', {replace: true})
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
            {
                serverErrors.length > 0 &&
                <Alert variant="danger" className="text-center">
                    {serverErrors.map(error => <p key={error} className="m-0">{error}</p>)}
                </Alert>
            }
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputUserName">Username</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="userName"
                            id="inputUserName"
                            onChange={formik.handleChange}
                            value={formik.values.userName}
                            isValid={formik.touched.userName && !formik.errors.userName}
                            isInvalid={formik.touched.userName && !!formik.errors.userName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.userName}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            name="password"
                            id="inputPassword"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            isValid={formik.touched.password && !formik.errors.password}
                            isInvalid={formik.touched.password && !!formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputFirstName">First name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="firstName"
                            id="inputFirstName"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            isValid={formik.touched.firstName && !formik.errors.firstName}
                            isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.firstName}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputFirstName">Second name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="secondName"
                            id="inputSecondName"
                            onChange={formik.handleChange}
                            value={formik.values.secondName}
                            isValid={formik.touched.secondName && !formik.errors.secondName}
                            isInvalid={formik.touched.secondName && !!formik.errors.secondName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.secondName}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputLastName">Last name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="lastName"
                            id="inputLastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            isValid={formik.touched.lastName && !formik.errors.lastName}
                            isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.lastName}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputNationalId">National ID</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="nationalId"
                            id="inputNationalId"
                            onChange={formik.handleChange}
                            value={formik.values.nationalId}
                            isValid={formik.touched.nationalId && !formik.errors.nationalId}
                            isInvalid={formik.touched.nationalId && !!formik.errors.nationalId}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.nationalId}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputDateOfBirth">Date of birth</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="date"
                            id="inputDateOfBirth"
                            name="dateOfBirth"
                            onChange={formik.handleChange}
                            value={moment(formik.values.dateOfBirth).format("YYYY-MM-DD")}
                            isValid={formik.touched.dateOfBirth && !formik.errors.dateOfBirth}
                            isInvalid={formik.touched.dateOfBirth && !!formik.errors.dateOfBirth}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.dateOfBirth}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputCityOfBirth">City of birth</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="cityOfBirth"
                            id="inputCityOfBirth"
                            onChange={formik.handleChange}
                            value={formik.values.cityOfBirth}
                            isValid={formik.touched.cityOfBirth && !formik.errors.cityOfBirth}
                            isInvalid={formik.touched.cityOfBirth && !!formik.errors.cityOfBirth}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.cityOfBirth}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="inputFathersName">Father's name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="fathersName"
                            id="inputFathersName"
                            onChange={formik.handleChange}
                            value={formik.values.fathersName}
                            isValid={formik.touched.fathersName && !formik.errors.fathersName}
                            isInvalid={formik.touched.fathersName && !!formik.errors.fathersName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.fathersName}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="d-grid">
                    <Button type="submit" variant="primary">Create Customer</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default AddCustomer;
