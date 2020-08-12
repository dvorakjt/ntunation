import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './style.css';

function ProgressChart(props) {

    const doughnutData = {
        datasets: [{
            backgroundColor: ["#68fc65", "#cc0300"],
            hoverBackgroundColor: ["#92fc90", "#ed0400"],
            data: [props.totalCorrect, props.totalWrong]
        }],

        labels: ["Correct", "Incorrect"]
    }

    return (
        <tr key={props.category}>
            <td className="cell1"><h3>{props.category}</h3></td>
            {/* href will need to go to props.introLink, props.practiceLink, props.quizLink etc */}
            <td className="cell3"><a href="" onClick={props.introFunction}>Introduction</a>{(() => { if (props.introComplete) return (<i class="fas fa-check"></i>) })()}</td>
            <td className="cell4"><a href="" onClick={props.practiceFunction}>Practice</a>{(() => { if (props.practiceComplete) return (<i class="fas fa-check"></i>) })()}</td>
            <td className="cell5"><a href="" onClick={props.startFunction}>Quiz{(() => { if (props.quizComplete) return (<i class="fas fa-check"></i>) })()}</a></td>
            <td className="cell2"><Doughnut
                className="miniDoughnut"
                data={doughnutData}
                options={{
                    maintainAspectRatio: false
                }}

            /></td>
        </tr>
    )
}

export default ProgressChart;