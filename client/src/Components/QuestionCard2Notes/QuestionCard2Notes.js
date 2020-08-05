import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './style.css';

//import the notecard
import Notecard from '../Notecard/Notecard';

//import correct and wrong cards
import CorrectCard from '../CorrectCard/CorrectCard';
import WrongCard from '../WrongCard/WrongCard';

//import API Util
import API from '../../Utils/API';

//import global user store
import { useUserStoreContext } from '../../Utils/UserStore';

//use the global answer state
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

function QuestionCard2Notes(props) {
    let user = JSON.parse(localStorage.getItem('lsUser'));

    let [state, dispatch] = useUserStoreContext();
    const userState = state;
    const userDispatch = dispatch;
    [state, dispatch] = useAnswerStoreContext();

    const [answered, setAnswered] = useState(0);

    const onSubmitBtnClick = async (event) => {
        event.preventDefault();
        if (state.userAnswer === state.correctAnswer) {
            setAnswered(1);
            //if logged in...
            if (user) {
                API.updateUser({
                    email: userState.user.email,
                    category: props.category,
                    attempts: Number(userState.user[props.category].attempts) + 1,
                    correct: Number(userState.user[props.category].correct) + 1,
                    wrong: userState.user[props.category].wrong,
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
                        wrong: userState.user[props.category].wrong,
                        introDone: false,
                        practiceDone: false,
                        quizDone: false
                    }
                });
                localStorage.setItem("lsUser", JSON.stringify(userState.user));
            }
        } else {
            setAnswered(2);
            //if logged in...
            if (user) {
                API.updateUser({
                    email: user.email,
                    category: props.category,
                    attempts: Number(userState.user[props.category].attempts) + 1,
                    correct: Number(userState.user[props.category].correct),
                    wrong: Number(userState.user[props.category].wrong) + 1,
                    introDone: false,
                    practiceDone: false,
                    quizDone: false
                })
                userDispatch({
                    type: "UPDATE",
                    category: props.category,
                    updatedData: {
                        attempts: Number(userState.user[props.category].attempts) + 1,
                        correct: Number(userState.user[props.category].correct),
                        wrong: Number(userState.user[props.category].wrong) + 1,
                        introDone: false,
                        practiceDone: false,
                        quizDone: false
                    }
                });
                localStorage.setItem("lsUser", JSON.stringify(userState.user));
            }
        }
        //reset the global user answer state
        dispatch({
            type: "UPDATE_USER_ANSWER",
            userAnswer: ""
        });
    }

    const onSharpOrFlatClick = (event) => {
        const sharpOrFlat = event.target.value;
        if (state.correctAnswer === sharpOrFlat) {
            setAnswered(1);
            if (user) {
                API.updateUser({
                    email: user.email,
                    category: props.category,
                    attempts: Number(userState.user[props.category].attempts) + 1,
                    correct: Number(userState.user[props.category].correct) + 1,
                    wrong: Number(userState.user[props.category].wrong),
                    introDone: false,
                    practiceDone: false,
                    quizDone: false
                })
                userDispatch({
                    type: "UPDATE",
                    category: props.category,
                    updatedData: {
                        attempts: Number(userState.user[props.category].attempts) + 1,
                        correct: Number(userState.user[props.category].correct) + 1,
                        wrong: Number(userState.user[props.category].wrong),
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
                    attempts: Number(userState.user[props.category].attempts) + 1,
                    correct: Number(userState.user[props.category].correct),
                    wrong: Number(userState.user[props.category].wrong) + 1,
                    introDone: false,
                    practiceDone: false,
                    quizDone: false
                })
                userDispatch({
                    type: "UPDATE",
                    category: props.category,
                    updatedData: {
                        attempts: Number(userState.user[props.category].attempts) + 1,
                        correct: Number(userState.user[props.category].correct),
                        wrong: Number(userState.user[props.category].wrong) + 1,
                        introDone: false,
                        practiceDone: false,
                        quizDone: false
                    }
                });
                localStorage.setItem("lsUser", JSON.stringify(userState.user));
            }
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
            return <CorrectCard nextExercise={props.nextExercise} nextExerciseFunction={props.nextExerciseFunction} setState={setAnswered} />
        case 2:
            return <WrongCard currentExercise={props.currentExercise} nextExercise={props.nextExercise} nextExerciseFunction={props.nextExerciseFunction} setState={setAnswered} />
        default:
            return (<> </>)
    }
}
export default QuestionCard2Notes;