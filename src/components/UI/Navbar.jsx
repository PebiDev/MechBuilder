import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import "./Navbar.modules.css";
import { mechActions } from "../../store/mech-slice";
import Button from "@mui/material/Button";

const Navbar = () => {
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleResetMech = () => {
    dispatch(mechActions.resetMechToInitialState(mech));
  };
  const handleAdvancedOptions = () => {
    dispatch(uiActions.toggleAdvancedOptions());
    dispatch(mechActions.resetMechToInitialState(mech));
  };

  return (
    <nav id="navbar" className="navbar">
      <Button
        variant="outlined"
        className="navbar-button"
        onClick={handleResetMech}
      >
        Reset Mech
      </Button>
      <Button
        variant="outlined"
        onClick={handleAdvancedOptions}
        className="navbar-button"
      >
        Advanced Options
      </Button>
      {ui.advancedOptions && <span id="adv-options">Advanced Options</span>}
    </nav>
  );
};

export default Navbar;
