import "./App.css";

import DisplayMech from "./components/Display/DisplayMech";
import Navbar from "./components/UI/Navbar";
import CreateMechForm from "./components/Builder/CreateMechForm";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

import { useSelector } from "react-redux";

function App() {
  const mech = useSelector((state) => state.mech);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <Header /> */}
        <Navbar />
        <main>
          {/* <h1>Build a Mech!</h1> */}
          <div id="container">
            <CreateMechForm />
            <DisplayMech mech={mech} />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
