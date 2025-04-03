import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import "./Navbar.modules.css";
import { mechActions } from "../../store/mech-slice";

const Navbar = () => {
  const mech = useSelector((state) => state.mech);
  const dispatch = useDispatch();
  const toggleMechVisible = () => {
    dispatch(uiActions.toggleDemoVisible());
  };
  const handleResetMech = () => {
    dispatch(mechActions.resetMechToInitialState(mech));
  };

  return (
    <nav id="navbar" className="navbar">
      <button onClick={toggleMechVisible}>Display PH-1</button>
      <button onClick={handleResetMech}>Reset Mech</button>
    </nav>
  );
};

export default Navbar;
