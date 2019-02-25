import React from 'react'

const CalculateDistance = (props) => {
  const {maps} = props.maps.google;
  const resp = new maps.DistanceMatrixService();
  const finalResp = resp.getDistanceMatrix(
    {
      origins: ['Bellmore, NewYork'],
      destinations: ['Seaford, NewYork'],
      travelMode: 'DRIVING',
      unitSystem: maps.UnitSystem.IMPERIAL,
    }, (response, status) => {
      if (status === 'OK') {
        let origins = response.originAddresses;
        for (let i = 0; i < origins.length; i++) {
          let results = response.rows[i].elements;
          for (let j = 0; j < results.length; j++) {
            let element = results[j];
            let distance = element.distance.text;
            let duration = element.duration.text;
            console.log(distance);
            console.log(duration);
          }
        }
      }
    }
  );
  console.log(finalResp);
  return (
    <p>{finalResp}</p>
  )
}

export default CalculateDistance
