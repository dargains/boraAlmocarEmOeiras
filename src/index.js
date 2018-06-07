import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-113658612-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

var config = {
    apiKey: "AIzaSyDjEf0thjCR7FKg_NIabIrNjggb0_5NwPs",
    authDomain: "bora-almocar-em-oeiras.firebaseapp.com",
    databaseURL: "https://bora-almocar-em-oeiras.firebaseio.com",
    projectId: "bora-almocar-em-oeiras",
    storageBucket: "bora-almocar-em-oeiras.appspot.com",
    messagingSenderId: "1061964015752"
};
firebase.initializeApp(config);
var db = firebase.firestore();
firebase.firestore().enablePersistence()
  .then(function() {
    // Initialize Cloud Firestore through firebase
    db = firebase.firestore();
    ReactDOM.render(<App db={db}/>, document.getElementById('aeo'));
})
.catch(function(err) {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code === 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    db = firebase.firestore();
    ReactDOM.render(<App db={db}/>, document.getElementById('aeo'));
  }
});

if (window.navigator.standalone) document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no');

registerServiceWorker();
