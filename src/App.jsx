import "./App.css";
import { Outlet, useRouteError } from "react-router";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      {useRouteError() ? <NotFoundPage /> : <Outlet />}
      <Footer />
    </>
  );
}

export default App;
