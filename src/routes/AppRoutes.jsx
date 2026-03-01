import App from "../App";
import HomePage from "../pages/HomePage";
import { createBrowserRouter, Navigate } from "react-router";
import MoviePage from "../pages/MoviePage";
import DetailMoviePage from "../pages/DetailMoviePage";
import VideoStream from "../pages/VideoStreamPage";
import CategoryMoviePage from "../pages/CategoryMoviePage";

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
        path: "the-loai/:type_list",
        element: <CategoryMoviePage key={"the-loai"} />,
      },
      {
        path: "xem-phim/:movieSlug/:episodeSlug",
        element: <VideoStream />,
      },
      {
        path: "phim/:slug",
        element: <DetailMoviePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default AppRoutes;
