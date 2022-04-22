import React, {FC, useContext, useState} from 'react';
import {Alert, Button, Col, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {AxiosError, AxiosResponse} from "axios";
import {TokenContext} from "../../App";
import useAxios from "../../hooks/useAxios";


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
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputUsername">Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="userName"
                        id="inputUsername"
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        id="inputPassword"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                    />
                </Form.Group>
                <Form.Group className="d-grid">
                    <Button type="submit" variant="primary">Login</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default Login;