import React, { Component } from 'react';
import './App.css';
import RenderMap from './components/RenderMap';
import CalculateDistance from './components/CalculateDistance';
import {GoogleApiWrapper} from "google-maps-react"

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      dist: {}
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Walk or Cab</h1>
        <RenderMap maps={this.props}/>
        <CalculateDistance maps={this.props}/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(App);
