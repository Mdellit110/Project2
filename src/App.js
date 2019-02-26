import React, { Component } from 'react';
import './App.css';
import RenderMap from './components/RenderMap';
import CalcDriving from './components/CalcDriving';
import CalcWalking from './components/CalcWalking';
import DestinationForm from './components/DestinationForm'

import {GoogleApiWrapper} from "google-maps-react"

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      destination: '',
      getResults: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  reset() {
    const { destination, getResults } = this.state;
    this.setState({
      destination: '',
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.setState({
      getResults: true
    })
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Walk or Cab</h1>
        <DestinationForm maps={this.props} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
          <CalcWalking
            getResults={this.state.getResults}
            destination={this.state.destination}
            maps={this.props}/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(App);
