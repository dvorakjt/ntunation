import React from 'react';
import logo from './logo.svg';
import './App.css';
//Import bootstrap css file
import 'bootstrap/dist/css/bootstrap.min.css';
//Import answerStore provider
import { AnswerStoreProvider } from './Utils/AnswerStore';
import { UserStoreProvider } from './Utils/UserStore';
//import client side router
import ClientRouter from './Components/ClientRouter/ClientRouter';

function App() {
  return (
    <UserStoreProvider >
      <AnswerStoreProvider>
        <div className="App">
          <ClientRouter />
        </div>
      </AnswerStoreProvider>
    </UserStoreProvider>
  );
}

export default App;
