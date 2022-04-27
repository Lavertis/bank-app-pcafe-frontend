import React, {FC, useContext} from 'react';
import {TokenContext} from "../App";
import {getRoleFromToken} from "../helpers/token-helper";
import {Alert, Col} from "react-bootstrap";


interface HomeProps {
}

const Home: FC<HomeProps> = () => {
    const {token} = useContext(TokenContext);

    const getWelcomeMessage = () => {
        const role = getRoleFromToken(token);
        switch (role) {
            case 'Admin':
                return 'Welcome Admin';
            case 'Employee':
                return 'Welcome Employee';
            case 'Customer':
                return 'Welcome Customer';
        }
    }


    return (
        <Col className="mx-auto mt-5">
            <Alert variant="primary" className="text-center">
                {getWelcomeMessage()}
            </Alert>
        </Col>
    );
}

export default Home;
