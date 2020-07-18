import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

function infoCard(props) {
    return (
        <>
            <Modal.Body>
                <h4>{props.bodyHeader}</h4>
                <p>{props.body}</p>
            </Modal.Body>
            <Modal.Footer>
                <Link to={`/sampleexercises/${props.nextExercise}`}><button className="btn btn-success">Start Demo!</button></Link>
            </Modal.Footer>
        </>
    )
}

export default infoCard;