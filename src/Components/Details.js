import React, { Component } from 'react';
import ReactGA from 'react-ga';

import '../css/details.css';
import loadMore from "../images/load.svg"

class Details extends Component {
  constructor() {
    super();
    this.state = {
      restaurantList: [],
      restaurant: {},
      lastResults: []
    }
  }
  componentDidMount() {
    this.props.db.get().then((snap) => {
      var arr = [];
      snap.forEach((doc) => {
        arr.push(doc.data())
      });
      this.setState({restaurantList: arr},this.getRestaurant);
    });
  }
  handleMoreClick(event) {
    ReactGA.event({
      category: 'Uso',
      action: 'click',
      label: 'Dá-me outro'
    });
    let target = event.currentTarget;
    target.classList.add("bounce");
    setTimeout(() => {
      target.classList.remove("bounce");
    },1000);
    this.getRestaurant();
  }
  getRestaurant() {
    let container = document.querySelector(".details__container");
    let lastResults = this.state.lastResults;
    let restaurantList = this.state.restaurantList;
    container.style.opacity = 0;
    let random;
    do {
      random = Math.floor(Math.random() * restaurantList.length);
    } while (lastResults.includes(random));
    if (lastResults.length < 3) lastResults.push(random)
    else {
      lastResults.shift();
      lastResults.push(random);
    }
    setTimeout(() => {
      this.setState({restaurant: this.state.restaurantList[random], lastResults});
      container.style.opacity = 1;
    },200);
  }
  render() {
    return (
      <article className="details">
        <div className="details__container">
          <p className="details__name">{this.state.restaurant.name}</p>
          <div className="dash" />
          <p className="details__cuisine">Cozinha {this.state.restaurant.cuisine}</p>
          {
            this.state.restaurant.address &&
            <a href={`https://www.google.com/maps/dir/?api=1&destination=${this.state.restaurant.address.replace(/ /g, "+")}`} className="details__link">Google Maps</a>
          }
          <p className="details__price" data-price={this.state.restaurant.price}></p>
          <div className="dash" />
        </div>
        <button className="moreButton" onClick={this.handleMoreClick.bind(this)}>
          <img alt="carregar outro" src={loadMore}/>
        </button>
        <br />
        {
          navigator.onLine &&
          <button className="simpleButton" onClick={this.props.handleOpenForm.bind(this)}>Adicionar</button>
        }
      </article>
    )
  }
}

export default Details;
