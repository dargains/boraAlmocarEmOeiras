import React, {Component} from 'react';
import ReactGA from 'react-ga';
import { ToastContainer, toast } from 'react-toastify';
import "../css/form.css";

import close from "../images/close.svg";

import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import {MenuItem} from 'material-ui/Menu';
import {InputLabel} from 'material-ui/Input';
import {FormLabel, FormControl, FormGroup, FormControlLabel} from 'material-ui/Form';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      cuisine: "",
      price: 0,
      ticket: false,
      address: "",
      weekdays: [false,false,false,false,false]
    }
  }
  validateForm(event) {
    event.preventDefault();
    let data = this.state,
        name = data.name,
        cuisine = data.cuisine,
        price = data.price,
        ticket = data.ticket,
        address = data.address,
        weekdays = data.weekdays;
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
    this.props.db.get().then((snap) => {
      var arr = [];
      snap.forEach((doc) => {
        arr.push(doc.data())
      });
      arr.forEach(rest => {
        if (rest.name === name) {
          result = false;
          toast.error("Restaurante já existe");
        }
      });
      result && this.submitForm({name, cuisine, price, ticket, address, weekdays});
    });
  }
  submitForm(values) {
    ReactGA.event({
      category: 'Uso',
      action: 'submit',
      label: 'Adicionou restaurante'
    });
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
          formStyle.cssText = "pointer-events:all;opacity:1";
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
  }
  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  }
  handleWeekChange = name => event => {
    const newWeek = this.state.weekdays;
    newWeek[name] = !event.target.checked;
    this.setState({weekdays: newWeek});
  }
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
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.ticket}
                onChange={this.handleCheckChange('ticket')}
                value="ticket"
              />
            }
            label="Aceita Ticket"
          />
          <FormControl className="formControl">
            <TextField id="address" label="Morada" className="textInput" value={this.state.address} onClick={event => {event.target.closest(".textInput").classList.remove("error")}} onChange={this.handleInputChange('address')} />
          </FormControl>
          <FormGroup row>
            <FormLabel component="legend">Dias fechados</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.weekdays[0]}
                  onChange={this.handleWeekChange('0')}
                  value="0"
                />
              }
              className="checkbox"
              label="Segunda"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.weekdays[1]}
                  onChange={this.handleWeekChange('1')}
                  value="1"
                />
              }
              className="checkbox"
              label="Terça"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.weekdays[2]}
                  onChange={this.handleWeekChange('2')}
                  value="2"
                />
              }
              className="checkbox"
              label="Quarta"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.weekdays[3]}
                  onChange={this.handleWeekChange('3')}
                  value="3"
                />
              }
              className="checkbox"
              label="Quinta"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.weekdays[4]}
                  onChange={this.handleWeekChange('4')}
                  value="4"
                />
              }
              className="checkbox"
              label="Sexta"
            />
          </FormGroup>
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
