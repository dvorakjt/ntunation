import React, { useState } from 'react';
//import ABCJS and Tone.js
import * as Tone from 'tone';
import Abcjs from 'react-abcjs';
//import stylesheet
import './style.css';
//import global store
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

//noteName parameter must be an abc notation note name
function Notecard({ noteCardKey, pitch, slider, sliderMin, sliderMax, sliderStep, headerText, noteName, clef, keySig, transposition }) {
    //hook into the global answer store
    const [state, dispatch] = useAnswerStoreContext();

    //create a new synth constant. must use state to declare this so that a new Tone object is not created at each render
    const [synth, setSynth] = useState(new Tone.Synth().toMaster());

    //if susBtnState is set to false, the btn is not playing. if set to true, the btn is playing
    const [susBtnState, setSusBtnState] = useState(
        false
    );

    //state for handling current pitch when sliders are involved. default value is the props.pitch value passed in
    const [currentPitch, setCurrentPitch] = useState(pitch);

    //onChange function for range input that updates the current pitch and also updates the global answer state
    //slider value is in cents
    function updatePitch({ target }) {
        //destructure the event object, get the value of the target. this will be the pitch alteration in cents
        const alteration = target.value;
        //use a function to determine what the altered pitch is based on the original pitch
        let n = Number(alteration);
        const newPitch = pitch * Math.pow(2, (n / 1200))
        //set the currentPitch state to that pitch
        setCurrentPitch(newPitch);
        synth.setNote(currentPitch);
        //set the global answer object to that value
        dispatch({
            type: "UPDATE_USER_ANSWER",
            userAnswer: alteration
        })
    }

    function handlePlayBtn(pitch) {
        //use tonejs to play the note once...will not work if note is already sustained
        if (!susBtnState) {
            synth.triggerAttackRelease(pitch, "4n");
        }
    }

    function handleSustainBtn(pitch, state) {
        //if state is true, stop playback, if state is false, start playback
        if (state) {
            synth.triggerRelease();
        } else if (!state) {
            synth.triggerAttack(pitch);
        }
        //set state to the opposite of state
        setSusBtnState(!susBtnState);
    }

    return (
        <div className="card notecard" key={noteCardKey}>
            <figure className="innerNoteCard">
                <h6 className="card-title">{headerText}</h6>
                {/* This is where the note will be drawn */}
                <Abcjs
                    abcNotation={
                        `X:${noteCardKey}
                        M:none
                        L:1/4
                        K:${keySig}
                        K: clef=${clef}
                        ${noteName}0`
                    }
                    // abcNotation={
                    //     `X:${noteCardKey} --> set the reference number to the noteCardKey
                    //     M:none --> no time signature
                    //     L:1/4 --> basic note value is the quarter note
                    //     K:${keySig} -->set the key signature to props.keySig
                    //     K: clef=${clef} -->set the clef to props.celf
                    //     ${noteName}0` --> finally, draw the note specifed in props.noteName
                    // }
                    parserParams={{}}
                    engraverParams={{}}
                    renderParams={{ viewportHorizontal: true }}
                />
            </figure>

            <div className="btn-group" role="group" aria-label={`Note ${noteCardKey} Playback controls`}>
                <button className="btn playBtn" id={"playBtn" + noteCardKey} onClick={
                    () => {
                        handlePlayBtn(currentPitch);
                    }
                }>
                    <i className="fas fa-play"></i>
                </button>
                {/* susBtn className will update to susBtnOn or susBtnOff depending on state */}
                <button className={`btn susBtn${susBtnState ? "On" : "Off"}`} id={"sustainBtn" + noteCardKey} onClick={
                    () => {
                        handleSustainBtn(currentPitch, susBtnState);
                    }
                }>
                    <i className="fas fa-infinity"></i>
                </button>
            </div>

            {(() => {
                //if this card requires a slider, add one
                if (slider) {
                    return (
                        <input type="range" defaultValue={0} min={sliderMin} max={sliderMax} step={sliderStep} className="pitchSlider" id={"pitchSlider" + noteCardKey} onChange={updatePitch} />
                        //output element goes here too
                    )
                }
            })()}
        </div>
    )
}

export default Notecard