import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../../Components/TopNav/TopNav';
import Jumbo from '../../Components/Jumbotron/Jumbo';
import QuestionCard2Notes from '../../Components/QuestionCard2Notes/QuestionCard2Notes'
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
    //When the component has mounted, call dispatch to set the correct answer to thisExercise.answer
    useEffect(() => {
        dispatch({
            type: "UPDATE_CORRECT_ANSWER",
            correctAnswer: thisExercise.answer
        })
    }, []);
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