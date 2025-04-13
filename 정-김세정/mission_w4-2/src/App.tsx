import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import HomeLayout from './layouts/HomeLayout.tsx';
import SignupPage from './pages/SignupPage.tsx';
import MyPage from './pages/MyPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:<HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {index: true, element: <HomePage />},
      {path: "login", element: <LoginPage />},
      {path: "signup", element: <SignupPage />},
      {path: "my", element: <MyPage />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
