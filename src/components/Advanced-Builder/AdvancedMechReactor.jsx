import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const AdvancedMechReactor = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);

  const handleReactorSelect = (event) => {
    const reactorType = event.target.value;
    if (reactorType === "XL") {
      let slots = ["loc1", "loc2"];
      if (mech.technologyBase === "Inner Sphere") {
        slots.push("loc3");
      }
      dispatch(
        mechActions.unInstallEquipFromZone({
          zones: ["rtorso", "ltorso"],
          slots: slots,
        })
      );
    }
    dispatch(mechActions.setReactorType(event.target.value));
  };

  return (
    <div id="advanced-mech-reactor">
      {mech.technologyBase === "Inner Sphere" ? (
        <>
          <label htmlFor="reactor-select-is">Choose Reactor:</label>{" "}
          <select
            id="reactor-select-is"
            name="reactor-select-is"
            value={mech.reactor.reactorType}
            onChange={handleReactorSelect}
          >
            <option value="Standard">Standard</option>
            <option value="XL">XL Engine</option>
            <option value="Compact">Compact Engine</option>
            <option value="Light">Light Engine</option>
          </select>{" "}
        </>
      ) : (
        <>
          <label htmlFor="reactor-select-clan">Installing Reactor:</label>{" "}
          <select
            id="reactor-select-clan"
            name="reactor-select-clan"
            value={mech.reactor.reactorType}
            onChange={handleReactorSelect}
          >
            <option value="Standard">Standard</option>
            <option value="XL">XL Engine</option>
          </select>
        </>
      )}
    </div>
  );
};

export default AdvancedMechReactor;
