import React, { useState, useEffect } from 'react';
import TopNav from '../../Components/TopNav/TopNav';
import QuestionCardWrapper from '../../Components/QuestionCardWrapper/QuestionCardWrapper';
import QuestionCard2Notes from '../../Components/QuestionCard2Notes/QuestionCard2Notes'
import { useAnswerStoreContext } from "../../Utils/AnswerStore";

function SampleExercises() {
    const [state, dispatch] = useAnswerStoreContext();
    //for now, set a default correct answer, and submit default correct values
    useEffect(() => {
        dispatch({
            type: "UPDATE_CORRECT_ANSWER",
            correctAnswer: "-10"
        })
    }, []);
    return (
        <>
            {/* React router will switch the components rendered */}
            <TopNav />
            <QuestionCardWrapper title="Unisons">
                {/*For now, enter default values for testing */}
                <QuestionCard2Notes instructions="Adjust the slider until the second note is in tune." pitch1={261.63}
                    pitch2={263.14562259} header1="Note 1: C4" header2="Note 2: C4" clef1="treble" clef2="treble" keySig="C" slider={true} sliderMin={-25}
                    sliderMax={25} sliderStep={5} noteName1="C" noteName2="C"
                />
            </QuestionCardWrapper>
        </>
    )
}

export default SampleExercises;