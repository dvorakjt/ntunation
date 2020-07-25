import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
// import './style.css';

//import the chordcard
import ChordCard from '../ChordCard/ChordCard';

//import correct and wrong cards
import CorrectCard from '../CorrectCard/CorrectCard';
import WrongCard from '../WrongCard/WrongCard';

//use the global answer state
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

function QuestionCard2Notes({ instructions, headerText, clef, keySig, notes, chordNotation, nextExercise, currentExercise }) {
    const [state, dispatch] = useAnswerStoreContext();
    const [answered, setAnswered] = useState(0);

    const onSubmitBtnClick = (event) => {
        event.preventDefault();
        console.log(state.userAnswer + " | " + state.correctAnswer);
        if (state.userAnswer === state.correctAnswer) {
            setAnswered(1);
        } else {
            setAnswered(2);
        }
        //reset the global user answer state
        dispatch({
            type: "UPDATE_USER_ANSWER",
            userAnswer: ""
        });
    }
    switch (answered) {
        case 0:
            return (
                <>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-12">
                                <h4>{instructions}</h4>
                            </div>
                        </div>
                        <ChordCard chordNotation={chordNotation} noteCardKey="1" notes={notes} headerText={headerText} clef={clef} keySig={keySig} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={onSubmitBtnClick}>Submit!</button>
                    </Modal.Footer>

                </>
            )
        case 1:
            return <CorrectCard nextExercise={nextExercise} setState={setAnswered} />
        case 2:
            return <WrongCard currentExercise={currentExercise} nextExercise={nextExercise} setState={setAnswered} />
        default:
            return (<> </>)
    }
}
export default QuestionCard2Notes;