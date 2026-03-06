import AppRoutes from "./routes/AppRoutes.jsx";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")).render(<RouterProvider router={AppRoutes} />);
