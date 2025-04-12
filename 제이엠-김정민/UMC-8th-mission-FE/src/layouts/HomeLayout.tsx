import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            {/* 고정된 헤더 */}
            <header className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-black/80 
            backdrop-blur z-50 shadow-md border-b border-gray-700">
                <div className="text-pink-500 font-bold">제이엠의 로그인&회원가입</div>
                <div className="space-x-2">
                    <a href="/" className="text-white hover:text-pink-400" >
                        홈
                    </a>
                    <a href="/login" className="text-white hover:text-pink-400">
                        로그인
                    </a>
                    <a
                        href="/signup"
                        className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
                    >
                        회원가입
                    </a>
                </div>
            </header>

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
