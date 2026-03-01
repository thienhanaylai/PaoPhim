import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
