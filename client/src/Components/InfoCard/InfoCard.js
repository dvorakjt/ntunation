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
                {(() => {
                    if (props.nextExercise.length > 0) {
                        return (
                            <Link to={`/sampleexercises/${props.nextExercise}`}><button className="btn btn-success">Start Demo!</button></Link>
                        )
                    } else {
                        return (
                            <button className="btn btn-success" onClick={() => {
                                props.nextExerciseFunction()
                            }}>
                                Next</button>
                        )
                    }
                })()}
            </Modal.Footer>
        </>
    )
}

export default infoCard;