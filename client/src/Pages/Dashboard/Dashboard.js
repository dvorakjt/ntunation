import React, { useState } from 'react';
import TopNav from '../../Components/TopNav/TopNav';
import ProgressChart from '../../Components/ProgressChart/ProgressChart';
import NonChartTr from '../../Components/NonChartTr/NonChartTr';
import ModalPrefab from '../../Components/Modal/Modal';
import QuestionCardMelody from '../../Components/QuestionCardMelody/QuestionCardMelody';
import QuestionCard2Notes from '../../Components/QuestionCard2Notes/QuestionCard2Notes';
import QuestionCardChord from '../../Components/QuestionCardChord/QuestionCard2Chord';
import InfoCard from '../../Components/InfoCard/InfoCard';

//import global user store
import { useUserStoreContext } from '../../Utils/UserStore';
//import answerstore 
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

import './style.css';

//require in the exercise randomizer
import genRandomQuestions from '../../Utils/ExerciseRandomizer';

//import unison intro data
import * as dataUnisonIntro from '../../Data/unisonIntro.json';
const unisonIntro = dataUnisonIntro.default.unisonIntro;

//Dashboard will use the global user state to determine the information it needs
function Dashboard() {
    //Grab the state const and the dispatch methods from the answer store
    let [state, dispatch] = useAnswerStoreContext();
    const answerState = state;
    const answerDispatch = dispatch;

    //hook into global user store
    [state, dispatch] = useUserStoreContext();

    const { user } = state;
    const { nickname, difficulty, pitch, introComplete, unisons, octaves, intervalsMelEq, intervalsHrmEq, intervalsHrmJst, scales, chords, melody } = user;

    //modal display state
    const [modalDisplay, setModalDisplay] = useState(false);
    const [practiceState, setPracticeState] = useState(false);

    //set question state
    const [currentQuestions, setCurrentQuestions] = useState({
        categoryTitle: "",
        cardType: "",
        questions: [],
        currentIndex: 0,
        userDataCategory: ""
    })

    //handle next question
    function nextQuestion() {
        let index = currentQuestions.currentIndex + 1
        if (index > 9) {
            //all questions have been answered, reset the state:
            setModalDisplay(false);
            setCurrentQuestions({
                categoryTitle: "",
                cardType: "",
                questions: [],
                currentIndex: 0,
                userDataCategory: ""
            })
            answerDispatch({
                type: "UPDATE_CORRECT_ANSWER",
                correctAnswer: ""
            })
        } else {
            setCurrentQuestions({
                ...currentQuestions,
                currentIndex: index
            })
            answerDispatch({
                type: "UPDATE_CORRECT_ANSWER",
                correctAnswer: currentQuestions.questions[index].answer
            })
        }
    }

    //category setting function
    function setCategory(category, ctype, userDataCategory) {
        const questions = genRandomQuestions(category, difficulty, pitch);
        setCurrentQuestions({
            categoryTitle: category,
            cardType: ctype,
            questions: questions,
            currentIndex: 0,
            userDataCategory: userDataCategory
        })
        answerDispatch({
            type: "UPDATE_CORRECT_ANSWER",
            correctAnswer: questions[0].answer
        })
        setModalDisplay(true);
    }

    return (
        <>
            <TopNav />
            {(() => {
                //if the modal should display, display the modal
                if (modalDisplay) {
                    return (
                        <ModalPrefab setDisplay={setModalDisplay} title={`${currentQuestions.categoryTitle} (${currentQuestions.currentIndex + 1} / ${currentQuestions.questions.length})`} >
                            {(() => {

                                //set this question and next question
                                const thisExercise = currentQuestions.questions[currentQuestions.currentIndex]
                                const nextExercise = currentQuestions.questions[currentQuestions.currentIndex + 1]

                                switch (currentQuestions.cardType) {
                                    case "info":
                                        return (<InfoCard bodyHeader={thisExercise.bodyHeader} body={thisExercise.body} nextExercise={nextExercise} />)
                                    case "2Notes":
                                        return (
                                            <QuestionCard2Notes instructions={thisExercise.instructions} noteName1={thisExercise.noteName1} noteName2={thisExercise.noteName2}
                                                pitch1={thisExercise.pitch1} pitch2={thisExercise.pitch2} header1={thisExercise.header1}
                                                header2={thisExercise.header2} clef1={thisExercise.clef1} clef2={thisExercise.clef2}
                                                keySig={thisExercise.keySig} slider={thisExercise.slider} sliderMin={thisExercise.sliderMin}
                                                sliderMax={thisExercise.sliderMax} sliderStep={thisExercise.sliderStep} btn={thisExercise.btn}
                                                nextExercise={""} currentExercise={""} nextExerciseFunction={nextQuestion} category={currentQuestions.userDataCategory}
                                                practice={practiceState}
                                            />)
                                    case "melody":
                                        return (
                                            <QuestionCardMelody instructions={thisExercise.instructions} notes={thisExercise.notes} clef={thisExercise.clef} keySig={thisExercise.keySig}
                                                tempo={thisExercise.tempo} baseValue={thisExercise.baseValue} transposition={thisExercise.transposition} headerText={thisExercise.headerText}
                                                meter={thisExercise.meter} nextExercise={""} currentExercise={""} nextExerciseFunction={nextQuestion}
                                                category={currentQuestions.userDataCategory} practice={practiceState}
                                            />
                                        )
                                    case "chord":
                                        return <QuestionCardChord instructions={thisExercise.instructions} headerText={thisExercise.headerText} clef={thisExercise.clef}
                                            keySig={thisExercise.keySig} notes={thisExercise.notes} chordNotation={thisExercise.chordNotation}
                                            nextExercise={''} currentExercise={""} sliderStep={thisExercise.sliderStep} sliderMin={thisExercise.sliderMin}
                                            sliderMax={thisExercise.sliderMax}
                                            nextExerciseFunction={nextQuestion}
                                            category={currentQuestions.userDataCategory}
                                            practice={practiceState}
                                        />
                                    default:
                                        return (
                                            <>
                                                <p>Nothing to display yet.</p>
                                            </>
                                        )
                                }
                            })()}
                        </ModalPrefab>
                    )
                }
            })()}
            <h1>{`Welcome, ${nickname}!`}</h1>
            <h1 id="exercisesH1">Exercises</h1>
            <table>
                <thead>
                    <th>Category</th>
                    <th>Introduction</th>
                    <th>Practice</th>
                    <th>Quiz</th>
                    <th id="recordTh">Record</th>
                </thead>
                <tbody>
                    <ProgressChart category="Unisons" introComplete={unisons.introDone} practiceComplete={unisons.practiceDone} quizComplete={unisons.quizDone} totalCorrect={user.unisons.correct} totalWrong={user.unisons.wrong} totalAttempts={user.unisons.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(false);
                                setCategory("Unisons", "2Notes", "unisons");
                            }}
                        practiceFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(true);
                                setCategory("Unisons", "2Notes", "unisons");
                            }
                        }
                        introFunction={
                            (e) => {
                                e.preventDefault();
                                setCurrentQuestions({
                                    categoryTitle: "Unisons",
                                    cardType: "info",
                                    questions: unisonIntro,
                                    currentIndex: 0,
                                    userDataCategory: ""
                                })
                                setModalDisplay(true);
                            }
                        }
                    />
                    <ProgressChart category="Octaves" introComplete={octaves.introDone} practiceComplete={octaves.practiceDone} quizComplete={octaves.quizDone} totalCorrect={user.octaves.correct} totalWrong={user.octaves.wrong} totalAttempts={user.octaves.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(false);
                                setCategory("Octaves", "2Notes", "octaves")
                            }}
                        practiceFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(true);
                                setCategory("Octaves", "2Notes", "octaves")
                            }
                        } />
                    <ProgressChart category="Intervals (Melodic, Equal Temperament)" introComplete={intervalsMelEq.introDone} practiceComplete={intervalsMelEq.practiceDone} quizComplete={intervalsMelEq.quizDone} totalCorrect={user.intervalsMelEq.correct} totalWrong={user.intervalsMelEq.wrong} totalAttempts={user.intervalsMelEq.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(false);
                                setCategory("Intervals - Melodic, Equal Temperament", "2Notes", "intervalsMelEq")
                            }}
                        practiceFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(true);
                                setCategory("Intervals - Melodic, Equal Temperament", "2Notes", "intervalsMelEq")
                            }
                        }
                    />
                    <ProgressChart category="Intervals (Harmonic, Equal Temperament)" introComplete={intervalsHrmEq.introDone} practiceComplete={intervalsHrmEq.practiceDone} quizComplete={intervalsHrmEq.quizDone} totalCorrect={user.intervalsHrmEq.correct} totalWrong={user.intervalsHrmEq.wrong} totalAttempts={user.intervalsHrmEq.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(false);
                                setCategory("Intervals - Harmonic, Equal Temperament", "chord", "intervalsHrmEq")
                            }}
                        practiceFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(true);
                                setCategory("Intervals - Harmonic, Equal Temperament", "chord", "intervalsHrmEq")
                            }
                        }
                    />
                    <ProgressChart category="Intervals (Harmonic, Just Temperament)" introComplete={intervalsHrmJst.practiceDone} quizComplete={intervalsHrmJst.quizDone} totalCorrect={user.intervalsHrmJst.correct} totalWrong={user.intervalsHrmJst.wrong} totalAttempts={user.intervalsHrmJst.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(false);
                                setCategory("Intervals - Harmonic, Just Temperament", "chord", "intervalsHrmJst");
                            }}
                        practiceFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(true);
                                setCategory("Intervals - Harmonic, Just Temperament", "chord", "intervalsHrmJst");
                            }
                        }
                    />
                    <ProgressChart category="Scales" introComplete={unisons.introDone} practiceComplete={scales.practiceDone} quizComplete={scales.quizDone} totalCorrect={user.scales.correct} totalWrong={user.scales.wrong} totalAttempts={user.scales.attempts} startFunction={
                        (e) => {
                            e.preventDefault();
                            setPracticeState(false);
                            setCategory("Scales", "melody", "scales");
                        }}
                        practiceFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(true);
                                setCategory("Scales", "melody", "scales");
                            }
                        }
                    />

                    <ProgressChart category="Chords (Just Temperament)" introComplete={chords.introDone} practiceComplete={chords.practiceDone} quizComplete={unisons.quizDone} totalCorrect={user.chords.correct} totalWrong={user.chords.wrong} totalAttempts={user.chords.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(false);
                                setCategory("Chords", "chord", "chords");
                            }}
                        practiceFunction={
                            (e) => {
                                e.preventDefault();
                                setPracticeState(true);
                                setCategory("Chords", "chord", "chords");
                            }
                        }
                    />

                </tbody>
            </table>
        </>
    )
}

export default Dashboard;