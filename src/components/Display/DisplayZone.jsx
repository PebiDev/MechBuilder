const DisplayZone = ({ name, zone }) => {
  //const zoneValues = Object.values(zone[1]).slice(1);
  const zoneValues = Object.values(zone[1]);

  return (
    <div id={name} className={`zone ${zone[0]}`}>
      <h4> {name}</h4>
      {zoneValues.map((slot, index) => {
        return (
          <p key={name + index + 1}>
            {index + 1}. {slot}
          </p>
        );
      })}
    </div>
  );
};

export default DisplayZone;
