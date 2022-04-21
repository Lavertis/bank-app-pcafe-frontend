import React, {FC, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import moment from "moment";
import {AxiosError, AxiosResponse} from "axios";
import useAxios from "../../hooks/useAxios";
import {Alert, Button, ButtonGroup, Col, Form, InputGroup} from "react-bootstrap";
import {Employee} from "../../types/Employee";


interface EditEmployeeProps {
}

const EditEmployee: FC<EditEmployeeProps> = () => {
    const navigate = useNavigate()
    const [employee, setEmployee] = React.useState<Employee>()
    const [serverErrors, setServerErrors] = React.useState<string[]>([])
    const axios = useAxios()
    const {id} = useParams();

    const schema = yup.object().shape({
        userName: yup.string().required().min(3),
        password: yup.string().required().min(4),
        firstName: yup.string().required().min(2),
        lastName: yup.string().required().min(2),
        salary: yup.number().required().positive(),
        gender: yup.string().oneOf(['F', 'M']),
        dateOfBirth: yup.mixed().required(),
        dateOfEmployment: yup.mixed().required()
    });

    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            userName: employee?.appUser.userName,
            password: '',
            firstName: employee?.firstName,
            lastName: employee?.lastName,
            salary: employee?.salary,
            gender: employee?.gender,
            dateOfEmployment: employee?.dateOfEmployment,
            dateOfBirth: employee?.dateOfBirth
        },
        onSubmit: values => {
            axios.put(`employee/${id}`, {
                ...values,
                dateOfBirth: moment(values.dateOfBirth).utc(),
                dateOfEmployment: moment(values.dateOfEmployment).utc()
            })
                .then((response: AxiosResponse) => {
                    console.log(response.data)
                    navigate('/employees', {replace: true})
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

    useEffect(() => {
        axios.get(`/employee/${id}`)
            .then((response: AxiosResponse) => {
                setEmployee(response.data)
                formik.setValues(response.data)
                formik.setFieldValue('userName', response.data.appUser.userName)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            })
    }, [])

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
                    <Form.Label htmlFor="inputSalary">Salary</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="number"
                            name="salary"
                            id="inputSalary"
                            onChange={formik.handleChange}
                            value={formik.values.salary}
                            isValid={formik.touched.salary && !formik.errors.salary}
                            isInvalid={formik.touched.salary && !!formik.errors.salary}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.salary}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
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
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="inputDateOfEmployment">Date of employment</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="date"
                            id="inputDateOfEmployment"
                            name="dateOfEmployment"
                            onChange={formik.handleChange}
                            value={moment(formik.values.dateOfEmployment).format("YYYY-MM-DD")}
                            isValid={formik.touched.dateOfEmployment && !formik.errors.dateOfEmployment}
                            isInvalid={formik.touched.dateOfEmployment && !!formik.errors.dateOfEmployment}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.dateOfEmployment}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="d-grid">
                    <Button variant="success" type="submit" className="mb-2">Save</Button>
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default EditEmployee;
