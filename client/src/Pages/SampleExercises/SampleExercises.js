import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../../Components/TopNav/TopNav';
import Jumbo from '../../Components/Jumbotron/Jumbo';
import QuestionCardMelody from '../../Components/QuestionCardMelody/QuestionCardMelody';
import QuestionCard2Notes from '../../Components/QuestionCard2Notes/QuestionCard2Notes';
import QuestionCardChord from '../../Components/QuestionCardChord/QuestionCard2Chord';
import { useAnswerStoreContext } from "../../Utils/AnswerStore";
import ModalPrefab from '../../Components/Modal/Modal';
import InfoCard from '../../Components/InfoCard/InfoCard';
import * as data from '../../Data/exercises.json';

function SampleExercises(props) {
    //Grab the state const and the dispatch methods from the answer store
    const [state, dispatch] = useAnswerStoreContext();
    //This is an array of exercise names to use for comparison with the url parameter
    const exercises = ["introduction", "unisons", "octaves", "intervals", "scales", "chords", "melody"];
    //Set the index of the current exercise to the instance of the url exercise parameter in the array above
    const currentExerciseIndex = exercises.indexOf(props.exercise);
    //This exercise is equal to the json object at the current index within the exercises array of the data json object
    const thisExercise = data.default.exercises[currentExerciseIndex];
    //Determine what the next exercise index is for use in next exercise button
    let nextExerciseIndex = currentExerciseIndex + 1;
    //If it's greater than 6, set it to 0
    if (nextExerciseIndex > 6) nextExerciseIndex = 0;
    //Then, grab the string from the array to use in the link
    const nextExercise = exercises[nextExerciseIndex];
    //When the component has mounted and when thisExercise updates, call dispatch to set the correct answer to thisExercise.answer
    useEffect(() => {
        dispatch({
            type: "UPDATE_CORRECT_ANSWER",
            correctAnswer: thisExercise.answer
        })
    }, [thisExercise]);
    return (
        <div className="heroImg">
            <ModalPrefab title={thisExercise.title}>
                {(() => {
                    switch (thisExercise.cardType) {
                        case "info":
                            return (<InfoCard bodyHeader={thisExercise.bodyHeader} body={thisExercise.body} nextExercise={nextExercise} />)
                        case "2Notes":
                            return (
                                <QuestionCard2Notes instructions={thisExercise.instructions} noteName1={thisExercise.note1.noteName} noteName2={thisExercise.note2.noteName}
                                    pitch1={thisExercise.note1.pitch} pitch2={thisExercise.note2.pitch} header1={thisExercise.note1.headerText}
                                    header2={thisExercise.note2.headerText} clef1={thisExercise.note1.clef} clef2={thisExercise.note2.clef}
                                    keySig={thisExercise.note1.keySig} slider={thisExercise.note2.slider} sliderMin={thisExercise.note2.sliderMin}
                                    sliderMax={thisExercise.note2.sliderMax} sliderStep={thisExercise.note2.sliderStep} btn={thisExercise.btn}
                                    nextExercise={nextExercise} currentExercise={props.exercise}
                                />)
                        case "melody":
                            return (
                                <QuestionCardMelody instructions={thisExercise.instructions} notes={thisExercise.notes} clef={thisExercise.clef} keySig={thisExercise.keySig}
                                    tempo={thisExercise.tempo} baseValue={thisExercise.baseValue} transposition={thisExercise.transposition} headerText={thisExercise.headerText}
                                    meter={thisExercise.meter} nextExercise={nextExercise} currentExercise={props.exercise}
                                />
                            )
                        case "chord":
                            return <QuestionCardChord instructions={thisExercise.instructions} headerText={thisExercise.headerText} clef={thisExercise.clef}
                                keySig={thisExercise.keySig} notes={thisExercise.notes} chordNotation={thisExercise.chordNotation}
                                nextExercise={nextExercise} currentExercise={props.exercise} sliderStep={3.5} sliderMin={-17.5} sliderMax={17.5}
                            />
                        default:
                            return (
                                <>
                                    <p>Nothing to display yet.</p>
                                </>
                            )
                    }
                })()}
            </ModalPrefab>
            <TopNav />
            <Jumbo heading="/ˌin(t)o͞oˈnāSH(ə)n/" page="home" btnText="Try it Out!" text="NTunation - the comprehensive, intonation-focused aural-training application." />
        </div>
    )
}

export default SampleExercises;