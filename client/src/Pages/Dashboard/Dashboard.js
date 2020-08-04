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
const genRandomQuestions = require('../../Utils/ExerciseRandomizer');

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

    //set question state
    const [currentQuestions, setCurrentQuestions] = useState({
        categoryTitle: "",
        cardType: "",
        questions: [],
        currentIndex: 0
    })

    //handle next question
    function nextQuestion() {
        let index = currentQuestions.currentIndex + 1
        console.log(index);
        if (index > 9) {
            //all questions have been answered, reset the state:
            setModalDisplay(false);
            setCurrentQuestions({
                categoryTitle: "",
                cardType: "",
                questions: [],
                currentIndex: 0
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
    function setCategory(category, ctype) {
        const questions = genRandomQuestions(category, difficulty, pitch);
        console.log(questions);
        setCurrentQuestions({
            categoryTitle: category,
            cardType: ctype,
            questions: questions,
            currentIndex: 0
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
                        <ModalPrefab title={`${currentQuestions.categoryTitle} (Question ${currentQuestions.currentIndex + 1} / ${currentQuestions.questions.length})`} >
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
                                                nextExercise={""} currentExercise={""} nextExerciseFunction={nextQuestion}
                                            />)
                                    case "melody":
                                        return (
                                            <QuestionCardMelody instructions={thisExercise.instructions} notes={thisExercise.notes} clef={thisExercise.clef} keySig={thisExercise.keySig}
                                                tempo={thisExercise.tempo} baseValue={thisExercise.baseValue} transposition={thisExercise.transposition} headerText={thisExercise.headerText}
                                                meter={thisExercise.meter} nextExercise={""} currentExercise={""} nextExerciseFunction={nextQuestion}
                                            />
                                        )
                                    case "chord":
                                        return <QuestionCardChord instructions={thisExercise.instructions} headerText={thisExercise.headerText} clef={thisExercise.clef}
                                            keySig={thisExercise.keySig} notes={thisExercise.notes} chordNotation={thisExercise.chordNotation}
                                            nextExercise={''} currentExercise={""} sliderStep={thisExercise.sliderStep} sliderMin={thisExercise.sliderMin}
                                            sliderMax={thisExercise.sliderMax}
                                            nextExerciseFunction={nextQuestion}
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
                <tbody>
                    <NonChartTr category="Introduction" link="Start the Intro" complete={introComplete} />
                    <ProgressChart category="Unisons" introComplete={unisons.introDone} practiceComplete={unisons.practiceDone} quizComplete={unisons.quizDone} totalCorrect={unisons.correct} totalWrong={unisons.wrong} totalAttempts={unisons.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setCategory("Unisons", "2Notes")
                            }} />
                    <ProgressChart category="Octaves" introComplete={octaves.introDone} practiceComplete={octaves.practiceDone} quizComplete={octaves.quizDone} totalCorrect={octaves.correct} totalWrong={octaves.wrong} totalAttempts={octaves.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setCategory("Octaves", "2Notes")
                            }} />
                    <ProgressChart category="Intervals (Melodic, Equal Temperament)" introComplete={intervalsMelEq.introDone} practiceComplete={intervalsMelEq.practiceDone} quizComplete={intervalsMelEq.quizDone} totalCorrect={intervalsMelEq.correct} totalWrong={intervalsMelEq.wrong} totalAttempts={intervalsMelEq.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setCategory("Intervals - Melodic, Equal Temperament", "2Notes")
                            }} />
                    <ProgressChart category="Intervals (Harmonic, Equal Temperament)" introComplete={intervalsHrmEq.introDone} practiceComplete={intervalsHrmEq.practiceDone} quizComplete={intervalsHrmEq.quizDone} totalCorrect={intervalsHrmEq.correct} totalWrong={intervalsHrmEq.wrong} totalAttempts={intervalsHrmEq.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setCategory("Intervals - Harmonic, Equal Temperament", "chord")
                            }} />
                    <ProgressChart category="Intervals (Harmonic, Just Temperament)" introComplete={intervalsHrmJst.practiceDone} quizComplete={intervalsHrmJst.quizDone} totalCorrect={intervalsHrmJst.correct} totalWrong={intervalsHrmJst.wrong} totalAttempts={intervalsHrmJst.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setCategory("Intervals - Harmonic, Just Temperament", "chord")
                            }} />
                    <ProgressChart category="Scales" introComplete={unisons.introDone} practiceComplete={scales.practiceDone} quizComplete={scales.quizDone} totalCorrect={scales.correct} totalWrong={scales.wrong} totalAttempts={scales.attempts} startFunction={
                        (e) => {
                            e.preventDefault();
                            setCategory("Scales", "melody")
                        }} />
                    <ProgressChart category="Chords (Just Temperament)" introComplete={chords.introDone} practiceComplete={chords.practiceDone} quizComplete={unisons.quizDone} totalCorrect={chords.correct} totalWrong={chords.wrong} totalAttempts={chords.attempts}
                        startFunction={
                            (e) => {
                                e.preventDefault();
                                setCategory("Chords", "chord")
                            }} />

                </tbody>
            </table>
        </>
    )
}

export default Dashboard;