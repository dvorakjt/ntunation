# Ntunation
![Screenshot of app](./assets/screenshots/screen-1.png)
Ntunation is an intonation-focused aural-training application for musicians. Users can login to a dashboard, where they are presented with exercises that quiz their ability to hear discrepancies in pitch. There are various categories, including unisons, octaves, scales, and more. Please view the deployed application [here]((http://www.ntunation.com/))!
## Table of Contents

[Introduction](#introduction)  
[Login](#login)  
[Dependencies](#dependencies)
[The Code](#the-code)
[Usage](#usage)  
[Contributing](#contributing)
[Acknowledgements](#acknowledgements)
[About the Author](#about-the-author)  

## Introduction

![GitHub language count](https://img.shields.io/github/languages/count/dvorakjt/geneREADME) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dvorakjt/geneREADME) ![GitHub repo size](https://img.shields.io/github/repo-size/dvorakjt/geneREADME)


Ntunation is designed to fill a gap in aural training applications. Most of these applications focus on identifying different intervals, scales or chords, or dictating melodies. Few, if any, are focused solely on listening for discrepancies in pitch. The goal of this application is therefore to provide musicians with a medium away from their instrument in which to focus on training their ears to listen for out-of-tune pitches.  

The application is a full-stack MERN application: an express server connects a mongoDb database in the backend to a React front end. Node is used to install the many npm packages on which the application depends.
## Login

If you would like to test the application, please feel free to create your own credentials, or use the following:
login: testuser@ntunation.com
password: password1234

## Dependencies

Mongoose
Mongoose-Unique-Validator
Bcrypt-nodejs
Passport.js
Passport-jwt
Express.js
React
React-Router-Dom
React-Bootstrap
Tone.js
Abcjs
React-Chart.js-2
Chart.js
Axios

## The Code
### How it works - Backend:
An Express server connects to a MongoDb database. The database contains user information, and the server requires in API routes which update the database via Mongoose. API routes are protected using passport.js. When a username is first created, their password is hashed using Bcrypt using a pre-save hook in the Mongoose model. Then, when the user attempts to login (which happens automatically upon sign up by calling a second post route immediately after the sign up route), the password provided by the user is hashed and compared to the hashed password stored in the database. If they match, a JSON Web Token is generated and stored in localStorage. Every time a protected route is called by the client, this token is provided in the headers of the request. 

Besides containing login information, the user model contains records for every question category that the user is presented with. When a user answers a question in the frontend, the "api/exercises" put route in called, and the user's records are updated in the database. 
### How it works - Frontend:
If the user is not logged in, they can view a homepage from which they are able to create an account (accomplished via the SignUpCard component, which uses the API Util to make post requests to the backend), login (via the TopNav component which also makes post requests to the backend), or attempt some sample exercises.

Sample exercises are displayed using a generic modal component called 'ModalPrefab.' This component displays a modal with a title, but leaves the body and footer up to its child components to display. This allows the same modal to stay open while the user cycles through questions, while the content changes depending on the question. 

The child components vary depending on the type of questions. There are three main types of questions: Two Notes, Chords, and Melody. Two notes cards (used for unisons, octaves and melodic intervals) display two separate note cards, and may display either 'Sharp' and 'Flat buttons', or a slider on the second note card together with a 'Submit' button in the footer. Chord question cards (used for harmonic intervals and chords) display a chord card (which always has a slider and a 'Submit' button), while Melody question cards (used for scales and melodies), display a melody card.

The question cards subsribe to a global AnswerStore. When a new question is begun, the AnswerStore's correctAnswer value is updated to reflect the current question's answer field. When the user submits an answer from the question card, this value is checked against the current correct answer. Depending on whether the answers match the state of the question card is updated from 0 (unanswered - displays question information) to either 1 (correct - displays the message 'correct' with a link to the next question), or 2 (incorrect, displays an incorrect message with a link to the next question, and - if logged out - a try again option). 

#### Note Cards
Note cards are one of the most intricate components in the application. Note cards take in certain information, and return a card which features the note name, music notation for the note, playback buttons, and in some cases a pitch slider for adjusting the pitch. 

The information that Note Cards take in as props is as follows:
- noteCardKey - the value to set the component's key to
- pitch - frequency in hertz (used for playback, pitch adjustments)
- slider - boolean. Should the card have a pitch slider?
- sliderMin - the lowest value (in cents) that the slider can be adjusted to
- sliderMax - the highest value (in cents) that the slider can be adjusted to
- sliderStep - the step (in cents) by which the slider can move (allows for precise answer input)
- headerText - the text to display above the music notation (for instance, 'Note 1: C4'
- noteName - the name of the note in ABC notation. (see [this](http://abcnotation.com/blog/2010/01/31/how-to-understand-abc-the-basics/) for more info)
- clef - lowercase name of the clef to display
- keySig - key signature to display, for instance 'C' or 'F'

The Note Card uses the NPM package react-abcjs (which in turn uses Abcjs) to display the note using abc notation. Tone,js handles the note playback. The pitch slider adjusts the pitch by multiplying the original pitch value by 2​ to the power of n⁄1200, where n is the adjustment to the pitch (the value of the slider) in cents. Adjusting the slider (if present) also updates the user's current answer. 

#### Melody Cards

Melody cards are similar to note cards, although instead of one pitch, they take in an array of notes. Each note has a pitch, a name (used for abc notation), a dispName (name displayed to the user), a dur and a time. Duration is the Tone.js duration for the note (for instance '4n' means a quarter note), while time is the time along the Tone.js timeline to schedule the note playback. Including dur and time allows a play button to play all of the pitches in a row, at the correct time. Melodies also generate an array of buttons containing each pitch, allowing the user to play back one pitch at a time, and at the same time selecting that pitch as the user's answer.

#### Chord Cards

Chord cards generate what are essentially 2 note cards. They an array of pitches rather than just one, and create one tone object for each. This allows one note of the chord to be adjusted while the other two continue to play. Chord cards also accept abcjs chord notation in order to display the notes of the chord correctly. Chord cards always come with a slider on the second note card they generate, which houses the pitch that the user is able to change.

#### Sample Questions
The same questions are drawn from JSON file that contains information necessary for each question type. React-Router is used to cycle through the questions. The 'Next Question' button links to sampleexercises/:category, where category is the category of the next question.

#### Logging In
Once the user logs in, they are redirected to a dashboard page that replaces the homepage. This is accomplished by setting up a global UserStore file. The UserStore Provider is located in the App.js file, and encapsulates a ClientRouter file, which hooks into this global store, and uses React-Router-Dom to send the user to either the homepage if logged out, or the dashboard page if logged in. The current user's information is saved to localStorage. Upon refresh, the homepage looks for this info, and if it finds it, the user is logged in.

#### Question Randomizers
When the user is logged in, questions are generated randomly, based on their pitch settings (A=440hz or A=442hz) and their chosen difficulty (1 for easy, 2 for medium, 3 for difficult). This is accomplished by several files located in the client/src/Data directory and in the client/src/Utils directory. In the Data directory are two JSON files that I generated using another project of mine (this will be uploaded to Github soon and linked here), which contain information for notes from C0 to B8. There is one file corresponding to A=440 and another corresponding to A=442. Each note in the array consists of an object which contains the following information: the note's pitch in hertz, the note's abcjs name and the note's name to display to the user (for instance C#4 or Bb7).

These files are required into each exercise randomizer, located in client/src/Utils/Randomizers. These randomizers also import the selectRange function from ../PitchNarrower/pitchNarrower.js. This function allows the range to be collapsed depending on the difficulty. In each randomizer, the pitch is narrowed, and then the index of middle C is determined (this allows clefs to be specified depending on whether the note is at or above middle C or below it). 

Depending on the user's difficulty, the step is also adjusted. The step is the smallest number of cents that the pitch can be modified by. Finally, an array of 10 questions is generated. For instance, when 10 unison questions are generated, for each one:
- The starting note is randomized
- The step is randomized within the difficulty-determined range
- The adjustment is randomized
- The question type is randomized (slider or 'sharp or flat')
- The step and adjustment are then multiplied and used to determine the actual pitch of the second note

Each randomizer is imported into the ExerciseRandomizer which uses a switch statement to decide which category to generate. This ExerciseRandomizer is used in the Dashboard.js file and invoked when a 'Quiz' link is clicked. 
#### Progress Charts
When a user answers a question, their record in the database is updated with the result. The current user state is also updated to reflect the result. The user state is fed into doughnut charts for each which display correct and incorrect answers. These charts are created using React-Chartjs-2 (which itself uses Chart.js).

#### Logging out
When the user logs out, the user information and token are removed from localStorage, the userState is reset, and the user is redirected to the homepage.
## Usage
In its current incarnation, the app still requires more testing by musicians to confirm its accuracy. While I have double-checked the math, and tested it myself, there may be instances in which musicians' ears determine that pitches for certain intervals/categories need to be adjusted. 

Unisons, octaves and scales are the easiest place to start. Chords are approachable as well (listen for the 'beating' of clashing frequencies to subside to determine if the chord is in tune). Having a keyboard or online piano tuned to your pitch setting at hand can assist users with equal temperament interval comparison in the beginning, but be aware that just temperament intervals are based off of ratios and will therefore not match the same interval on the piano. 
## Contributing

If you notice any errors in the code, please create a Github issue. 

## Acknowledgements 
Hero image by Gary Wibowo on Unsplash.

Thank you to all those along the way who taught, encouraged, corrected, motivated, inspired, and most of all, supported me. 

## About the Author

Joe Dvorak

![your github profile pic](https://avatars3.githubusercontent.com/u/61166366?v=4
Github: dvorakjt

Github repository: [github.com/dvorakjt](https://github.com/dvorakjt/)

Portfolio: [dvorakjt.github.io/](https://userName.github.io/)  

  
Written with [StackEdit](https://stackedit.io/). Badges provided through shields.io.