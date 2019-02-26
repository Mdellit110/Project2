import React, { Component } from 'react';

class CalcTravel extends Component {
  constructor(props) {
    super(props)
    this.state={
      returnedData: {
        distance: '',
        duration: '',
        to: '',
        from: '',
      }
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
                this.setState({
                  returnedData: {
                    distance: distance,
                    duration: duration,
                    to: to,
                    from: from
                  }
                })
              this.props.set(this.state.returnedData)
              this.props.reset()
            }
          }
        }
      })
    }
    return (
      <></>
    )
  }
}

export default CalcTravel
