import React, {FC} from 'react';
import {Button, Modal} from "react-bootstrap";


interface ConfirmationModalProps {
    variant: 'danger' | 'primary'
    title: string;
    message: string;
    isShown: boolean;
    confirm: () => void;
    hide: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({variant, title, message, isShown, confirm, hide}) => (
    <Modal show={isShown} onHide={hide}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>{message}</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant={variant} onClick={confirm}>{variant === 'primary' ? 'Confirm' : 'Delete'}</Button>
            <Button variant="secondary" onClick={hide}>Cancel</Button>
        </Modal.Footer>
    </Modal>
);

export default ConfirmationModal;