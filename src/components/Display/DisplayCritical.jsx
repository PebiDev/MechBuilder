import DisplayZone from "./DisplayZone";

const DisplayCritical = ({ zones }) => {
  const zoneArray = Object.entries(zones);
  console.log(zoneArray);

  return (
    // <div id="display-critical" className="display-critical">
    //   {zoneArray.map((zone, index) => {
    //     return <DisplayZone name={zone[0]} zone={zone} />;
    //   })}
    // </div>
    <div id="display-critical" className="display-critical">
      <DisplayZone name="Left Arm" zone={zoneArray[5]} />
      <DisplayZone name="Left Torso" zone={zoneArray[3]} />
      <DisplayZone name="Left Leg" zone={zoneArray[7]} />
      <DisplayZone name="Head" zone={zoneArray[0]} />
      <DisplayZone name="Center Torso" zone={zoneArray[1]} />
      <div className="empty"></div>
      <DisplayZone name="Right Arm" zone={zoneArray[4]} />
      <DisplayZone name="Right Torso" zone={zoneArray[2]} />
      <DisplayZone name="Right Leg" zone={zoneArray[6]} />
    </div>
  );
};

export default DisplayCritical;
