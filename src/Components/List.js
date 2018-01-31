import React, { Component } from 'react';
import * as firebase from "firebase";

class List extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: {}
    }
  }
  componentDidMount() {
    const restRef = firebase.database().ref().child("restaurants");
    restRef.on("value", snap => {
      this.setState({
        restaurants: snap.val()
      });
    });
  }
  render() {
    return (
      <div>
        <p>Lista de restaurantes</p>
        <ul>
          {Object.keys(this.state.restaurants).map(restaurant => <li key={restaurant}>{this.state.restaurants[restaurant].name}</li>)}
        </ul>
      </div>
    )
  }
}

export default List;
