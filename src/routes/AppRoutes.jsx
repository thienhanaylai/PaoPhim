import App from "../App";
import HomePage from "../pages/HomePage";
import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Skeleton } from "antd";
const MovieListPage = lazy(() => import("../pages/MovieListPage"));
const DetailMoviePage = lazy(() => import("../pages/DetailMoviePage"));
const VideoStream = lazy(() => import("../pages/VideoStreamPage"));
const FindMoviePage = lazy(() => import("../pages/FindMoviePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));

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
            <MovieListPage key={"phim-bo"} pageType="danh-sach" type_list="phim-bo" />
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
            <MovieListPage key={"phim-le"} pageType="danh-sach" type_list="phim-le" />
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
            <MovieListPage key={"the-loai"} pageType="the-loai" />
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
            <MovieListPage key={"quoc-gia"} pageType="quoc-gia" />
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
      {
        path: "trang-ca-nhan",
        element: (
          <Suspense fallback={<div className="min-h-screen bg-[#0a0c10]" />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: "phim-yeu-thich",
        element: (
          <Suspense fallback={<div className="min-h-screen bg-[#0a0c10]" />}>
            <ProfilePage defaultTab={"favorite"} />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "dang-nhap",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-[#0a0c10]" />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "dang-ky",
    element: (
      <Suspense fallback={<div className="min-h-screen bg-[#0a0c10]" />}>
        <RegisterPage />
      </Suspense>
    ),
  },
]);

export default AppRoutes;
