import React, { Component } from 'react';
import './App.css';
import * as firebase from "firebase";

import List from "./Components/List";
import Details from "./Components/Details";
import Form from "./Components/Form";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    }
  }
  toggleForm() {
    this.setState({showForm: !this.state.showForm});
  }
  render() {
    return (
      <main>
        <header className="header">
          <h1 className="header__title">Bora Almoçar em Oeiras</h1>
        </header>
        <div className="wrapper">
          <List />

          {this.state.showForm ? <Form handleCloseForm={this.toggleForm.bind(this)}/> : <Details handleOpenForm={this.toggleForm.bind(this)}/>}

        </div>
      </main>
    );
  }
}

export default App;
