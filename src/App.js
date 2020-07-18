import React from 'react';
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
//Import bootstrap css file
import 'bootstrap/dist/css/bootstrap.min.css';
//Import answerStore provider
import { AnswerStoreProvider } from './Utils/AnswerStore';

//Import custom pages
import Homepage from './Pages/Homepage/Homepage';
import SampleExercises from './Pages/SampleExercises/SampleExercises'

//Import components
import ModalPrefab from './Components/Modal/Modal';

function App() {
  return (
    <Router>
      <AnswerStoreProvider>
        <div className="App">
          <Route exact path="/" component={Homepage} />
          <Route path="/sampleexercises/:exercise" children={<Exercises />} />
        </div>
      </AnswerStoreProvider>
    </Router>
  );
}

function Exercises() {
  let { exercise } = useParams();
  return (
    <SampleExercises exercise={exercise} />
  )
}

export default App;
