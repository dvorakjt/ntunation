const selectRange = require('../PitchNarrower/pitchNarrower');

module.exports = (difficulty, notes) => {
    //an array of all possible instructions
    const instructions = ["Adjust the slider until the second pitch is in tune.",
        "Identify whether the second note is sharp or flat."]

    //determine the smallest and largest possible step (in cents) for each difficulty, also narrow down the range
    //of pitches
    let minStep;
    let maxStep;
    let selectedNotes;
    switch (difficulty) {
        case 1: {
            minStep = 10;
            maxStep = 15;
            selectedNotes = selectRange(notes, "C3", "C6");
            break;
        }
        case 2: {
            minStep = 5;
            maxStep = 10;
            selectedNotes = selectRange(notes, "C2", "C7");
            break;
        }
        case 3: {
            minStep = 2;
            maxStep = 6;
            //don't narrow the range
            selectedNotes = notes;
            break;
        }
        default: {
            minStep = 10;
            maxStep = 15;
            selectedNotes = selectRange(notes, "C3", "C6");
            break;
        }
    }

    //get the index of middle C to determine the clef
    const middleC = selectedNotes.map(({ dispName }) => { return dispName }).indexOf("C4");

    let questions = []
    for (let i = 0; i < 10; i++) {
        /*determine the step for sliders. Subract the min step from one more than the max step. For instance,
        subtract 10 from 16 and multiply it by Math.random(). Round it down with Math.floor. This will result in 
        a number between 0 and 5 in this case. Then add the min step so that the result is somewhere between the 
        min step and the max step */
        const step = Math.floor(Math.random() * ((maxStep + 1) - minStep)) + minStep
        const sliderMax = step * 5;
        const sliderMin = step * -5;

        //now randomize actual pitch and answer values
        //first pick a random first note from the notes array
        let firstIndex;
        //re-roll the first index until it is at least an octave below the top note in the set.
        do {
            firstIndex = Math.floor(Math.random() * selectedNotes.length);
        } while (firstIndex >= selectedNotes.length - 12)

        //determine the clef for the first note
        let clef1;
        if (firstIndex >= middleC) {
            clef1 = 'treble'
        } else {
            clef1 = 'bass'
        }

        //then, set the second index to an octave above the first.
        const secondIndex = firstIndex + 12;
        //set the first and second notes
        const firstNote = selectedNotes[firstIndex];
        let secondNote = selectedNotes[secondIndex];

        //determine the clef for the second note
        let clef2;
        if (secondIndex >= middleC) {
            clef2 = 'treble'
        } else {
            clef2 = 'bass'
        }

        //now declare a variable called adjustment that will hold the pitch adjustment, and reroll until it is not 5
        let adjustment;
        do {
            adjustment = Math.floor(Math.random() * 11)
        } while (adjustment === 5)
        //now subtract 5 from the adjustment. If the result is 0, it will become -5, if the result is 10 it will become 5
        adjustment = adjustment - 5;
        //multiply the adjustment by the step to get the actual adjustment in cents
        adjustment = adjustment * step
        //is the adjustment position or negative? if positive, the note is sharp. if negative, the note is flat
        let sharpOrFlat;
        if (adjustment > 0) {
            sharpOrFlat = "Sharp"
        } else if (adjustment < 0) {
            sharpOrFlat = "Flat"
        }

        //what type of exercise ? slider or sharpOrFlat
        let answer;
        let qtype = Math.floor(Math.random() * 2);
        if (qtype === 0) {
            qtype = "slider"
            //in slider exercises, the answer is the opposite of the adjustment
            answer = -adjustment;
        }
        else {
            qtype = "sharpOrFlat"
            //in sharpOrFlat exercises, the answer is "Sharp" or "Flat"
            answer = sharpOrFlat;
        }
        //finally return an object to represent each question
        questions.push({
            instructions: qtype === "slider" ? instructions[0] : instructions[1],
            noteName1: firstNote.name,
            noteName2: secondNote.name,
            pitch1: Number(firstNote.pitch),
            pitch2: Number(secondNote.pitch) * Math.pow(2, (adjustment / 1200)),
            header1: `Note 1: ${firstNote.dispName}`,
            header2: `Note 2: ${secondNote.dispName}`,
            clef1: clef1,
            clef2: clef2,
            keySig: "C",
            slider: qtype === "slider" ? true : false,
            sliderMin: qtype === "slider" ? sliderMin : "",
            sliderMax: qtype === "slider" ? sliderMax : "",
            sliderStep: qtype === "slider" ? step : "",
            btn: qtype === "slider" ? "submit" : "sharpOrFlat",
            answer: answer.toString()
        })
    }
    return questions;
}