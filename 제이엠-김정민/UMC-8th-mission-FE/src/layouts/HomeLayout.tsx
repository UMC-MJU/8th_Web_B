import { Outlet } from "react-router-dom";
import Navbor from "../components/Navbor.tsx";

const HomeLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Navbor />
            
            {/* 본문: 헤더 높이만큼 padding */}
            <main className="flex-1 pt-24">
                <Outlet />
            </main>

            {/* 푸터 */}
            <footer className="p-4 bg-black text-white text-center border-t border-gray-700">
                ⓒ 제이엠/로그인&회원가입 페이지
            </footer>
        </div>
    );
};

export default HomeLayout;
