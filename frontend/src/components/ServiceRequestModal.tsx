import { Modal } from 'react-bootstrap';
import styles from '../styles/ServiceRequestModal.module.css';
import NewServiceRequestForm from './NewServiceRequestForm';

interface ServiceRequestModalProps {
    show: boolean;
    onHide: () => void;
}

export default function ServiceRequestModal({ show, onHide }: ServiceRequestModalProps) {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="service-request-modal"
            centered
            className={styles.modal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="service-request-modal">
                   We'll get back to you as soon as possible
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NewServiceRequestForm />
            </Modal.Body>
        </Modal>
    );
} 