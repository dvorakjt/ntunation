import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './style.css';

//import the notecard
import Notecard from '../Notecard/Notecard';

//import correct and wrong cards
import CorrectCard from '../CorrectCard/CorrectCard';
import WrongCard from '../WrongCard/WrongCard';

//use the global answer state
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

function QuestionCard2Notes(props) {
    const [state, dispatch] = useAnswerStoreContext();
    const [answered, setAnswered] = useState(0);

    const onSubmitBtnClick = (event) => {
        event.preventDefault();
        if (state.userAnswer === state.correctAnswer) {
            setAnswered(1);
        } else {
            setAnswered(2);
        }
    }

    const onSharpOrFlatClick = (event) => {
        const sharpOrFlat = event.target.value;
        if (state.correctAnswer === sharpOrFlat) {
            setAnswered(1);
        } else {
            setAnswered(2);
        }
    }

    switch (answered) {
        case 0:
            return (
                <>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-12">
                                <h4>{props.instructions}</h4>
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
                        {(() => {
                            if (props.btn === "submit") return (<button className="btn btn-primary" onClick={onSubmitBtnClick}>Submit!</button>)
                            else {
                                return (
                                    <>
                                        <p>The second note is: </p>
                                        <button className="btn btn-danger" value="Flat" onClick={onSharpOrFlatClick}>Flat</button>
                                        <button className="btn btn-success" value="Sharp" onClick={onSharpOrFlatClick}>Sharp</button>
                                    </>
                                )
                            }
                        })()}
                    </Modal.Footer>
                </>
            )
        case 1:
            return <CorrectCard nextExercise={props.nextExercise} setState={setAnswered} />
        case 2:
            return <WrongCard currentExercise={props.currentExercise} nextExercise={props.nextExercise} setState={setAnswered} />
        default:
            return (<> </>)
    }
}
export default QuestionCard2Notes;