import React, { Component } from 'react';

import '../css/details.css';
import loadMore from "../images/load.svg"

class Details extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: {},
      apiKey: "AIzaSyDEQF3dDCm2d5CK-1SKvvHAH9TbLp5gkRU"
    }
    this.getRestaurant = this.getRestaurant.bind(this);
  }
  componentDidMount() {
    this.getRestaurant();
  }
  handleMoreClick(event) {
    let target = event.currentTarget;
    target.classList.add("bounce");
    setTimeout(() => {
      target.classList.remove("bounce");
    },1000);
    this.getRestaurant();
  }
  getRestaurant() {
    let container = document.querySelector(".details__container");
    container.style.opacity = 0;
    setTimeout(() => {
      this.props.db.get().then((snap) => {
        var arr = [];
        snap.forEach((doc) => {
          arr.push(doc)
        });
        var rand = arr[Math.floor(Math.random() * arr.length)];
        this.setState({restaurant: rand.data()});
        container.style.opacity = 1;
      });
    },200)
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
        <button className="simpleButton" onClick={this.props.handleOpenForm.bind(this)}>Adicionar</button>
      </article>
    )
  }
}

export default Details;
