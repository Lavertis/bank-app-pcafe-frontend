import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import useAxios from "../../hooks/useAxios";
import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form, InputGroup} from "react-bootstrap";
import moment from "moment";
import * as yup from 'yup';
import YupPassword from 'yup-password'
import {getErrorsWithFirstMessages} from "../../helpers/fluent-validation";

YupPassword(yup);
const addEmployeeValidationSchema = yup.object().shape({
    UserName: yup.string().required().min(4).max(16).label('Username'),
    Password: yup.string().password().required().label('Password'),
    PasswordConfirmation: yup.string()
        .oneOf([yup.ref('Password'), null], 'Passwords must match')
        .required()
        .label('Password confirmation'),
    FirstName: yup.string().required().minUppercase(1).min(2).max(50).label('First name'),
    LastName: yup.string().required().minUppercase(1).min(2).max(50).label('Last name'),
    Salary: yup.number().required().positive().label('Salary'),
    Gender: yup.string().oneOf(['F', 'M']).label('Gender'),
    DateOfBirth: yup.date()
        .required()
        .max(moment().subtract(18, 'years').format("YYYY-MM-DD"), 'Employee must be at least 18 years old')
        .label('Date of birth'),
    DateOfEmployment: yup.date().required().label('Date of employment')
});

interface AddEmployeeProps {
}

const AddEmployee: FC<AddEmployeeProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverError, setServerError] = React.useState<string>('')

    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: '',
            PasswordConfirmation: '',
            FirstName: '',
            LastName: '',
            Salary: 1000,
            Gender: 'F',
            DateOfBirth: moment().subtract(18, 'years').format("YYYY-MM-DD"),
            DateOfEmployment: moment().format("YYYY-MM-DD")
        },
        validationSchema: addEmployeeValidationSchema,
        onSubmit: values => {
            axios.post("employee-management/employees", {
                ...values,
                DateOfBirth: moment(values.DateOfBirth).utc(),
                DateOfEmployment: moment(values.DateOfEmployment).utc()
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

    return (
        <Col xs={11} sm={8} md={6} lg={5} xxl={4} className="mx-auto my-5 bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Add new employee</h3>
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
                <Form.Floating className="mb-3 flex-grow-1 input-group">
                    <Form.Control
                        type="number"
                        name="Salary"
                        id="inputSalary"
                        placeholder="Salary"
                        min={0}
                        step={100}
                        onChange={formik.handleChange}
                        value={formik.values.Salary}
                        isValid={formik.touched.Salary && !formik.errors.Salary}
                        isInvalid={formik.touched.Salary && !!formik.errors.Salary}
                    />
                    <InputGroup.Text className="rounded-end">PLN</InputGroup.Text>
                    <label htmlFor="inputSalary" className="z-index-3">Salary</label>
                    <Form.Control.Feedback type="invalid">{formik.errors.Salary}</Form.Control.Feedback>
                </Form.Floating>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPriority">Gender</Form.Label>
                    <ButtonGroup className="mb-3 d-flex" id="inputPriority">
                        <Button
                            name="Gender"
                            variant="outline-primary"
                            active={formik.values.Gender === 'F'}
                            value={'F'}
                            onClick={formik.handleChange}>
                            Female
                        </Button>
                        <Button
                            name="Gender"
                            variant="outline-primary"
                            active={formik.values.Gender === 'M'}
                            value={'M'}
                            onClick={formik.handleChange}>
                            Male
                        </Button>
                    </ButtonGroup>
                </Form.Group>
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
                <FloatingLabel controlId="inputDateOfEmployment" label="Date of employment" className="mb-3">
                    <Form.Control
                        type="date"
                        name="DateOfEmployment"
                        onChange={formik.handleChange}
                        value={moment(formik.values.DateOfEmployment).format("YYYY-MM-DD")}
                        isValid={formik.touched.DateOfEmployment && !formik.errors.DateOfEmployment}
                        isInvalid={formik.touched.DateOfEmployment && !!formik.errors.DateOfEmployment}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.DateOfEmployment}</Form.Control.Feedback>
                </FloatingLabel>
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