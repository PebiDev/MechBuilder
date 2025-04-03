import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const JumpJets = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const jumpOptions = [];
  for (let i = 0; i < mech.movement.walking + 1; i++) {
    jumpOptions.push(i);
  }
  let jumpJetWeight = 1;
  if (mech.tonnage < 60) {
    jumpJetWeight = 0.5;
  }
  if (mech.tonnage > 85) {
    jumpJetWeight = 2;
  }
  const jumpJetHandler = (event) => {
    dispatch(
      mechActions.addJumpJets({
        numberOfJumpJets: event.target.value,
        jumpJetWeight: jumpJetWeight,
      })
    );
  };
  return (
    <div id="mech-jumpjets">
      <label htmlFor="jumpjet-select">Choose Jump Capability</label>
      <select
        id="jumpjet-select"
        name="jumpjet-select"
        value={mech.movement.jumping}
        onChange={jumpJetHandler}
      >
        {jumpOptions.map((jumpSpeed, index) => {
          return <option key={jumpSpeed}>{index}</option>;
        })}
      </select>

      {mech.movement.jumping > 0 && (
        <p>
          Installing Jumpjets: {mech.movement.jumping}
          <span className="substract-tons">
            -{mech.movement.jumping * jumpJetWeight} tons
          </span>
        </p>
      )}
    </div>
  );
};

export default JumpJets;
