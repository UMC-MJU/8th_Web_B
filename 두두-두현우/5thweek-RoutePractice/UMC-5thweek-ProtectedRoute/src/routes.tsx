import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import PublicPage from "./pages/publicPage";
import PrivatePage from "./pages/privatePage";
import ProtectedRoute from "./protectedRoute";

const Routes = () => {
  const userInfo = false; // true or false or localstorage get or redux get
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/public",
          element: <PublicPage />,
        },
        {
          path: "/private",
          element: <ProtectedRoute userInfo={userInfo} />,
          children: [{ path: "", element: <PrivatePage /> }],
        },
      ],
    },
  ];

  const router = createBrowserRouter([...routes]);

  return <RouterProvider router={router} />;
};

export default Routes;
