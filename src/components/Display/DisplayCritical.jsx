import DisplayZone from "./DisplayZone";

const DisplayCritical = ({ zones }) => {
  const zoneArray = Object.entries(zones);

  return (
    <div id="display-critical" className="display-critical">
      {zoneArray[5][0] === "flleg" ? (
        <DisplayZone name="Forward Left Leg" zone={zoneArray[5]} />
      ) : (
        <DisplayZone name="Left Arm" zone={zoneArray[5]} />
      )}

      <DisplayZone name="Left Torso" zone={zoneArray[3]} />

      {zoneArray[4][0] === "frleg" ? (
        <DisplayZone name="Forward Right Leg" zone={zoneArray[4]} />
      ) : (
        <DisplayZone name="Right Arm" zone={zoneArray[4]} />
      )}
      <DisplayZone name="Head" zone={zoneArray[0]} />

      <DisplayZone name="Center Torso" zone={zoneArray[1]} />

      <div className="empty"></div>

      {zoneArray[7][0] === "rlleg" ? (
        <DisplayZone name="Rear Left Leg" zone={zoneArray[7]} />
      ) : (
        <DisplayZone name="Left Leg" zone={zoneArray[7]} />
      )}

      <DisplayZone name="Right Torso" zone={zoneArray[2]} />

      {zoneArray[6][0] === "rrleg" ? (
        <DisplayZone name="Rear Right Leg" zone={zoneArray[6]} />
      ) : (
        <DisplayZone name="Right Leg" zone={zoneArray[6]} />
      )}
    </div>
  );
};

export default DisplayCritical;
