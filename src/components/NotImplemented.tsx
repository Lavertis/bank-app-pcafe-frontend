import React, {FC} from 'react';
import {Alert, Col} from "react-bootstrap";


interface NotImplementedProps {
}

const NotImplemented: FC<NotImplementedProps> = () => (
    <Col className="mx-auto mt-5">
        <Alert variant="primary" className="text-center">
            This feature is not yet implemented
        </Alert>
    </Col>
);

export default NotImplemented;