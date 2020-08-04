import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function CorrectCard(props) {
    return (
        <>
            <Modal.Body>
                <h4>Correct!</h4>
                <p>Congratulations, you are correct!</p>
            </Modal.Body>
            <Modal.Footer>
                {(() => {
                    if (props.nextExercise.length > 0) {
                        return (
                            <Link to={`/sampleexercises/${props.nextExercise}`}><button className="btn btn-success" onClick={() => props.setState(0)}>Next Exercise!</button></Link>
                        )
                    } else {
                        return (
                            <button className="btn btn-success" onClick={() => {
                                props.nextExerciseFunction()
                                props.setState(0)
                            }}>
                                Next Exercise!</button>
                        )
                    }
                })()}
            </Modal.Footer>
        </>
    )
}

export default CorrectCard;