import React from 'react';
import logo from './logo.svg';
import './App.css';
//Import bootstrap css file
import 'bootstrap/dist/css/bootstrap.min.css';
//Import answerStore provider
import { AnswerStoreProvider } from './Utils/AnswerStore';

//Import custom pages
import Homepage from './Pages/Homepage/Homepage';
import SampleExercises from './Pages/SampleExercises/SampleExercises'

function App() {
  return (
    <AnswerStoreProvider>
      <div className="App">
        <SampleExercises />
      </div>
    </AnswerStoreProvider>
  );
}

export default App;
