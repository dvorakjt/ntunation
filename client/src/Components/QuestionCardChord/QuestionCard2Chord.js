import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
// import './style.css';

//import the chordcard
import ChordCard from '../ChordCard/ChordCard';

//import correct and wrong cards
import CorrectCard from '../CorrectCard/CorrectCard';
import WrongCard from '../WrongCard/WrongCard';

//import API Util
import API from '../../Utils/API';

//import global user store
import { useUserStoreContext } from '../../Utils/UserStore';

//use the global answer state
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

function QuestionCard2Notes({ instructions, nextExerciseFunction, headerText, clef, keySig, notes, chordNotation, nextExercise, currentExercise, sliderStep, sliderMin, sliderMax, category, practice }) {
    let user = JSON.parse(localStorage.getItem('lsUser'));

    let [state, dispatch] = useUserStoreContext();
    const userState = state;
    const userDispatch = dispatch;
    [state, dispatch] = useAnswerStoreContext();

    const [answered, setAnswered] = useState(0);

    const onSubmitBtnClick = (event) => {
        event.preventDefault();
        if (state.userAnswer === state.correctAnswer) {
            setAnswered(1);
            //if logged in...
            if (user) {
                //and if not in practice mode
                if (!practice) {
                    API.updateUser({
                        email: user.email,
                        category: category,
                        attempts: Number(userState.user[category].attempts) + 1,
                        correct: Number(userState.user[category].correct) + 1,
                        wrong: userState.user[category].wrong,
                        introDone: false,
                        practiceDone: false,
                        quizDone: false
                    })
                    userDispatch({
                        type: "UPDATE",
                        category: category,
                        updatedData: {
                            attempts: Number(userState.user[category]).attempts + 1,
                            correct: Number(userState.user[category].correct) + 1,
                            wrong: userState.user[category].wrong,
                            introDone: false,
                            practiceDone: false,
                            quizDone: false
                        }
                    });
                    localStorage.setItem("lsUser", JSON.stringify(userState.user));
                }
            }
        } else {
            setAnswered(2);
            //if logged in...
            if (user) {
                if (!practice) {
                    API.updateUser({
                        email: user.email,
                        category: category,
                        attempts: Number(userState.user[category].attempts) + 1,
                        correct: Number(userState.user[category].correct),
                        wrong: Number(userState.user[category].wrong) + 1,
                        introDone: false,
                        practiceDone: false,
                        quizDone: false
                    })
                    userDispatch({
                        type: "UPDATE",
                        category: category,
                        updatedData: {
                            attempts: Number(userState.user[category].attempts) + 1,
                            correct: Number(userState.user[category].correct),
                            wrong: Number(userState.user[category].wrong) + 1,
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
                        <ChordCard sliderStep={sliderStep} sliderMin={sliderMin} sliderMax={sliderMax} chordNotation={chordNotation} noteCardKey="1" notes={notes} headerText={headerText} clef={clef} keySig={keySig} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={onSubmitBtnClick}>Submit!</button>
                    </Modal.Footer>

                </>
            )
        case 1:
            return <CorrectCard nextExercise={nextExercise} nextExerciseFunction={nextExerciseFunction} setState={setAnswered} />
        case 2:
            return <WrongCard currentExercise={currentExercise} nextExerciseFunction={nextExerciseFunction} nextExercise={nextExercise} setState={setAnswered} />
        default:
            return (<> </>)
    }
}
export default QuestionCard2Notes;