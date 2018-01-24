import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      speed: 10
    }
  }
  componentDidMount() {
    const rootRef = firebase.database().ref();
    const speedRef = rootRef.child("speed");
    speedRef.on("value", snap => {
      this.setState({
        speed: snap.val()
      });
    });
  }
  render() {
    return (
      <main>
        <header className="header">
          <h1 className="header__title">Bora Almoçar em Oeiras</h1>
        </header>
        <p>
          speed: {this.state.speed}
        </p>
      </main>
    );
  }
}

export default App;
