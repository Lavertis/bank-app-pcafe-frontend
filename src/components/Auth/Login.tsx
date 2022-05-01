import React, {FC, useContext, useState} from 'react';
import {Alert, Button, Col, FloatingLabel, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {TokenContext} from "../../App";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {getErrorsWithFirstMessages} from "../../helpers/fluent-validation";

const loginValidationSchema = yup.object().shape({
    UserName: yup.string().required().label('Username'),
    Password: yup.string().required().label('Password')
});

interface LoginProps {
    redirectTo: string;
}

const Login: FC<LoginProps> = ({redirectTo}) => {
    const {setToken} = useContext(TokenContext)
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState<string>('')

    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: values => {
            axios.post("auth-management/authenticate", values)
                .then(response => {
                    setToken(response.data.jwtToken)
                    localStorage.setItem("jwtToken", response.data.jwtToken)
                    localStorage.setItem("refreshToken", response.data.refreshToken)
                    navigate(redirectTo, {replace: true})
                })
                .catch(error => {
                    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                        const errors = getErrorsWithFirstMessages(error.response.data.errors)
                        formik.setErrors(errors)
                        setServerError(error.response.data.error)
                    }
                })
        },
    });

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} xxl={3} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Sign In</h3>
            {serverError && <Alert variant="danger" className="text-center">{serverError}</Alert>}
            <Form onSubmit={formik.handleSubmit} noValidate>
                <FloatingLabel controlId="inputUserName" label="Username" className="mb-3">
                    <Form.Control
                        type="text"
                        name="UserName"
                        placeholder="Username"
                        onChange={formik.handleChange}
                        value={formik.values.UserName}
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
                        isInvalid={formik.touched.Password && !!formik.errors.Password}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.Password}</Form.Control.Feedback>
                </FloatingLabel>
                <Form.Group className="d-grid mt-4">
                    <Button type="submit" variant="primary">Sign In</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default Login;