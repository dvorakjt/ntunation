const selectRange = require('../PitchNarrower/pitchNarrower');

module.exports = (difficulty, notes) => {
    const instructions = "Identify the note that is out of tune, and whether it is sharp or flat."

    const scalePatterns = [
        {
            scale: "major",
            pattern: [2, 2, 1, 2, 2, 2, 1]
        },
        {
            scale: "natural minor",
            pattern: [2, 1, 2, 2, 1, 2, 2]
        },
        {
            scale: "harmonic minor",
            pattern: [2, 1, 2, 2, 1, 3, 1]
        },
        {
            scale: "melodic minor",
            pattern: [2, 1, 2, 2, 2, 2, 1]
        },
        {
            scale: "whole tone",
            pattern: [2, 2, 2, 2, 2, 2]
        }
    ]

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
    let questions = []
    for (let i = 0; i < 10; i++) {
        //randomize the step
        const step = Math.floor(Math.random() * ((maxStep + 1) - minStep)) + minStep
        //randomize the scale type
        const scaleType = scalePatterns[Math.floor(Math.random() * scalePatterns.length)]
        //randomize the root
        let firstIndex;
        //re-roll the first index until it is at least an octave below the top note in the set.
        do {
            firstIndex = Math.floor(Math.random() * selectedNotes.length);
        } while (firstIndex >= selectedNotes.length - 12)
        //build the scale
        const scale = buildScale(selectedNotes, scaleType.pattern, firstIndex)

        //pick a note to detune, then set the answer accordingly
        //select an index at random
        const detunedNoteIndex = Math.floor(Math.random() * scale.length);
        //now randomize the pitch adjustment
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
        //set the answer!
        const answer = [detunedNoteIndex, sharpOrFlat]
        //detune the pitch
        scale[detunedNoteIndex].pitch = Number(scale[detunedNoteIndex].pitch) * Math.pow(2, (adjustment / 1200))
        //finally push the question to the array
        questions.push({
            instructions: instructions,
            headerText: `${scale[0].dispName.substring(0, scale[0].dispName.length - 1)} ${scaleType.scale}`,
            clef: "treble",
            keySig: "C",
            tempo: "100",
            baseValue: "1/4",
            transposition: "",
            meter: "none",
            answer: answer,
            notes: scale
        });
    }
    return questions;
}

function buildScale(pitches, pattern, firstIndex) {
    let scale = [];
    let noteIndex = firstIndex;
    const timings = [
        "0", "4n", "2n", { ['2n']: 1, ['4n']: 1 }, "1m", { ['1m']: 1, ['4n']: 1 }, { ['1m']: 1, ['2n']: 1 }, { ['1m']: 1, ['2n']: 1, ['4n']: 1 },
        "2m", { ['2m']: 1, ['4n']: 1 }, { ['2m']: 1, ['2n']: 1 }, { ['2m']: 1, ['2n']: 1, ['4n']: 1 }, "3m"
    ]
    for (let i = 0; i <= pattern.length; i++) {
        //add the current note to the note index
        pitches[noteIndex] = {
            ...pitches[noteIndex],
            time: timings[i],
            dur: "4n"
        }
        scale.push(pitches[noteIndex]);
        //increase the note index
        noteIndex += pattern[i];
    }
    return scale;
}