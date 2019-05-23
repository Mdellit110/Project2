import React from "react";
const CalcTravel = (maps, travelData, set, reset) => {
  const resp = new maps.DistanceMatrixService();
  console.log(resp);
  resp.getDistanceMatrix(travelData, (response, status) => {
    if (status === "OK" && response) {
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
          const returnedData = {
            distance: distance,
            duration: duration,
            to: to,
            from: from
          };

          set(returnedData);
          reset();
        }
      }
    }
  });
};

export default CalcTravel;
