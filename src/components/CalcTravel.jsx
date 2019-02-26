import React, { Component } from 'react';
import DisplayResults from './DisplayResults'
class CalcTravel extends Component {
  constructor(props) {
    super(props)
    this.state={
        distance: '',
        duration: '',
        to: '',
        from: '',
    }
  }

  render() {
    if (this.props.getResults){
    const resp = new this.props.maps.google.maps.DistanceMatrixService();
      resp.getDistanceMatrix(
        this.props.travelData,
        (response, status) => {
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
                this.setState(prevState => ({
                    distance: distance,
                    duration: duration,
                    to: to,
                    from: from
                }))
              this.props.reset()
            }
          }
        }
      })
    }
    return (
      <DisplayResults
        state={this.state}
        props={this.props}
        />
    )
  }
}

export default CalcTravel
