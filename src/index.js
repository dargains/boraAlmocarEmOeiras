import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyDjEf0thjCR7FKg_NIabIrNjggb0_5NwPs",
    authDomain: "bora-almocar-em-oeiras.firebaseapp.com",
    databaseURL: "https://bora-almocar-em-oeiras.firebaseio.com",
    projectId: "bora-almocar-em-oeiras",
    storageBucket: "bora-almocar-em-oeiras.appspot.com",
    messagingSenderId: "1061964015752"
  };
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
