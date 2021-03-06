import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
// import './style.css';


function ModalPrefab(props) {
    const [state, setState] = useState({
        redirect: null
    });

    const [show, setShow] = useState(true);

    const handleClose = () => {
        if (!props.setDisplay) {
            setShow(false);
            setState({ redirect: "/" });
        } else {
            props.setDisplay();
        }
    }

    if (state.redirect) {
        return <Redirect to={state.redirect} />
    } else {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                {props.children}
            </Modal>
        )
    }
}

export default ModalPrefab;