import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Notecard from '../Notecard/Notecard';

function DemoCard(props) {
    return (
        <>
            <Modal.Body>
                <div className="row">
                    <div className="col-12">
                        <p>{props.instructions}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 d-flex justify-content-center">
                        <Notecard noteCardKey="1" noteName={props.noteName1} pitch={props.pitch1} headerText={props.header1} clef={props.clef1} keySig={props.keySig} />
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                        <Notecard noteCardKey="2" noteName={props.noteName2} pitch={props.pitch2} headerText={props.header2} clef={props.clef2} keySig={props.keySig} slider={props.slider} sliderMin={props.sliderMin} sliderMax={props.sliderMax} sliderStep={props.sliderStep} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-success" onClick={() => { props.nextExerciseFunction() }}>Got it!</button>
            </Modal.Footer>

        </>
    )
}

export default DemoCard;