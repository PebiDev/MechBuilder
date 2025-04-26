import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import "./Navbar.modules.css";
import { mechActions } from "../../store/mech-slice";

const Navbar = () => {
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const toggleMechVisible = () => {
    dispatch(uiActions.toggleDemoVisible());
  };
  const handleResetMech = () => {
    dispatch(mechActions.resetMechToInitialState(mech));
  };
  const handleAdvancedOptions = () => {
    dispatch(uiActions.toggleAdvancedOptions());
    dispatch(mechActions.resetMechToInitialState(mech));
  };

  return (
    <nav id="navbar" className="navbar">
      <button onClick={toggleMechVisible}>Display PH-1</button>
      <button onClick={handleResetMech}>Reset Mech</button>
      <button
        onClick={handleAdvancedOptions}
        className={ui.advancedOptions ? "advanced-options-active" : ""}
      >
        Advanced Options
      </button>
      {ui.advancedOptions && <span id="adv-options">Advanced Options</span>}
    </nav>
  );
};

export default Navbar;
