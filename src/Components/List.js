import React, { Component } from 'react';

class List extends Component {
  constructor() {
    super();
    this.state = {
      restaurants: {}
    }
  }
  componentDidMount() {
    this.props.db.get().then((snap) => {
      var arr = [];
      snap.forEach((doc) => {
        arr.push(doc.data())
      });
      this.setState({
        restaurants: arr
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
