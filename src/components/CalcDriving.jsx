import React, { Component } from 'react';
class CalcDriving extends Component {
  constructor(props) {
    super(props)
    this.state={
        distance: '',
        duration: '',
        to: '',
        from: ''
    }
  }

  render() {
    const resp = new this.props.maps.google.maps.DistanceMatrixService();
    if (this.props.getresults){
      resp.getDistanceMatrix({
        origins: ['Bellmore, NewYork'],
        destinations: [this.props.destination],
        travelMode: 'DRIVING',
        unitSystem: this.props.maps.google.maps.UnitSystem.IMPERIAL,
      }, (response, status) => {
        if (status === 'OK') {
          const origins = response.originAddresses;
          const destinations = response.destinationAddresses;
          for (let i = 0; i < origins.length; i++) {
            const results = response.rows[i].elements;
            for (let j = 0; j < results.length; j++) {
              const element = results[j];
              const distance = element.distance.text;
              const duration = element.duration.text;
              const from = origins[i];
              const to = destinations[j];
              this.setState({
                  distance: distance,
                  duration: duration,
                  to: to,
                  from: from
              })
            }
          }
        }
      })
    }
    return (
      <div>
        <div className='time_travel'>it'll take ya {this.state.duration} to go from {this.state.from} to {this.state.to} if you drive {this.state.distance}les</div>
      </div>
    )
  }
}

export default CalcDriving
