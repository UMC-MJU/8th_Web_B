import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbor from "../components/Navbor";

const ProtectedLayout = () => {
    const { accessToken } = useAuth();

    if (!accessToken) {
        //accessToken이 없으면 => login페이지로 이동
        return <Navigate to={"/login"} replace />;
    }

    // return <Outlet/>;
    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Navbor />

            {/* 본문: 헤더 높이만큼 padding */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* 푸터 */}
            <footer className="p-4 bg-black text-white text-center border-t border-gray-700">
                ⓒ 제이엠/로그인&회원가입 페이지
            </footer>
        </div>
    );
};

export default ProtectedLayout;
