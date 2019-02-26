import React, { Component } from 'react';
import './App.css';
import RenderMap from './components/RenderMap';
import CalcTravel from './components/CalcTravel';
import DestinationForm from './components/DestinationForm';
import { Redirect, Route } from 'react-router-dom';
import {GoogleApiWrapper} from "google-maps-react"

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      getWalk: false,
      getDrive: false,
      displayResults: false,
      walkData: {
        origins: ['Bellmore, NewYork'],
        destinations: [],
        travelMode: 'WALKING',
        unitSystem: props.google.maps.UnitSystem.IMPERIAL,
      },
      driveData: {
        origins: ['Bellmore, NewYork'],
        destinations: [],
        travelMode: 'DRIVING',
        unitSystem: props.google.maps.UnitSystem.IMPERIAL,
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.reset = this.reset.bind(this)
  }

  reset() {
    this.setState({
      getWalk: false,
      getDrive: false,
      displayResults: false
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.setState({
      getWalk: true,
      getDrive: true,
      displayResults: true
    })

  }

  handleChange(ev) {
    const { value } = ev.target;
    this.setState({
      walkData: {
        origins: ['Bellmore, NewYork'],
        destinations: [`${value}`],
        travelMode: 'WALKING',
        unitSystem: this.props.google.maps.UnitSystem.IMPERIAL,
      },
      driveData: {
        origins: ['Bellmore, NewYork'],
        destinations: [`${value}`],
        travelMode: 'DRIVING',
        unitSystem: this.props.google.maps.UnitSystem.IMPERIAL,
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Walk or Cab</h1>
        <Route path='/' render={(props) =>
        <DestinationForm
          maps={this.props}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}/>
        }/>
        <Route exact path="/" render={() => (
          (this.state.displayResults === true)? (
            <Redirect push to="/results"/>
          ) : (
            <div></div>
          )
        )}/>
      <Route path='/results' render={()=>
        <>
          <CalcTravel
            getResults={this.state.getWalk}
            travelData={this.state.walkData}
            moveType='walk'
            maps={this.props}
            reset={this.reset}/>
          <CalcTravel
            getResults={this.state.getDrive}
            travelData={this.state.driveData}
            moveType='drive'
            maps={this.props}
            reset={this.reset}/>
        </>
      }/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(App);
