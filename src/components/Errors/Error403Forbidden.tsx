import React, {FC} from 'react';
import {Alert, Col} from "react-bootstrap";


interface Error403ForbiddenProps {
}

const Error403Forbidden: FC<Error403ForbiddenProps> = () => (
    <Col xs={11} sm={10} md={8} lg={7} xl={6} className="text-center mt-5 mx-auto mb-auto">
        <Alert variant="danger">
            <p className="h4 mt-2 mb-4">Error 403</p>
            <p className="fs-5">You are not allowed to access this page</p>
        </Alert>
    </Col>
);

export default Error403Forbidden;
