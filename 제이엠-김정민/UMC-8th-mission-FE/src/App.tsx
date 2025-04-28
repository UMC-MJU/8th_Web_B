import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedLayout from "./layouts/ProtectedLayout";

// router로 만들어야될 것들
// 1.홈페이지
// 2.로그인 페이지
// 3.회원가입 페이지

//publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <NotFoundPage />,
        children: [
            //index값이 true => '/' 경로 일때 보여주는 페이지
            { index: true, element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
        ],
    },
];
//protectedRoutes : 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
    {
        path: "/",
        element: <ProtectedLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "me",
                element: <MyPage />,
            },
        ],
    },
];

const router = createBrowserRouter([
      ...publicRoutes,
      ...protectedRoutes
    // {
    //     path: "/",
    //     element: <HomeLayout />,
    //     errorElement: <NotFoundPage />,
    //     children: [
    //         //index값이 true => '/' 경로 일때 보여주는 페이지
    //         { index: true, element: <HomePage /> },
    //         { path: "login", element: <LoginPage /> },
    //         { path: "signup", element: <SignupPage /> },
    //         { path: "me", element: <MyPage/>},
    //     ],
    // },

]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;
