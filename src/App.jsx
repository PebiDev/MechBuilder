import "./App.css";
import Header from "./components/UI/Header";
import DemoMech from "./data/demo_ph1";
import DisplayMech from "./components/Display/DisplayMech";
import Sidebar from "./components/UI/Sidebar";
import Navbar from "./components/UI/Navbar";
import CreateMechForm from "./components/Builder/CreateMechForm";

import { useSelector } from "react-redux";

function App() {
  const demoMech = DemoMech;
  const showMech = useSelector((state) => state.ui.mechVisible);
  const mech = useSelector((state) => state.mech);

  return (
    <div>
      {/* <Header /> */}
      <Navbar />
      <main>
        {showMech && <DisplayMech mech={demoMech}></DisplayMech>}
        {/* <h1>Build a Mech!</h1> */}
        <div id="container">
          <CreateMechForm />
          <DisplayMech mech={mech} />
        </div>
      </main>
    </div>
  );
}

export default App;
