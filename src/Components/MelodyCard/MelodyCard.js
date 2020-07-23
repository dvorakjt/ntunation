import React, { useState, useEffect } from 'react';
//import ABCJS and Tone.js
import * as Tone from 'tone';
import Abcjs from 'react-abcjs';
//import stylesheet
// import './style.css';
//import global store
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

//for a melody, more information is required...
/*Therefore, notes is an array of objects...alternatively, I could separate this info into two arrays, one to
pass to tone js and one to pass into the display components. i could also use map to achieve this
[
    {
        pitch: //in hz,
        name: //abc notename,
        dispName: //name to display to the user
        time: //timing of the note along the tone.js timeline
        dur: //duration of the note
    },
    {

    },
    ...
]
*/
//baseValue is the smallest note value found in the melody, for instance '1/4' for the quarter note. tempo is
//tempo in bpm
function MelodyCard({ notes, clef, keySig, headerText, tempo, baseValue, meter, transposition }) {
    //hook into the global answer store
    const [state, dispatch] = useAnswerStoreContext();

    //create a new synth constant. must use state to declare this so that a new Tone object is not created at each render
    const [synth, setSynth] = useState(new Tone.Synth().toMaster());

    //create an array of notes for tone.js to play
    const tones = notes.map(({ time, pitch, dur }) => {
        return (
            {
                time,
                note: pitch,
                dur
            }
        )
    });

    //map the abcjs notename into a new array. in this case, the abcjs notename will also include info about the note's duration
    let abcNotes = notes.map(({ name }) => { return name });
    abcNotes = abcNotes.join(" ");
    const abcNotation =
        `X:1
        M:${meter}
        L:${baseValue}
        K:${keySig}
        K: clef=${clef}
        ${abcNotes}`

    //map the display names of each of the notes into an array along with their pitch in order to construct buttons
    //the index of these note names will be used to validate the correct answer
    const displayNotes = notes.map(({ dispName, pitch }) => {
        return ({
            name: dispName,
            pitch
        });
    })

    /*set the melody is playing state, this determines:
    -whether the play button is a play button or a pause buttn
    -whether the note buttons are active or disabled
    */
    const [isPlaying, setIsPlaying] = useState(false);

    //this keeps track of where the melody is at. 
    let noteIndex = 0;

    //pass an array of events into tone.js
    const [melody, setMelody] = useState(
        new Tone.Part(function (time, event) {
            synth.triggerAttackRelease(event.note, event.dur, time)
            noteIndex++
            if (noteIndex >= tones.length) {
                //if you have reached the end of the melody, set the noteIndex to 0, set is playing to false, reset the Tone toggle
                noteIndex = 0;
                setIsPlaying(false)
                Tone.Transport.toggle();
            }
        }, tones));

    useEffect(() => {
        melody.start(0);
    }, []);

    //handles the playBtn for the entire melody
    function handlePlayBtn() {
        setIsPlaying(!isPlaying);
        Tone.Transport.toggle();
    }

    //handles playback of individual notes
    function handleNotePlay({ target }) {
        const pitch = target.getAttribute('data-pitch');
        const userAnswer = target.getAttribute('data-index');
        if (!isPlaying) {
            synth.triggerAttackRelease(pitch, "4n");
            dispatch({
                type: "UPDATE_USER_ANSWER",
                userAnswer: userAnswer
            })
        }
    }

    //jsx
    return (
        <div className="card melodyCard">
            <figure className="innerMelodyCard">
                <h6 className="card-title">{headerText}</h6>
                <Abcjs
                    abcNotation={abcNotation}
                    parserParams={{}}
                    engraverParams={{}}
                    renderParams={{ viewportHorizontal: true }}
                />
            </figure>
            <div className="btn-group" role="group" aria-label="play buttons">
                <button className="btn btn-primary playMelody" onClick={handlePlayBtn}>
                    {(() => {
                        if (!isPlaying) return <i className="fas fa-play"></i>
                        else return <i className="fas fa-stop"></i>
                    })()}
                </button>
                {/* Creates a button for each note in the melody */}
                {displayNotes.map(({ name, pitch }, index) => {
                    return (
                        <button className="btn btn-primary" data-pitch={pitch} data-index={index} onClick={handleNotePlay}>{name}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default MelodyCard;