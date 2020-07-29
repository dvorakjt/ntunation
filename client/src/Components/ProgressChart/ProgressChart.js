import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import './style.css';

function ProgressChart(props) {

    const doughnutData = {
        labels: ["Correct", "Incorrect"],
        datasets: [{
            backgroundColor: ["#68fc65", "#cc0300"],
            hoverBackgroundColor: ["#92fc90", "#ed0400"],
            data: [props.totalCorrect, props.totalWrong]
        }]
    }

    return (
        <div className="progressChart">
            <h3>{props.category}</h3>
            <Doughnut
                className="doughnut"
                data={doughnutData}
                options={{
                    title: {
                        display: true,
                        text: props.category
                    },
                    legend: {
                        display: true,
                        text: `${props.totalCorrect} correct out of ${props.totalAttempts} questions answered.`
                    },
                    maintainAspectRatio: false
                }}

            />

        </div>
    )
}

export default ProgressChart;