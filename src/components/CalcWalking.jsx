import React, { Component } from 'react';
class CalcWalking extends Component {
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
    if (this.props.getResults){
      resp.getDistanceMatrix({
        origins: ['Bellmore, NewYork'],
        destinations: [this.props.destination],
        travelMode: 'WALKING',
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
        <div className='time_travel'>It's a {this.state.duration} walk to {this.state.to} from here if you leave now</div>
      </div>
    )
  }
}

export default CalcWalking
