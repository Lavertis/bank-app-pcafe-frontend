import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import useAxios from "../../hooks/useAxios";
import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import moment from "moment";
import * as yup from 'yup';
import YupPassword from 'yup-password'

YupPassword(yup);
const addEmployeeValidationSchema = yup.object().shape({
    userName: yup.string().required().min(4).max(16).label('Username'),
    password: yup.string().password().required().label('Password'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required()
        .label('Password confirmation'),
    firstName: yup.string().required().minUppercase(1).min(2).max(50).label('First name'),
    lastName: yup.string().required().minUppercase(1).min(2).max(50).label('Last name'),
    salary: yup.number().required().positive().label('Salary'),
    gender: yup.string().oneOf(['F', 'M']).label('Gender'),
    dateOfBirth: yup.date()
        .required()
        .min(moment().subtract(15, 'years').format("YYYY-MM-DD"))
        .label('Date of birth'),
    dateOfEmployment: yup.date().required().min(moment().format("YYYY-MM-DD")).label('Date of employment')
});

interface AddEmployeeProps {
}

const AddEmployee: FC<AddEmployeeProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverErrors, setServerErrors] = React.useState<string[]>([])

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            lastName: '',
            salary: 1000,
            gender: 'F',
            dateOfEmployment: moment().format("YYYY-MM-DD"),
            dateOfBirth: moment().subtract(15, 'years').format("YYYY-MM-DD")
        },
        validationSchema: addEmployeeValidationSchema,
        onSubmit: values => {
            axios.post("employees", {
                ...values,
                dateOfBirth: moment(values.dateOfBirth).utc(),
                dateOfEmployment: moment(values.dateOfEmployment).utc()
            })
                .then(response => {
                    console.log(response.data)
                    navigate('/employees')
                })
                .catch(error => {
                    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                        setServerErrors([])
                        const errors = error.response.data.errors
                        console.log(errors)
                        Object.keys(errors).forEach(key => {
                            setServerErrors(serverErrors => [...serverErrors, errors[key]])
                        })
                    }
                })
        },
    });

    return (
        <Col xs={11} sm={8} md={6} lg={5} xxl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Add new employee</h3>
            {
                serverErrors.length > 0 &&
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
                        isValid={formik.touched.salary && !formik.errors.salary}
                        isInvalid={formik.touched.salary && !!formik.errors.salary}
                    />
                    <InputGroup.Text className="rounded-end">PLN</InputGroup.Text>
                    <label htmlFor="inputSalary" style={{zIndex: 3}}>Salary</label>
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
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputDateOfBirth">Date of birth</Form.Label>
                    <Form.Control
                        type="date"
                        id="inputDateOfBirth"
                        name="dateOfBirth"
                        onChange={formik.handleChange}
                        value={moment(formik.values.dateOfBirth).format("YYYY-MM-DD")}
                        isValid={formik.touched.dateOfBirth && !formik.errors.dateOfBirth}
                        isInvalid={formik.touched.dateOfBirth && !!formik.errors.dateOfBirth}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.dateOfBirth}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputDateOfEmployment">Date of employment</Form.Label>
                    <Form.Control
                        type="date"
                        id="inputDateOfEmployment"
                        name="dateOfEmployment"
                        onChange={formik.handleChange}
                        value={moment(formik.values.dateOfEmployment).format("YYYY-MM-DD")}
                        isValid={formik.touched.dateOfEmployment && !formik.errors.dateOfEmployment}
                        isInvalid={formik.touched.dateOfEmployment && !!formik.errors.dateOfEmployment}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.dateOfEmployment}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="d-grid mt-4">
                    <Col className="d-flex justify-content-end">
                        <Button type="submit" variant="primary" className="me-2">
                            Create Employee
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

export default AddEmployee;
