import React, {FC, useEffect, useState} from 'react';
import useAxios from "../../hooks/useAxios";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import moment from "moment";
import {getErrorsWithFirstMessages} from "../../utils/validationErrorUtils";
import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import YupPassword from "yup-password";
import * as yup from "yup";
import {Employee} from "../../types/Employee";

YupPassword(yup);
const editEmployeeValidationSchema = yup.object().shape({
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
    lastName: yup.string().required().minUppercase(1).min(2).max(50).label('Last name'),
    salary: yup.number().required().positive().label('Salary'),
    gender: yup.string().oneOf(['F', 'M']).label('Gender'),
    dateOfBirth: yup.date()
        .required()
        .max(moment().subtract(18, 'years').format("YYYY-MM-DD"), 'Employee must be at least 18 years old')
        .label('Date of birth'),
    dateOfEmployment: yup.date().required().label('Date of employment')
});

interface EditEmployeeProps {
}

const EditEmployee: FC<EditEmployeeProps> = () => {
    const {employeeId} = useParams();
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState<string>('')

    const formik = useFormik({
        initialValues: {
            employeeId: employeeId,
            userName: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            lastName: '',
            salary: 0,
            gender: '',
            dateOfBirth: moment().subtract(18, 'years').format("YYYY-MM-DD"),
            dateOfEmployment: moment().format("YYYY-MM-DD")
        },
        validationSchema: editEmployeeValidationSchema,
        onSubmit: values => {
            axios.patch(`employee-management/employees/${employeeId}`, {
                ...values,
                dateOfBirth: moment(values.dateOfBirth).utc(),
                dateOfEmployment: moment(values.dateOfEmployment).utc()
            })
                .then(() => {
                    navigate('/employees')
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
        axios.get(`employee-management/employees/${employeeId}`)
            .then(response => {
                const employee = response.data as Employee
                formik.setValues({
                    ...formik.values,
                    userName: employee.userName,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    salary: employee.salary,
                    gender: employee.gender,
                    dateOfBirth: employee.dateOfBirth,
                    dateOfEmployment: employee.dateOfEmployment
                })
            })
            .catch(error => {
                console.log(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios, employeeId])

    return (
        <Col xs={11} sm={8} md={6} lg={5} xxl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Update employee details</h3>
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
                <Form.Floating className="mb-3 flex-grow-1 input-group">
                    <Form.Control
                        type="number"
                        name="salary"
                        id="inputSalary"
                        placeholder="Salary"
                        min={0}
                        step={100}
                        onChange={formik.handleChange}
                        value={formik.values.salary}
                        // isValid={formik.touched.salary && !formik.errors.salary}
                        isInvalid={formik.touched.salary && !!formik.errors.salary}
                    />
                    <InputGroup.Text className="rounded-end">PLN</InputGroup.Text>
                    <label htmlFor="inputSalary" className="z-index-3">Salary</label>
                    <Form.Control.Feedback type="invalid">{formik.errors.salary}</Form.Control.Feedback>
                </Form.Floating>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPriority">Gender</Form.Label>
                    <ButtonGroup className="mb-3 d-flex" id="inputPriority">
                        <Button
                            name="gender"
                            variant="outline-primary"
                            active={formik.values.gender === 'F'}
                            value={'F'}
                            onClick={formik.handleChange}>
                            Female
                        </Button>
                        <Button
                            name="gender"
                            variant="outline-primary"
                            active={formik.values.gender === 'M'}
                            value={'M'}
                            onClick={formik.handleChange}>
                            Male
                        </Button>
                    </ButtonGroup>
                </Form.Group>
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
                <FloatingLabel controlId="inputDateOfEmployment" label="Date of employment" className="mb-3">
                    <Form.Control
                        type="date"
                        name="dateOfEmployment"
                        onChange={formik.handleChange}
                        value={moment(formik.values.dateOfEmployment).format("YYYY-MM-DD")}
                        // isValid={formik.touched.dateOfEmployment && !formik.errors.dateOfEmployment}
                        isInvalid={formik.touched.dateOfEmployment && !!formik.errors.dateOfEmployment}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.dateOfEmployment}</Form.Control.Feedback>
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

export default EditEmployee;
