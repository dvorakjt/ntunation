import selectRange from '../PitchNarrower/pitchNarrower';

const genIntHrmJ = (difficulty, notes) => {
    const intervals = ["Unison", "minor 2nd", "Major 2nd", "minor 3rd", "Major 3rd", "Perfect 4th", "Tritone", "Perfect 5th", "minor 6th", "Major 6th", "minor 7th", "Major 7th", "Octave"]
    const multipliers = [1, (25 / 24), (9 / 8), (6 / 5), (5 / 4), (4 / 3), (45 / 32), (3 / 2), (8 / 5), (5 / 3), (9 / 5), (15 / 8), 2]
    const instructions = "Adjust the slider until the second pitch is in tune."

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

        //determine the clef
        let clef;
        if (firstIndex >= middleC) {
            clef = 'treble'
        } else {
            clef = 'bass'
        }

        //randomize the interval. 0 is a unison, 12 is an octave.
        const interval = Math.floor(Math.random() * 13)
        const secondIndex = firstIndex + interval;
        const intervalType = intervals[interval];

        //the multiplier index corresponds to the interval index, second pitch is equal to a multiple of the first pitch
        const multiplier = multipliers[interval];
        const pitch = selectedNotes[firstIndex].pitch * multiplier;

        const firstNote = selectedNotes[firstIndex];
        //set the second note but replace the pitch value with the ratio-based pitch
        const secondNote = { ...selectedNotes[secondIndex], pitch: pitch }

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

        const answer = -adjustment;

        //finally return an object to represent each question

        questions.push({
            instructions: instructions,
            headerText: intervalType,
            clef: clef,
            keySig: "C",
            chordNotation: `[${firstNote.name}${secondNote.name}4]`,
            notes: [
                firstNote,
                secondNote
            ],
            answer: answer.toString(),
            sliderStep: step,
            sliderMin: sliderMin,
            sliderMax: sliderMax
        })
    }
    return questions;
}

export default genIntHrmJ;