import React, {Component} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "../css/form.css";

import close from "../images/close.svg";

import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';

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
  validateForm(event) {
    event.preventDefault();
    let data = this.state,
        name = data.name,
        cuisine = data.cuisine,
        price = data.price,
        address = data.address;
    let result = true;
    if (name === "") {
      document.getElementById('name').closest(".textInput").classList.add("error");
      toast.error("Falta o nome");
      result = false;
    }
    if (cuisine === "") {
      document.getElementById('cuisine').closest(".textInput").classList.add("error");
      toast.error("Falta a cozinha");
      result = false;
    }
    if (price === 0) {
      document.getElementById('price').closest(".selectInput").classList.add("error");
      toast.error("Falta o preço");
      result = false;
    }
    if (address === "") {
      document.getElementById('address').closest(".textInput").classList.add("error");
      toast.error("Falta a morada");
      result = false;
    }
    result && this.submitForm({name, cuisine, price, address});
  }
  submitForm(values) {
    var that = this;
    let formStyle = document.getElementById("fieldset").style
    formStyle.cssText = "pointer-events:null;opacity:.5";
    this.props.db.add(values)
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          toast.success("Restaurante adicionado");
          setTimeout(() => {
            formStyle.cssText = "pointer-events:all;opacity:1";
            that.props.handleCloseForm()

          },2000)
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
          toast.error("Restaurante não adicionado");
      });
  }
  handleInputChange = name => event => {
    this.setState({[name]: event.target.value});
  }
  handleSelectChange = event => {
    document.getElementById('price').closest(".selectInput").classList.remove("error");
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <form>
        <fieldset id="fieldset">
          <div className="img">
            <img src={close} alt="fechar" onClick={this.props.handleCloseForm.bind(this)} />
          </div>
          <h2>Novo restaurante</h2>
          <FormControl className="formControl">
            <TextField id="name" label="Nome" className="textInput" value={this.state.name} onClick={event => {event.target.closest(".textInput").classList.remove("error")}} onChange={this.handleInputChange('name')} />
          </FormControl>
          <FormControl className="formControl">
            <TextField id="cuisine" label="Cozinha" className="textInput" value={this.state.cuisine} onClick={event => {event.target.closest(".textInput").classList.remove("error")}} onChange={this.handleInputChange('cuisine')} />
          </FormControl>
          <FormControl className="formControl selectInput">
            <InputLabel htmlFor="price">Preço</InputLabel>
            <Select
              value={this.state.price}
              onChange={this.handleSelectChange}
              inputProps={{
                name: 'price',
                id: "price"
              }}
            >
              <MenuItem value={1}>Praticamente de graça</MenuItem>
              <MenuItem value={2}>A conta não assusta</MenuItem>
              <MenuItem value={3}>Só uma vez por mês</MenuItem>
              <MenuItem value={4}>Aniversário de casamento</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="formControl">
            <TextField id="address" label="Endereço" className="textInput" value={this.state.address} onClick={event => {event.target.closest(".textInput").classList.remove("error")}} onChange={this.handleInputChange('address')} />
          </FormControl>
          <div className="buttonField">
            <button className="simpleButton" onClick={this.validateForm.bind(this)}>Adicionar</button>
          </div>
        </fieldset>
        <ToastContainer pauseOnHover={false} hideProgressBar={true} autoClose={2000}/>
      </form>
    )
  }
}

export default Form;
