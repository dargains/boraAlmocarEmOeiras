import React, { Component } from 'react';
import './css/reset.css';
import './css/config.css';
import './css/skeleton.css';
import './css/components.css';
import logo from "./images/logo.svg";

// import List from "./Components/List";
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
          <img alt="bora almoçar em oeiras" src={logo}/>
        </header>
        <div className="wrapper">
          {/* <List /> */}

          {this.state.showForm ? <Form handleCloseForm={this.toggleForm.bind(this)}/> : <Details handleOpenForm={this.toggleForm.bind(this)}/>}

        </div>
      </main>
    );
  }
}

export default App;
