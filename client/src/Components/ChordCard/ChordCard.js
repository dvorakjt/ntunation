import React, { useState, useEffect } from 'react';
//import ABCJS and Tone.js
import * as Tone from 'tone';
import Abcjs from 'react-abcjs';
//import stylesheet
// import './style.css';
//import global store
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

//noteName parameter must be an abc notation note name
function ChordCard({ chordNotation, notes, headerText, clef, keySig, transposition }) {
    //hook into the global answer store
    const [state, dispatch] = useAnswerStoreContext();

    //create a new synth constant. must use state to declare this so that a new Tone object is not created at each render
    const [synth0, setSynth] = useState(new Tone.Synth().toMaster());
    const [synth1, setSynth1] = useState(new Tone.Synth().toMaster());
    const [synth2, setSynth2] = useState(new Tone.Synth().toMaster());
    const [synth3, setSynth3] = useState(new Tone.Synth().toMaster());

    //if susBtnState is set to false, the btn is not playing. if set to true, the btn is playing
    const [susBtnChord, setSusBtnChord] = useState(
        false
    );
    const [susBtnNote, setSusBtnNote] = useState(
        false
    );

    //transform the notes object into an array of just the pitches
    const pitches = notes.map(note => { return note.pitch });

    //state for handling current pitch when sliders are involved. default value is the props.pitch value passed in
    const [currentPitches, setCurrentPitches] = useState(pitches);

    function updatePitch({ target }) {
        //destructure the event object, get the value of the target. this will be the pitch alteration in cents
        const alteration = target.value;
        //use a function to determine what the altered pitch is based on the original pitch
        let n = Number(alteration);
        const newPitch = pitches[1] * Math.pow(2, (n / 1200))
        //set the currentPitch state to that pitch
        setCurrentPitches([pitches[0], newPitch, pitches[2]]);
        synth1.setNote(newPitch);
        //set the global answer object to that value
        dispatch({
            type: "UPDATE_USER_ANSWER",
            userAnswer: alteration
        })
    }

    //////////////////////////////////////Chord Playback//////////////////////////////////////////////////////
    function handleChordPlayBtn(pitches) {
        //use tonejs to play the note once...will not work if note is already sustained
        if (!susBtnChord) {
            synth0.triggerAttackRelease(pitches[0], "2n");
            synth1.triggerAttackRelease(pitches[1], "2n");
            synth2.triggerAttackRelease(pitches[2], "2n");
        }
    }

    function handleChordSustainBtn(pitches, state) {
        //if state is true, stop playback, if state is false, start playback
        if (state) {
            synth0.triggerRelease()
            synth1.triggerRelease()
            synth2.triggerRelease()
        } else if (!state) {
            synth0.triggerAttack(pitches[0]);
            synth1.triggerAttack(pitches[1]);
            synth2.triggerAttack(pitches[2]);
        }
        //set state to the opposite of state
        setSusBtnChord(!susBtnChord);
    }

    ////////////////////////////////////Note Playback////////////////////////////////////////////////////////
    function handleNotePlayBtn(pitch) {
        //use tonejs to play the note once...will not work if note is already sustained
        if (!susBtnNote) {
            synth1.triggerAttackRelease(pitch, "4n");
        }
    }

    function handleNoteSustainBtn(pitch, state) {
        //if state is true, stop playback, if state is false, start playback
        if (state) {
            synth1.triggerRelease();
        } else if (!state) {
            synth1.triggerAttack(pitch);
        }
        //set state to the opposite of state
        setSusBtnNote(!susBtnNote);
    }
    //Make sure a sustained tone stops if the component unmounts
    useEffect(() => {
        return function cleanup() {
            synth0.triggerRelease()
            synth1.triggerRelease()
            synth2.triggerRelease()
        }
    }, []);

    return (
        <div className="row">
            <div className="col-6 d-flex justify-content-center">
                <div className="card notecard" key="1">
                    <figure className="innerNoteCard">
                        <h6 className="card-title">{headerText}</h6>
                        {/* This is where the chord will be drawn */}
                        <Abcjs
                            abcNotation={
                                `X:1
                        M:none
                        L:1/4
                        K:${keySig}
                        K: clef=${clef}
                        ${chordNotation}`
                            }
                            parserParams={{}}
                            engraverParams={{}}
                            renderParams={{ viewportHorizontal: true }}
                        />
                    </figure>

                    <div className="btn-group" role="group" aria-label={`Note Playback controls`}>
                        <button className="btn playBtn" id="playBtn1" onClick={
                            () => {
                                handleChordPlayBtn(currentPitches);
                            }
                        }>
                            <i className="fas fa-play"></i>
                        </button>
                        {/* susBtn className will update to susBtnOn or susBtnOff depending on state */}
                        <button className={`btn susBtn${susBtnChord ? "On" : "Off"}`} id="sustainBtn1" onClick={
                            () => {
                                handleChordSustainBtn(currentPitches, susBtnChord);
                            }
                        }>
                            <i className="fas fa-infinity"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-6 d-flex justify-content-center">
                <div className="card notecard" >
                    <figure className="innerNoteCard">
                        <h6 className="card-title">{notes[1].dispName}</h6>
                        {/* This is where each note will be drawn */}
                        <Abcjs
                            abcNotation={
                                `X:2
                        M:none
                        L:1/4
                        K:${keySig}
                        K: clef=${clef}
                        ${notes[1].abcName}`
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

                    <div className="btn-group" role="group" aria-label={`Note Playback controls`}>
                        <button className="btn playBtn" id="playBtn2" onClick={() => handleNotePlayBtn(currentPitches[1])}>
                            <i className="fas fa-play"></i>
                        </button>
                        {/* susBtn className will update to susBtnOn or susBtnOff depending on state */}
                        <button className={`btn susBtn${susBtnNote ? "On" : "Off"}`} id="susBtn2" onClick={() => handleNoteSustainBtn(currentPitches[1], susBtnNote)}>
                            <i className="fas fa-infinity"></i>
                        </button>
                    </div>

                    <input type="range" defaultValue={0} min={-17.5} max={17.5} step={3.5} className="pitchSlider" id="pitchSlider" onChange={updatePitch} />

                </div>
            </div>
        </div>
    )
}

export default ChordCard;