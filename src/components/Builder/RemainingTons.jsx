import { useSelector } from "react-redux";
import React from "react";

const RemainingTons = () => {
  const remainingTons = useSelector((state) => state.mech.remainingTons);
  const tonnage = useSelector((state) => state.mech.tonnage);
  const criticalSlots = useSelector((state) => state.mech.criticalSlots);

  return (
    <div className="remaining-tons">
      <div>
        Remaining Tons:
        <span id="tons-remaining"> {remainingTons} </span>of {tonnage} tons
        {remainingTons < 0 && (
          <span className="overweight">
            <br />
            Mech is overweight!
          </span>
        )}
      </div>
      <div id="critical-slots">
        Critical Slots: <span id="critical-remaining">{criticalSlots}</span>
      </div>
    </div>
  );
};

export default React.memo(RemainingTons);
