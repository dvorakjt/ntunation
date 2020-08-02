const randomizer = require('./ExerciseRandomizer');

const scales = (randomizer("Scales", 1, 440));
console.log(scales);
console.log(scales[0].notes[0]);
