import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function WrongCard(props) {
    return (
        <>
            <Modal.Body>
                <h4>Sorry, that is incorrect.</h4>
                <p>Please try again!</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => props.setState(0)}>Try again</button>
                <Link to={`/sampleexercises/${props.nextExercise}`}><button className="btn btn-secondary" onClick={() => props.setState(0)}>Skip this question</button></Link>
            </Modal.Footer>
        </>
    )
}

export default WrongCard;