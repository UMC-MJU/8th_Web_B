import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import HomeLayout from './layouts/HomeLayout';
import SignupPage from './pages/SignupPage';
import MyPage from './pages/MyPage';

// router로 만들어야될 것들
// 1.홈페이지
// 2.로그인 페이지
// 3.회원가입 페이지

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    errorElement: <NotFoundPage/>,
    children: [
      //index값이 true => '/' 경로 일때 보여주는 페이지
      {index: true, element: <HomePage/>},
      {path: 'login', element: <LoginPage/>},
      {path: 'signup', element:<SignupPage/>},
      {path:'me',element:<MyPage/>}
    ]
  },
]);

function App() {
  return <RouterProvider router={router}/>
}

export default App
