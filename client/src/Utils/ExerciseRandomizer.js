const notes440 = require('../Data/pitches440.json');
const notes442 = require('../Data/pitches442.json');

//require randomizers
const genUnisons = require('./Randomizers/unisons');
const genOctaves = require('./Randomizers/octaves');
const genScales = require('./Randomizers/scales');

module.exports = function (category, difficulty, pitchLevel) {
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
    }
}