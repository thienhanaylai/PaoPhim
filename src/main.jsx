import AppRoutes from "./routes/AppRoutes.jsx";
import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FavoriteProvider } from "./context/MovieContext.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <FavoriteProvider>
        <RouterProvider router={AppRoutes} />
      </FavoriteProvider>
    </AuthProvider>
  </HelmetProvider>,
);
