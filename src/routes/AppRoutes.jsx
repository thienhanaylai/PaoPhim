import App from "../App";
import HomePage from "../pages/HomePage";
import { createBrowserRouter } from "react-router";
import MoviePage from "../pages/MoviePage";
import DetailMoviePage from "../pages/DetailMoviePage";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "phim-bo",
        element: <MoviePage key={"phim-bo"} type_list="phim-bo" />,
      },
      {
        path: "phim-le",
        element: <MoviePage key={"phim-le"} type_list="phim-le" />,
      },
      {
        path: "phim",
        element: <DetailMoviePage />,
      },
    ],
  },
]);

export default AppRoutes;
