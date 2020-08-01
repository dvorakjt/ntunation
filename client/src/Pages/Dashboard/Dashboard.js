import React from 'react';
import TopNav from '../../Components/TopNav/TopNav';
import ProgressChart from '../../Components/ProgressChart/ProgressChart';
import NonChartTr from '../../Components/NonChartTr/NonChartTr';

//import global user store
import { useUserStoreContext } from '../../Utils/UserStore';

import './style.css';

//Dashboard will use the global user state to determine the information it needs

function Dashboard() {
    //hook into global user store
    const [state, dispatch] = useUserStoreContext();

    const { user } = state;
    const { nickname, introComplete, unisons, octaves, intervalsMelEq, intervalsHrmEq, intervalsHrmJst, scales, chords, melody } = user;

    console.log(user);

    return (
        <>
            <TopNav />
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