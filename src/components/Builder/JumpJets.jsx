import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useState } from "react";

const JumpJets = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);
  const [jumpJetType, setJumpJetType] = useState("Standard");
  console.log(jumpJetType);

  const jumpOptions = [];
  if (jumpJetType === "Improved") {
    for (
      let i = mech.movement.walking + 1;
      i < mech.movement.running + 1;
      i++
    ) {
      jumpOptions.push(i);
    }
  } else {
    for (let i = 0; i < mech.movement.walking + 1; i++) {
      jumpOptions.push(i);
    }
  }

  const handleJumpJetSelect = (event) => {
    dispatch(
      mechActions.addJumpJets({
        numberOfJumpJets: event.target.value,
        jumpJetType: jumpJetType,
      })
    );
  };

  const imProvedJumpJetHandler = (event) => {
    setJumpJetType(event.target.value);
  };

  return (
    <div id="mech-jumpjets">
      {ui.advancedOptions && (
        <div id="jumpjet-type-radio">
          <p>Choose Jumpjet Type:</p>
          <input
            type="radio"
            id="jumpjet-standard"
            name="jumpjet-standard"
            value="Standard"
            checked={jumpJetType === "Standard"}
            onChange={imProvedJumpJetHandler}
          />
          <label htmlFor="jumpjet-standard">Standard</label>
          <input
            type="radio"
            id="jumpjet-improved"
            name="jumpjet-improved"
            value="Improved"
            checked={jumpJetType === "Improved"}
            onChange={imProvedJumpJetHandler}
          />
          <label htmlFor="jumpjet-improved">Improved</label>
        </div>
      )}
      <label htmlFor="jumpjet-select">Choose Jump Capability</label>
      <select
        id="jumpjet-select"
        name="jumpjet-select"
        value={mech.movement.jumping}
        onChange={handleJumpJetSelect}
      >
        {jumpOptions.map((jumpSpeed, index) => {
          return <option key={jumpSpeed}>{jumpSpeed}</option>;
        })}
      </select>

      {mech.movement.jumping > 0 && (
        <p>
          Installing Jumpjets: {mech.movement.jumping}
          <span className="substract-tons">
            {mech.movement.jumping * mech.equipment.jumpjets[0].tons} tons
          </span>
        </p>
      )}
    </div>
  );
};

export default JumpJets;
