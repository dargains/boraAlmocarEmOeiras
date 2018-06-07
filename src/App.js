import React, { Component } from 'react';
import './css/reset.css';
import './css/config.css';
import './css/skeleton.css';
import './css/components.css';

import AsyncComp from "./Components/AsyncComp";
const Details = AsyncComp(() => import("./Components/Details"));
const Form = AsyncComp(() => import("./Components/Form"));
// const List = AsyncComp(() => import("./Components/List"));

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
    const db = this.props.db;
    return (
      <div className="wrapper">

        {/* <List db={db.collection("restaurants")}/> */}

        {
          this.state.showForm
            ? <Form handleCloseForm={this.toggleForm.bind(this)} db={db.collection("restaurants")}/>
            : <Details handleOpenForm={this.toggleForm.bind(this)} db={db.collection("restaurants")}/>
        }

      </div>
    );
  }
}

export default App;
