import React, { Component } from 'react';
import * as firebase from "firebase";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: {}
    }
    this.pickRandom = this.pickRandom.bind(this);
    this.getRestaurant = this.getRestaurant.bind(this);
  }
  pickRandom(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
      if (Math.random() < 1/++count) result = prop;
    return result;
  }
  componentDidMount() {
    this.setState({ref: firebase.database().ref().child("restaurants")},this.getRestaurant);
  }
  getRestaurant() {
    this.state.ref.on("value", snap => {
      let random = this.pickRandom(snap.val())
      this.setState({restaurant: snap.val()[random]});
    });
  }
  render() {
    return (
      <article>
        <p>{this.state.restaurant.name}</p>
        <p>{this.state.restaurant.price}</p>
        <p>{this.state.restaurant.cuisine}</p>
        <p>{this.state.restaurant.address}</p>
        <button onClick={this.getRestaurant}>
          dá-me outro!
        </button>
        <br />
        <button onClick={this.props.handleOpenForm.bind(this)}>Adicionar</button>
      </article>
    )
  }
}

export default Details;
