import React from 'react';
import './style.css';

//import the notecard
import Notecard from '../Notecard/Notecard';

//use the global answer state
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

function QuestionCard2Notes(props) {
    const [state, dispatch] = useAnswerStoreContext();

    const onSubmitBtnClick = (event) => {
        event.preventDefault();
        dispatch({
            type: "VERIFY_ANSWER"
        })
        if (state.verification) console.log("Correct!");
        else console.log("Wrong!!");
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h1>{state.verification.toString()}</h1>
                    <h4>{props.instructions}</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-6 d-flex justify-content-center">
                    <Notecard noteCardKey="1" noteName={props.noteName1} pitch={props.pitch1} headerText={props.header1} clef={props.clef1} keySig={props.keySig} />
                </div>
                <div className="col-6 d-flex justify-content-center">
                    <Notecard noteCardKey="2" noteName={props.noteName2} pitch={props.pitch2} headerText={props.header2} clef={props.clef2} keySig={props.keySig} slider={props.slider} sliderMin={props.sliderMin} sliderMax={props.sliderMax} sliderStep={props.sliderStep} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-primary" onClick={onSubmitBtnClick}>Submit!</button>
                </div>
            </div>
        </>
    )
}

export default QuestionCard2Notes;