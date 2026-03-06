import App from "../App";
import HomePage from "../pages/HomePage";
import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Skeleton } from "antd";
const MoviePage = lazy(() => import("../pages/MoviePage"));
const DetailMoviePage = lazy(() => import("../pages/DetailMoviePage"));
const VideoStream = lazy(() => import("../pages/VideoStreamPage"));
const CategoryMoviePage = lazy(() => import("../pages/CategoryMoviePage"));
const CountryMoviePage = lazy(() => import("../pages/CountryMoviePage"));
const FindMoviePage = lazy(() => import("../pages/FindMoviePage"));

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
        element: (
          <Suspense
            fallback={
              <div className="loading">
                <Skeleton />
              </div>
            }
          >
            <MoviePage key={"phim-bo"} type_list="phim-bo" />
          </Suspense>
        ),
      },
      {
        path: "phim-le",
        element: (
          <Suspense
            fallback={
              <div className="loading">
                <Skeleton />
              </div>
            }
          >
            <MoviePage key={"phim-le"} type_list="phim-le" />
          </Suspense>
        ),
      },
      {
        path: "the-loai/:type_list",
        element: (
          <Suspense
            fallback={
              <div className="loading">
                <Skeleton />
              </div>
            }
          >
            <CategoryMoviePage key={"the-loai"} />
          </Suspense>
        ),
      },
      {
        path: "quoc-gia/:type_list",
        element: (
          <Suspense
            fallback={
              <div className="loading">
                <Skeleton />
              </div>
            }
          >
            <CountryMoviePage key={"quoc-gia"} />
          </Suspense>
        ),
      },
      {
        path: "xem-phim/:movieSlug/:episodeSlug",
        element: (
          <Suspense
            fallback={
              <div className="loading">
                <Skeleton />
              </div>
            }
          >
            <VideoStream />
          </Suspense>
        ),
      },
      {
        path: "phim/:slug",
        element: (
          <Suspense
            fallback={
              <div className="loading">
                <Skeleton />
              </div>
            }
          >
            <DetailMoviePage />
          </Suspense>
        ),
      },
      {
        path: "tim-kiem/:keyword",
        element: (
          <Suspense
            fallback={
              <div className="loading">
                <Skeleton />
              </div>
            }
          >
            <FindMoviePage />
          </Suspense>
        ),
      },
      // {
      //   path: "*",
      //   element: <Navigate to="/" replace />,
      // },
    ],
  },
]);

export default AppRoutes;
