import React, {FC, useContext, useState} from 'react';
import {Alert, Button, Col, FloatingLabel, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {AxiosError, AxiosResponse} from "axios";
import {TokenContext} from "../../App";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
    userName: yup.string().required().label('Username'),
    password: yup.string().required().label('Password')
});

interface LoginProps {
    redirectTo: string;
}

const Login: FC<LoginProps> = ({redirectTo}) => {
    const [error, setError] = useState("")
    const {setToken} = useContext(TokenContext)
    const navigate = useNavigate()
    const axios = useAxios()

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: values => {
            axios.post("auth/authenticate", values)
                .then((response: AxiosResponse) => {
                    setToken(response.data.jwtToken)
                    localStorage.setItem("jwtToken", response.data.jwtToken)
                    localStorage.setItem("refreshToken", response.data.refreshToken)
                    navigate(redirectTo, {replace: true})
                })
                .catch((err: AxiosError) => {
                    if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                        const error = err.response.data.error
                        setError(error['name'] + ": " + error['description'])
                    }
                })
        },
    });

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} xxl={3} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Form onSubmit={formik.handleSubmit}>
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
                        isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
                <Form.Group className="d-grid">
                    <Button type="submit" variant="primary">Login</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default Login;