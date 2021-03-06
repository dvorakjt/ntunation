const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt-nodejs');
const { constants } = require('buffer');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Must be a valid email address'],
        required: true,
        unique: true
    },

    //will need to do client side validation on password length since it's going to be hashed
    password: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    pitch: {
        //either 440 or 442 for now
        type: Number
    },
    difficulty: {
        //1 is easy 3 is hard
        type: Number,
        min: 1,
        max: 3
    },
    //categories complete
    //intro
    introComplete: {
        type: Boolean,
        default: false
    },
    //unisons
    unisons: {
        attempts: { type: Number, default: 0 },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        introDone: { type: Boolean, default: false },
        practiceDone: { type: Boolean, default: false },
        quizDone: { type: Boolean, default: false }

    },
    octaves: {
        attempts: { type: Number, default: 0 },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        introDone: { type: Boolean, default: false },
        practiceDone: { type: Boolean, default: false },
        quizDone: { type: Boolean, default: false }
    },
    //equal temperament melodic
    intervalsMelEq: {
        attempts: { type: Number, default: 0 },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        introDone: { type: Boolean, default: false },
        practiceDone: { type: Boolean, default: false },
        quizDone: { type: Boolean, default: false }
    },
    //equal temperament harmonic
    intervalsHrmEq: {
        attempts: { type: Number, default: 0 },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        introDone: { type: Boolean, default: false },
        practiceDone: { type: Boolean, default: false },
        quizDone: { type: Boolean, default: false }
    },
    //just temperament harmonic
    intervalsHrmJst: {
        attempts: { type: Number, default: 0 },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        introDone: { type: Boolean, default: false },
        practiceDone: { type: Boolean, default: false },
        quizDone: { type: Boolean, default: false }
    },
    scales: {
        attempts: { type: Number, default: 0 },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        introDone: { type: Boolean, default: false },
        practiceDone: { type: Boolean, default: false },
        quizDone: { type: Boolean, default: false }
    },
    chords: {
        attempts: { type: Number, default: 0 },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        introDone: { type: Boolean, default: false },
        practiceDone: { type: Boolean, default: false },
        quizDone: { type: Boolean, default: false }
    },
    melody: {
        attempts: { type: Number, default: 0 },
        correct: { type: Number, default: 0 },
        wrong: { type: Number, default: 0 },
        introDone: { type: Boolean, default: false },
        practiceDone: { type: Boolean, default: false },
        quizDone: { type: Boolean, default: false }
    }
})

UserSchema.plugin(uniqueValidator);

//before saving the user's password to the db, hash it
UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

//this function determines whether an entered password is correct
UserSchema.methods.comparePassword = function (plaintext, cb) {
    return cb(null, bcrypt.compareSync(plaintext, this.password))
};

const User = mongoose.model('User', UserSchema);

module.exports = User;