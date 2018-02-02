import React, {Component} from 'react';
import * as firebase from "firebase";
import "../css/form.css";

import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import {MenuItem} from 'material-ui/Menu';
import {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  root: {
    background: "black"
  },
  input: {
    color: "white"
  }
});

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
  validateForm() {
    
    submitForm();
  }
  submitForm() {
    let data = this.state,
      name = data.name,
      cuisine = data.cuisine,
      price = data.price,
      address = data.address;
    this.state.ref.push({name, cuisine, price, address});
  }
  handleInputChange = name => event => {
    this.setState({[name]: event.target.value});
  }
  handleSelectChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <MuiThemeProvider theme={theme}>

      <form>
      <fieldset>
        <FormControl className="formControl">
          <TextField id="name" label="Nome" className="textInput" value={this.state.name} onChange={this.handleInputChange('name')} />
        </FormControl>
        <FormControl className="formControl">
          <TextField id="cuisine" label="Cozinha" className="textInput" value={this.state.cuisine} onChange={this.handleInputChange('cuisine')} />
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
            <MenuItem value={1}>Barato como a merda</MenuItem>
            <MenuItem value={2}>Castiço de bolso</MenuItem>
            <MenuItem value={3}>Só uma vez por mês</MenuItem>
            <MenuItem value={4}>Caro como a merda</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="formControl">
          <TextField id="address" label="Endereço" className="textInput error" value={this.state.address} onChange={this.handleInputChange('address')} />
        </FormControl>
        <div className="buttonField">
          <button className="simpleButton" onClick={this.validateForm.bind(this)}>Adicionar</button>
          <button className="simpleButton" onClick={this.props.handleCloseForm.bind(this)}>Fechar</button>
        </div>
      </fieldset>
    </form>
  </MuiThemeProvider>
)
  }
}

export default Form;
