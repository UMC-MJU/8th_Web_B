import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();

    if (!accessToken) {
        //accessToken이 없으면 => login페이지로 이동
        return <Navigate to={"/login"} replace />;
    }

    return <Outlet/>;
};

export default ProtectedLayout;
