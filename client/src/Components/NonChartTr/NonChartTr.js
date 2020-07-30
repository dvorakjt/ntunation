import React from 'react';

function NonChartTr(props) {
    return (
        <tr>
            <td>
                <h3>{props.category}</h3>
            </td>
            <td>
                {/* Empty TD where charts would be displayed */}
            </td>
            <td>
                <a href="#">{props.link}</a>{(() => {if(props.complete) return (<i class="fas fa-check"></i>)})()}
            </td>
            <td></td>
            <td></td>
        </tr>
    )
}

export default NonChartTr;