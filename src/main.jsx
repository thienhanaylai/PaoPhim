import AppRoutes from "./routes/AppRoutes.jsx";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MoviePage from "./pages/MoviePage.jsx";

createRoot(document.getElementById("root")).render(<RouterProvider router={AppRoutes} />);
