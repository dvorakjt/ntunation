import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
// import './style.css';

//import correct and wrong cards
import CorrectCard from '../CorrectCard/CorrectCard';
import WrongCard from '../WrongCard/WrongCard';

//import melody card!
import MelodyCard from '../MelodyCard/MelodyCard';

//use the global answer state
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

//import API Util
import API from '../../Utils/API';

//import global user store
import { useUserStoreContext } from '../../Utils/UserStore';

function QuestionCardMelody(props) {
    const user = JSON.parse(localStorage.getItem('lsUser'));

    let [state, dispatch] = useUserStoreContext();
    const userState = state;
    const userDispatch = dispatch;
    [state, dispatch] = useAnswerStoreContext();

    const [answered, setAnswered] = useState(0);

    const submitAnswer = (event) => {
        event.preventDefault();
        const sharpOrFlat = event.target.value;
        const answer = [state.userAnswer, sharpOrFlat]
        if (answer.join("") === state.correctAnswer.join("")) {
            setAnswered(1);
            //if logged in...
            if (user) {
                API.updateUser({
                    email: userState.user.email,
                    category: props.category,
                    attempts: Number(user[props.category].attempts) + 1,
                    correct: Number(user[props.category].correct) + 1,
                    wrong: user[props.category].wrong,
                    introDone: false,
                    practiceDone: false,
                    quizDone: false
                })
                userDispatch({
                    type: "UPDATE",
                    category: props.category,
                    updatedData: {
                        attempts: Number(user[props.category]).attempts + 1,
                        correct: Number(user[props.category].correct) + 1,
                        wrong: user[props.category].wrong,
                        introDone: false,
                        practiceDone: false,
                        quizDone: false
                    }
                });
                localStorage.setItem("lsUser", JSON.stringify(userState.user));
            }
        } else {
            setAnswered(2);
            if (user) {
                API.updateUser({
                    email: user.email,
                    category: props.category,
                    attempts: Number(user[props.category].attempts) + 1,
                    correct: Number(user[props.category].correct),
                    wrong: Number(user[props.category].wrong) + 1,
                    introDone: false,
                    practiceDone: false,
                    quizDone: false
                })
                userDispatch({
                    type: "UPDATE",
                    category: props.category,
                    updatedData: {
                        attempts: Number(user[props.category].attempts) + 1,
                        correct: Number(user[props.category].correct),
                        wrong: Number(user[props.category].wrong) + 1,
                        introDone: false,
                        practiceDone: false,
                        quizDone: false
                    }
                });
                localStorage.setItem("lsUser", JSON.stringify(userState.user));
            }
        }
        //reset the global userAnswer state
        dispatch({
            type: "UPDATE_USER_ANSWER",
            userAnswer: ""
        });
    }

    switch (answered) {
        case 0:
            console.log(props.meter);
            return (
                <>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-12">
                                <h4>{props.instructions}</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <MelodyCard headerText={props.headerText} notes={props.notes} clef={props.clef} keySig={props.keySig} tempo={props.tempo} baseValue={props.baseValue} transposition={props.transposition} meter={props.meter} />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <h5>{state.userAnswer ? "Your answer: " + props.notes[state.userAnswer].dispName : "Select a note."}</h5>
                        <button className="btn btn-danger" value="Flat" onClick={submitAnswer}>Flat</button>
                        <button className="btn btn-success" value="Sharp" onClick={submitAnswer}>Sharp</button>
                    </Modal.Footer>
                </>
            )
        case 1:
            return <CorrectCard nextExercise={props.nextExercise} nextExerciseFunction={props.nextExerciseFunction} setState={setAnswered} />
        case 2:
            return <WrongCard currentExercise={props.currentExercise} nextExerciseFunction={props.nextExerciseFunction} nextExercise={props.nextExercise} setState={setAnswered} />
        default:
            return (<> </>)
    }
}
export default QuestionCardMelody;