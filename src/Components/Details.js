import React, { Component } from 'react';
import * as firebase from "firebase";
import Axios from "axios";

import Map from "./Map";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
      apiKey: "AIzaSyDEQF3dDCm2d5CK-1SKvvHAH9TbLp5gkRU"
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
      this.setState({restaurant: snap.val()[random]},this.getCoordinates);
    });
  }
  getCoordinates() {
    Axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.restaurant.address.replace(" ","+") + "&key=" + this.state.apiKey)
      .then(response => {
        let location = response.data.results[0].geometry.location;
        this.setState({location});
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    return (
      <article className="details">
        <p className="details__name">{this.state.restaurant.name}</p>
        <p className="details__price">{this.state.restaurant.price}</p>
        <p className="details__cuisine">{this.state.restaurant.cuisine}</p>
        {this.state.restaurant.address &&
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.state.apiKey}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            location={this.state.location}
            ref="map"
          />
        }
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
