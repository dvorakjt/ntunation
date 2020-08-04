const selectRange = require('../PitchNarrower/pitchNarrower');

module.exports = (difficulty, notes) => {
    const chordTypes = ["Major", "minor"]
    const instructions = "Adjust the slider until the third of the chord is in tune."

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
        /*determine the step for adjusting the pitch. Subract the min step from one more than the max step. For instance,
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

        const firstNote = selectedNotes[firstIndex];

        //determine the clef
        let clef;
        if (firstIndex >= middleC) {
            clef = 'treble'
        } else {
            clef = 'bass'
        }

        //major or minor?
        const chordType = chordTypes[Math.floor(Math.random() * 2)]

        //prepare index and note variables for assignment
        let secondIndex, thirdIndex, secondPitch, thirdPitch;

        switch (chordType) {
            case "Major": {
                console.log("major!")
                secondIndex = firstIndex + 4;
                thirdIndex = secondIndex + 3;
                secondPitch = Number(firstNote.pitch) * 1.25;
                thirdPitch = Number(firstNote.pitch) * 1.5;
                break;
            }
            case "minor": {
                secondIndex = firstIndex + 3;
                thirdIndex = secondIndex + 4;
                secondPitch = Number(firstNote.pitch) * 1.2;
                thirdPitch = Number(firstNote.pitch) * 1.5;
                break;
            }
        }

        const secondNote = { ...selectedNotes[secondIndex], pitch: secondPitch };
        const thirdNote = { ...selectedNotes[thirdIndex], pitch: thirdPitch };

        //now declare a variable called adjustment that will hold the pitch adjustment, and reroll until it is not 5
        let adjustment;
        do {
            adjustment = Math.floor(Math.random() * 11)
        } while (adjustment === 5)
        //now subtract 5 from the adjustment. If the result is 0, it will become -5, if the result is 10 it will become 5
        adjustment = adjustment - 5;
        //multiply the adjustment by the step to get the actual adjustment in cents
        adjustment = adjustment * step
        //adjust the pitch
        secondNote.pitch = secondNote.pitch * Math.pow(2, (adjustment / 1200))
        //set the answer!
        const answer = -adjustment;

        //finally return an object to represent each question

        questions.push({
            instructions: instructions,
            headerText: `${firstNote.dispName.substring(0, firstNote.dispName.length - 1)} ${chordType} chord`,
            clef: clef,
            keySig: "C",
            chordNotation: `[${firstNote.name}${secondNote.name}${thirdNote.name}4]`,
            notes: [
                firstNote,
                secondNote,
                thirdNote
            ],
            answer: answer,
            sliderStep: step,
            sliderMin: sliderMin,
            sliderMax: sliderMax
        })
    }
    return questions;
}