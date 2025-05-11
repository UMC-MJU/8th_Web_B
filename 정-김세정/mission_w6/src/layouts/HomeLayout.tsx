import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white min-h-screen flex flex-col">
            <nav className="w-full flex justify-between items-center px-6 py-4 bg-black">
                <h1 className="text-pink-500 text-xl font-bold">돌려돌려LP판</h1>
                <div className="space-x-2">
                <button
                onClick={() => navigate("/login")}
                className="bg-black border border-white text-white px-4 py-1 rounded">
                    로그인
                </button>
                <button
                onClick={() => navigate("/signup")}
                className="bg-pink-500 text-white px-4 py-1 rounded">
                    회원가입
                </button>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
                <div className="flex items-center w-full max-w-md">
                    <button onClick={() => navigate(-1)} className="text-white text-2xl mr-2">
                        &lt;
                    </button>
                    <h2 className="text-xl font-semibold mx-auto">로그인</h2>
                </div>
                
                <button className="flex items-center justify-center w-[300px] border border-white
                py-2 rounded gap-2 hover:bg-white hover:text-black transition">
                    <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="구글"
                    className="w-5 h-5"
                  />
                  <span>구글 로그인</span>
                </button>

                <div className="flex items-center w-[300px] gap-2">
                    <hr className="flex-grow border-gray-500" />
                    <span className="text-gray-400 text-sm">OR</span>
                    <hr className="flex-grow border-gray-500" />
                </div>

                <div className="w-[350px] space-y-4">
                <Outlet />
                </div>
            </main>

            <footer className="text-center text-sm text-gray-500 py-4 border-t border-gray-700">
            ⓒ 2025 돌려돌려LP판. All rights reserved.
            </footer>
        </div>
    );
};

export default HomeLayout;