import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 1. 만든 페이지들을 import
import HomePage from "./pages/home.tsx";
import NotFound from "./pages/not-found.tsx";
import MoviesPage from "./pages/movies.tsx";
import RootLayout from "./layout/root-layout.tsx";
import MovieDetailPage from "./pages/movie-detail.tsx";

// 2. 연결
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies/:category", // category로 동적 라우팅
        element: <MoviesPage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
