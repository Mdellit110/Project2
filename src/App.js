import React, { Component } from 'react';
import './App.css';
import RenderMap from './components/RenderMap';
import CalcTravel from './components/CalcTravel';
import DestinationForm from './components/DestinationForm';
import DisplayResults from './components/DisplayResults';
import CalcBestRoute from './components/CalcBestRoute';
import { Redirect, Route } from 'react-router-dom';
import {GoogleApiWrapper} from "google-maps-react";

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      getWalk: false,
      getDrive: false,
      displayResults: false,
      currentLocation: '',
      walkCalcs: {},
      driveCalcs: {},
      walkData: {
        origins: [],
        destinations: [],
        travelMode: 'WALKING',
        unitSystem: props.google.maps.UnitSystem.IMPERIAL,
      },
      driveData: {
        origins: [],
        destinations: [],
        travelMode: 'DRIVING',
        unitSystem: props.google.maps.UnitSystem.IMPERIAL,
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setWalk = this.setWalk.bind(this)
    this.setDrive = this.setDrive.bind(this)
    this.reset = this.reset.bind(this)
  }

  reset() {
    this.setState({
      getWalk: false,
      getDrive: false,
      displayResults: true,
    })
  }

  setWalk(walkCalcs) {
    this.setState({
      walkCalcs: walkCalcs
    })
  }

  setDrive(driveCalcs) {
    this.setState({
      driveCalcs: driveCalcs,
    })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.setState({
      getWalk: true,
      getDrive: true,
      displayResults: false
    })

  }

  handleChange(ev) {
    const { value } = ev.target;
    this.setState({
      walkData: {
        origins: [`${this.state.currentLocation}`],
        destinations: [`${value}`],
        travelMode: 'WALKING',
        unitSystem: this.props.google.maps.UnitSystem.IMPERIAL,
      },
      driveData: {
        origins: [`${this.state.currentLocation}`],
        destinations: [`${value}`],
        travelMode: 'DRIVING',
        unitSystem: this.props.google.maps.UnitSystem.IMPERIAL,
      }
    })
  }

  componentDidMount() {
    navigator.geolocation.watchPosition((position) => {
      this.setState({
        currentLocation: `${position.coords.latitude}, ${position.coords.longitude}`
      })
    })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1 className='title'>WALK or DRIVE</h1>
        </header>
        <CalcTravel
          getResults={this.state.getWalk}
          travelData={this.state.walkData}
          maps={this.props}
          reset={this.reset}
          set={this.setWalk}/>
        <CalcTravel
          getResults={this.state.getDrive}
          travelData={this.state.driveData}
          maps={this.props}
          reset={this.reset}
          set={this.setDrive}/>
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

        <Route path='/results' component={()=>
          <>
            <div className='all-results'>
              <div className='result-container'>
                <DisplayResults
                  result='walk-results'
                  moveType='walk'
                  state={this.state.walkCalcs}
                />
                <DisplayResults
                  result='drive-results'
                  moveType='drive'
                  state={this.state.driveCalcs}
                />
              </div>
              <div className='best-container'>
                <CalcBestRoute
                  walk={this.state.walkCalcs}
                  drive={this.state.driveCalcs}/>
              </div>
            </div>
          </>
        }/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(App);
