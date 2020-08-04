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
    const [modalDisplay, setModalDisplay] = useState(true);

    const questions = genRandomQuestions("Chords", difficulty, pitch)

    //set question state
    const [currentQuestions, setCurrentQuestions] = useState({
        categoryTitle: "Chords",
        cardType: "chord",
        questions: questions,
        currentIndex: 0
    })

    console.log(currentQuestions.questions);

    return (
        <>
            <TopNav />
            {(() => {
                //if the modal should display, display the modal
                if (modalDisplay) {
                    return (
                        <ModalPrefab title={currentQuestions.categoryTitle} >
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
                                                nextExercise={nextExercise} currentExercise={currentQuestions.currentIndex}
                                            />)
                                    case "melody":
                                        return (
                                            <QuestionCardMelody instructions={thisExercise.instructions} notes={thisExercise.notes} clef={thisExercise.clef} keySig={thisExercise.keySig}
                                                tempo={thisExercise.tempo} baseValue={thisExercise.baseValue} transposition={thisExercise.transposition} headerText={thisExercise.headerText}
                                                meter={thisExercise.meter} nextExercise={nextExercise} currentExercise={currentQuestions.currentIndex}
                                            />
                                        )
                                    case "chord":
                                        return <QuestionCardChord instructions={thisExercise.instructions} headerText={thisExercise.headerText} clef={thisExercise.clef}
                                            keySig={thisExercise.keySig} notes={thisExercise.notes} chordNotation={thisExercise.chordNotation}
                                            nextExercise={nextExercise} currentExercise={currentQuestions.currentIndex} sliderStep={thisExercise.sliderStep} sliderMin={thisExercise.sliderMin}
                                            sliderMax={thisExercise.sliderMax}
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
                    <ProgressChart category="Unisons" introComplete={unisons.introDone} practiceComplete={unisons.practiceDone} quizComplete={unisons.quizDone} totalCorrect={unisons.correct} totalWrong={unisons.wrong} totalAttempts={unisons.attempts} />
                    <ProgressChart category="Octaves" introComplete={octaves.introDone} practiceComplete={octaves.practiceDone} quizComplete={octaves.quizDone} totalCorrect={octaves.correct} totalWrong={octaves.wrong} totalAttempts={octaves.attempts} />
                    <ProgressChart category="Intervals (Melodic, Equal Temperament)" introComplete={intervalsMelEq.introDone} practiceComplete={intervalsMelEq.practiceDone} quizComplete={intervalsMelEq.quizDone} totalCorrect={intervalsMelEq.correct} totalWrong={intervalsMelEq.wrong} totalAttempts={intervalsMelEq.attempts} />
                    <ProgressChart category="Intervals (Harmonic, Equal Temperament)" introComplete={intervalsHrmEq.introDone} practiceComplete={intervalsHrmEq.practiceDone} quizComplete={intervalsHrmEq.quizDone} totalCorrect={intervalsHrmEq.correct} totalWrong={intervalsHrmEq.wrong} totalAttempts={intervalsHrmEq.attempts} />
                    <ProgressChart category="Intervals (Harmonic, Just Temperament)" introComplete={intervalsHrmJst.practiceDone} quizComplete={intervalsHrmJst.quizDone} totalCorrect={intervalsHrmJst.correct} totalWrong={intervalsHrmJst.wrong} totalAttempts={intervalsHrmJst.attempts} />
                    <ProgressChart category="Scales" introComplete={unisons.introDone} practiceComplete={scales.practiceDone} quizComplete={scales.quizDone} totalCorrect={scales.correct} totalWrong={scales.wrong} totalAttempts={scales.attempts} />
                    <ProgressChart category="Chords (Just Temperament)" introComplete={chords.introDone} practiceComplete={chords.practiceDone} quizComplete={unisons.quizDone} totalCorrect={chords.correct} totalWrong={chords.wrong} totalAttempts={chords.attempts} />
                    <ProgressChart category="Melody" introComplete={melody.introDone} practiceComplete={melody.practiceDone} quizComplete={melody.quizDone} totalCorrect={melody.correct} totalWrong={melody.wrong} totalAttempts={melody.attempts} />
                </tbody>
            </table>
        </>
    )
}

export default Dashboard;