import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/layouts/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
