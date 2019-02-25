import React, { Component } from 'react';
import { Map, Marker } from 'google-maps-react';

const mapStyles = {
  width: '50vw',
  height: '70vh',
  'marginLeft': 'auto',
  'marginRight': 'auto',
  position: 'fixed'
};

export class MapContainer extends Component {
  debugger;
  render() {
    return (
      <div>
        <h1>Map</h1>
        <div className='Map'>
          <Map
            google={this.props.maps.google}
            zoom={15}
            style={mapStyles}
            initialCenter={{
             lat: 40.657473,
             lng: -73.534201
           }}>
            <Marker
             name={'Your position'}
             position={{lat: 40.657473, lng:  -73.534201}}
             />
         </Map>
        </div>
        {console.log()}
      </div>
    );
  }

}

export default MapContainer
