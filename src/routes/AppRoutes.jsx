import App from "../App";
import HomePage from "../pages/HomePage";
import { createBrowserRouter, Navigate } from "react-router";
import MoviePage from "../pages/MoviePage";
import DetailMoviePage from "../pages/DetailMoviePage";
import VideoStream from "../pages/VideoStreamPage";
import CategoryMoviePage from "../pages/CategoryMoviePage";
import CountryMoviePage from "../pages/CountryMoviePage";
import FindMoviePage from "../pages/FindMoviePage";

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
        path: "quoc-gia/:type_list",
        element: <CountryMoviePage key={"quoc-gia"} />,
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
        path: "tim-kiem/:keyword",
        element: <FindMoviePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default AppRoutes;
