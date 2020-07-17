import React from 'react';
import './style.css';


function QuestionCardWrapper(props) {
    return (
        <div className="card qCardWrapper">
            <h3>{props.title}</h3>
            <div class="container">
                {props.children}
            </div>
        </div>
    )
}

export default QuestionCardWrapper;