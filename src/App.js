import React, { PureComponent } from 'react';
import './App.css';
import CalcTravel from './components/CalcTravel';
import AutoCompleteInput from './components/DestinationForm';
import DisplayResults from './components/DisplayResults';
import CalcBestRoute from './components/CalcBestRoute';
import DisplayBestRoute from './components/DisplayBestRoute';
import { Redirect, Route } from 'react-router-dom';
import {GoogleApiWrapper} from "google-maps-react";

let drive;
let walk;
let set;

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state={
      displayWalk: false,
      displayDrive: false,
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
      },
      bestRoute: {
        best: '',
        diff: null
      },
      callWalk: false,
      callDrive: false,
      gotBest: false
    }
    this.setWalk = this.setWalk.bind(this)
    this.setDrive = this.setDrive.bind(this)
    this.setOriginDestination = this.setOriginDestination.bind(this)
    this.setBestRoute = this.setBestRoute.bind(this)
    this.resetWalk = this.resetWalk.bind(this)
    this.resetDrive = this.resetDrive.bind(this)
  }

  resetWalk() {
    this.setState({
      getWalk: false,
      displayWalk: true,
    })
  }

  resetDrive() {
    this.setState({
      getDrive: false,
      displayDrive: true,
    })
  }

  setWalk(walkCalcs) {
    this.setState({
      walkCalcs: walkCalcs,
      callWalk: false
    })
  }

  setDrive(driveCalcs) {
    this.setState({
      driveCalcs: driveCalcs,
      callDrive: false
    })
  }

  setOriginDestination(address) {
    if (this.state.currentLocation) {
      this.setState({
        displayWalk: false,
        displayDrive: false,
        walkData: {
          origins: [`${this.state.currentLocation}`],
          destinations: [`${address}`],
          travelMode: 'WALKING',
          unitSystem: this.props.google.maps.UnitSystem.IMPERIAL,
        },
        driveData: {
          origins: [`${this.state.currentLocation}`],
          destinations: [`${address}`],
          travelMode: 'DRIVING',
          unitSystem: this.props.google.maps.UnitSystem.IMPERIAL,
        },
        callWalk: true,
        callDrive: true,
        gotBest: false
      })
    }
  }

  setBestRoute(bestRoute) {
    this.setState({
      bestRoute: {
        best: bestRoute.best,
        diff: bestRoute.diff
      },
      gotBest: true
    })
  }

  componentDidMount() {
    if (this.state.currentLocation === '')
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        currentLocation: `${position.coords.latitude}, ${position.coords.longitude}`
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.displayWalk === true && this.state.displayDrive === true && this.state.gotBest === false) {
      drive = this.state.driveCalcs
      walk = this.state.walkCalcs
      set = this.setBestRoute
      CalcBestRoute(drive, walk, set)
    }
  }



  render() {
      return (
        <div className="App">
          <header>
            <h1 className='title'>WALK or DRIVE</h1>
          </header>
          <>
            {(this.state.callWalk === false)?
              (<></>):
              (<>
                <CalcTravel
                  getResults={this.state.getWalk}
                  travelData={this.state.walkData}
                  maps={this.props}
                  reset={this.resetWalk}
                  set={this.setWalk}/>
              </>)
            }
            {(this.state.callDrive === false)?
              (<></>):
              (<>
                <CalcTravel
                  getResults={this.state.getDrive}
                  travelData={this.state.driveData}
                  maps={this.props}
                  reset={this.resetDrive}
                  set={this.setDrive}/>
              </>)
            }
          </>
        <Route path="/" render={(props) => (
          <>
            <AutoCompleteInput
            setOriginDestination={this.setOriginDestination}
            handleSubmit={this.handleSubmit}
            runCalcs={this.runCalcs}
            />
          {(this.state.bestRoute.diff)?
              ( <Redirect from='/' to="/results"/> ):
              (<></>)}
          </>
          )}/>

        <Route path='/results' render={()=> (
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
                  <DisplayBestRoute
                    moveType={this.state.bestRoute.best}
                    diff={this.state.bestRoute.diff}
                  />
                </div>
              </div>
            </>
          )}/>
        </div>
      )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(App);
