import React, {Component} from 'react';
import ReactGA from 'react-ga';

import '../css/details.css';
import loadMore from "../images/load.svg"
import location from "../images/location.svg"
import logoTop from "../images/logo-top.svg"
import logoBottom from "../images/logo-bottom.svg"
import ticket from "../images/ticket.png"

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
      this.setState({
        restaurantList: arr
      }, this.getRestaurant);
    });
  }
  handleMoreClick(event) {
    ReactGA.event({category: 'Uso', action: 'click', label: 'Dá-me outro'});
    let target = event.currentTarget;
    target.classList.add("bounce");
    setTimeout(() => {
      target.classList.remove("bounce");
    }, 1000);
    this.getRestaurant();
  }
  getRestaurant() {
    const header = document.querySelector(".details__header");

    const lastResults = this.state.lastResults;
    const restaurantList = this.state.restaurantList;

    header.classList.add("loading");
    setTimeout(() => {
    },200)
    let random;
    do {
      random = Math.floor(Math.random() * restaurantList.length);
    } while (lastResults.includes(random));
    if (lastResults.length < 3)
      lastResults.push(random)
    else {
      lastResults.shift();
      lastResults.push(random);
    }
    setTimeout(() => {
      this.setState({restaurant: this.state.restaurantList[random], lastResults});
      header.classList.remove("loading");
    }, 800);
  }
  render() {
    return (
      <article className="details">
        <div className="details__header">
          <img src={logoTop} alt="almoçar em oeiras"/>
          <div className="details__title">
            <p className="details__name">{this.state.restaurant.name}</p>
            <p className="details__cuisine">{this.state.restaurant.cuisine}</p>
          </div>
          <img src={logoBottom} alt="almoçar em oeiras"/>
        </div>
        <div className="details__info">
          <figure>
            <img src={ticket} alt="Aceita ticket"/>
          </figure>
          <p className="details__price" data-price={this.state.restaurant.price}>€</p>
          {
            this.state.restaurant.address && <a href={`https://www.google.com/maps/dir/?api=1&destination=${this.state.restaurant.address.replace(/ /g, "+")}`} className="details__location">
                <span>como chegar</span>
                <img src={location} alt="como chegar"/>
              </a>
          }
          {navigator.onLine && <button className="simpleButton" onClick={this.props.handleOpenForm.bind(this)}>Adicionar</button>}
        </div>
        <div className="details__buttonContainer">
          <button className="moreButton" onClick={this.handleMoreClick.bind(this)}>
            <img alt="carregar outro" src={loadMore}/>
          </button>
        </div>
      </article>
    )
  }
}

export default Details;
