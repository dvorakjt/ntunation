import React from 'react';
import TopNav from '../../Components/TopNav/TopNav';
import ProgressChart from '../../Components/ProgressChart/ProgressChart';
import NonChartTr from '../../Components/NonChartTr/NonChartTr';
import { Link } from 'react-router-dom';

import './style.css';

//Dashboard will use the global user state to determine the information it needs

function Dashboard() {
    return (
        <>
            <TopNav />
            <h1>Welcome, user!</h1>
            <h1 id="exercisesH1">Exercises</h1>
            <table>
                <tbody>
                    <NonChartTr category="Introduction" link="Start the Intro" complete={true}/>
                    <ProgressChart category="Unisons" introComplete={true} totalCorrect={20} totalWrong={5} totalAttempts={25} />
                    <ProgressChart category="Octaves" totalCorrect={22} totalWrong={3} totalAttempts={25} />
                    <ProgressChart category="Intervals (Melodic, Equal Temperament)" totalCorrect={19} totalWrong={6} totalAttempts={25} />
                    <ProgressChart category="Intervals (Harmonic, Equal Temperament)" totalCorrect={18} totalWrong={7} totalAttempts={25} />
                    <ProgressChart category="Intervals (Harmonic, Just Temperament)" totalCorrect={15} totalWrong={10} totalAttempts={25} />
                    <ProgressChart category="Scales" totalCorrect={23} totalWrong={2} totalAttempts={25} />
                    <ProgressChart category="Chords (Just Temperament)" totalCorrect={10} totalWrong={15} totalAttempts={25} />
                    <ProgressChart category="Melody" totalCorrect={20} totalWrong={5} totalAttempts={25} />
                </tbody>
            </table>
        </>
    )
}

export default Dashboard;