import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './style.css';

function Jumbo(props) {
    return (
        <Jumbotron className={props.page}>
            <div className="row">
                <div className="col-12">
                    <h1>{props.heading}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div class="textWrapper">
                        <h3>{props.text}</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <button className="btn">{props.btnText}</button>
                </div>
            </div>
        </Jumbotron>
    )
}

export default Jumbo;