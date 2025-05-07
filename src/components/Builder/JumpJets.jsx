import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useState, useMemo } from "react";

const JumpJets = () => {
  const dispatch = useDispatch();

  const walkingSpeed = useSelector((state) => state.mech.movement.walking);
  const runningSpeed = useSelector((state) => state.mech.movement.running);
  const jumping = useSelector((state) => state.mech.movement.jumping);
  const jumpJetWeight =
    useSelector((state) => state.mech.equipment.jumpjets?.[0]?.tons) || 0;
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);
  const [jumpJetType, setJumpJetType] = useState("Standard");

  const jumpOptions = useMemo(() => {
    const options = [];
    const maxJump = jumpJetType === "Improved" ? runningSpeed : walkingSpeed;

    const minJump = jumpJetType === "Improved" ? walkingSpeed + 1 : 0;

    for (let i = minJump; i <= maxJump; i++) {
      options.push(i);
    }

    return options;
  }, [jumpJetType, walkingSpeed, runningSpeed]);

  const handleJumpJetSelect = (event) => {
    dispatch(
      mechActions.addJumpJets({
        numberOfJumpJets: Number(event.target.value),
        jumpJetType,
      })
    );
  };

  const improvedJumpJetHandler = (event) => {
    const selectedType = event.target.value;
    setJumpJetType(selectedType);
    dispatch(mechActions.removeJumpJets());
  };

  return (
    <div id="mech-jumpjets" className="form-element">
      {advancedOptions && (
        <div id="jumpjet-type-radio">
          <p>Choose Jumpjet Type:</p>
          <input
            type="radio"
            id="jumpjet-standard"
            name="jumpjet"
            value="Standard"
            checked={jumpJetType === "Standard"}
            onChange={improvedJumpJetHandler}
          />
          <label htmlFor="jumpjet-standard">Standard</label>
          <input
            type="radio"
            id="jumpjet-improved"
            name="jumpjet"
            value="Improved"
            checked={jumpJetType === "Improved"}
            onChange={improvedJumpJetHandler}
          />
          <label htmlFor="jumpjet-improved">Improved</label>
        </div>
      )}

      <label htmlFor="jumpjet-select">Choose Jump Capability</label>
      <select
        id="jumpjet-select"
        name="jumpjet-select"
        value={jumping}
        onChange={handleJumpJetSelect}
      >
        {jumpOptions.map((jumpSpeed) => (
          <option key={jumpSpeed} value={jumpSpeed}>
            {jumpSpeed}
          </option>
        ))}
      </select>

      {jumping > 0 && (
        <p>
          Installing Jumpjets: {jumping}
          <span className="substract-tons">
            -{jumping * jumpJetWeight} tons
          </span>
        </p>
      )}
    </div>
  );
};

export default JumpJets;
