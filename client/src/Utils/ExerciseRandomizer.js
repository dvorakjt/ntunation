import genScales from './Randomizers/scales';
import genChords from './Randomizers/chords';
import genUnisons from './Randomizers/unisons';
import genOctaves from './Randomizers/octaves';
import genIntMelE from './Randomizers/intervalsMelEq';
import genIntHrmE from './Randomizers/intervalsHrmEq';
import genIntHrmJ from './Randomizers/intervalsHrmJst';

const notes440 = require('../Data/pitches440.json');
const notes442 = require('../Data/pitches442.json');

const genRandomQuestions = function (category, difficulty, pitchLevel) {
    //first, use the user preferences to decide which 
    let allNotes;
    switch (pitchLevel) {
        case 440: {
            allNotes = notes440
            break;
        }
        case 442: {
            allNotes = notes442
            break;
        }
        default: {
            allNotes = notes440
            break;
        }
    }

    // now call a different function depending on the question type and difficulty
    switch (category) {
        case "Unisons": {
            return genUnisons(difficulty, allNotes);
        }
        case "Octaves": {
            return genOctaves(difficulty, allNotes);
        }
        case "Scales": {
            return genScales(difficulty, allNotes);
        }
        case "Intervals - Melodic, Equal Temperament": {
            return genIntMelE(difficulty, allNotes);
        }
        case "Intervals - Harmonic, Equal Temperament": {
            return genIntHrmE(difficulty, allNotes);
        }
        case "Intervals - Harmonic, Just Temperament": {
            return genIntHrmJ(difficulty, allNotes);
        }
        case "Chords": {
            return genChords(difficulty, allNotes);
        }
    }
}

export default genRandomQuestions;