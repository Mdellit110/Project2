async function CalcTravel(maps, { walk, drive }) {
  const calc = new maps.DistanceMatrixService();
  const getDistanceMatrix = data =>
    new Promise((resolve, reject) => {
      calc.getDistanceMatrix(data, (response, status) => {
        if (status === "OK") {
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
              response = {
                distance: distance,
                duration: duration,
                to: to,
                from: from
              };
            }
          }
          resolve(response);
        } else {
          reject(response);
        }
      });
    });

  let walking = await getDistanceMatrix(walk);
  let driving = await getDistanceMatrix(drive);

  return { walking, driving };
}

export default CalcTravel;
