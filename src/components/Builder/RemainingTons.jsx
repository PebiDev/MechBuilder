import { useSelector } from "react-redux";

const RemainingTons = () => {
  const mech = useSelector((state) => state.mech);
  return (
    //  <div className="remaining-tons">
    //   <p>
    //     Remaining Tons:
    //     <span id="tons-remaining"> {mech.remainingTons} </span>of {mech.tonnage}{" "}
    //     tons
    //     {mech.remainingTons < 0 && (
    //       <span className="overweight">
    //         <br />
    //         Mech is overweight!
    //       </span>
    //     )}{" "}
    //   </p>
    //   <span id="critical-slots">Critical Slots: {mech.criticalSlots}</span>
    // </div>
    <div className="remaining-tons">
      <div>
        Remaining Tons:
        <span id="tons-remaining"> {mech.remainingTons} </span>of {mech.tonnage}{" "}
        tons
        {mech.remainingTons < 0 && (
          <span className="overweight">
            <br />
            Mech is overweight!
          </span>
        )}{" "}
      </div>
      <div id="critical-slots">
        Critical Slots:{" "}
        <span id="critical-remaining">{mech.criticalSlots}</span>
      </div>
    </div>
  );
};

export default RemainingTons;
