import React from 'react';
import TopNav from '../../Components/TopNav/TopNav';
import ProgressChart from '../../Components/ProgressChart/ProgressChart';

import './style.css';

//Dashboard will use the global user state to determine the information it needs

function Dashboard() {
    return (
        <>
            <TopNav />
            <h1>Exercises</h1>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2">Categories</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="2">Unisons</td>
                            </tr>
                            <tr>
                                <td>Practice session</td>
                                <td>Quiz me!</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Octaves</td>
                            </tr>
                            <tr>
                                <td>Practice session</td>
                                <td>Quiz me!</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Intervals (Melodic, Equal Temperament)</td>
                            </tr>
                            <tr>
                                <td>Practice session</td>
                                <td>Quiz me!</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Intervals (Harmonic, Equal Temperament)</td>
                            </tr>
                            <tr>
                                <td>Practice session</td>
                                <td>Quiz me!</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Intervals (Harmonic, Just Temperament)</td>
                            </tr>
                            <tr>
                                <td>Practice session</td>
                                <td>Quiz me!</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Scales</td>
                            </tr>
                            <tr>
                                <td>Practice session</td>
                                <td>Quiz me!</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Chords (Just Temperament)</td>
                            </tr>
                            <tr>
                                <td>Practice session</td>
                                <td>Quiz me!</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Melody</td>
                            </tr>
                            <tr>
                                <td>Practice session</td>
                                <td>Quiz me!</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div> {/* Progress div */}
                <h1>Track your progress!</h1>
                <ProgressChart category="Unisons" totalCorrect={20} totalWrong={5} totalAttempts={25} />
                <ProgressChart category="Octaves" totalCorrect={22} totalWrong={3} totalAttempts={25} />
                <ProgressChart category="Intervals (Melodic, Equal Temperament)" totalCorrect={19} totalWrong={6} totalAttempts={25} />
                <ProgressChart category="Intervals (Harmonic, Equal Temperament)" totalCorrect={18} totalWrong={7} totalAttempts={25} />
                <ProgressChart category="Intervals (Harmonic, Just Temperament)" totalCorrect={15} totalWrong={10} totalAttempts={25} />
                <ProgressChart category="Scales" totalCorrect={23} totalWrong={2} totalAttempts={25} />
                <ProgressChart category="Chords (Just Temperament)" totalCorrect={10} totalWrong={15} totalAttempts={25} />
                <ProgressChart category="Melody" totalCorrect={20} totalWrong={5} totalAttempts={25} />
            </div>
        </>
    )
}

export default Dashboard;