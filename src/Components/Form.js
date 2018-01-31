import React, { Component } from 'react';
import * as firebase from "firebase";
import "../css/form.css";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      cuisine: "",
      price: 0,
      address: ""
    }
  }
  componentDidMount() {
    this.setState({ref: firebase.database().ref().child("restaurants")});
  }
  submitForm() {
    let data = this.state,
        name = data.name,
        cuisine = data.cuisine,
        price = data.price,
        address = data.address;
    this.state.ref.push({name,cuisine,price,address});
  }
  handleChange(event) {
    this.setState({price: event.target.value},console.log(this.state.price));
  }
  renderInput = (label, type, name, value='') =>
    <label>{label}: <input onChange={({target}) => this.setState({[name]: target.value})} name={name} type={type} value={this.state[name] || value}/></label>;
  render() {
    return (
      <form>
        <fieldset>
          {this.renderInput("Nome","text", "name")}
          <br /><br />
          {this.renderInput("Cozinha","text", "cuisine")}
          <br /><br />

          <label>Preço:
            <select id="price" value={this.state.price} onChange={this.handleChange.bind(this)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </label>

          <br /><br />
          {this.renderInput("Morada","text", "address")}
          <br /><br />

          <button onClick={this.submitForm.bind(this)}>Adicionar</button>
          <button onClick={this.props.handleCloseForm.bind(this)}>Fechar</button>
        </fieldset>
      </form>
    )
  }
}

export default Form;
