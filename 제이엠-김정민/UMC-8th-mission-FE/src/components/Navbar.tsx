import { useAuth } from "../context/AuthContext";

const Navbar = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const { accessToken, user } = useAuth();

  return (
    <nav
      className="ixed top-0 left-0 w-full flex items-center justify-between p-4 bg-zinc-900
            backdrop-blur z-50 shadow-md border-b border-gray-700"
    >
      <div className="text-xl font-bold text-pink-500">
        <div>
          <button
            onClick={onToggleSidebar}
            className="text-white text-2xl hover:text-pink-400"
          >
            ☰
          </button>
          <a href="/" className="test-white hover:text-pink-400">
            제이엠-LP's
          </a>
        </div>
      </div>
      <div className="space-x-2">
        {/* <a href="/" className="text-white hover:text-pink-400" >
                    홈
                </a> */}

        {accessToken && (
          <>
            <a href="/me" className="text-white hover:text-pink-400">
              마이페이지
            </a>
            <div>{user?.name}</div>
          </>
        )}

        {!accessToken && (
          <>
            <a href="/login" className="text-white hover:text-pink-400">
              로그인
            </a>
            <a
              href="/signup"
              className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
            >
              회원가입
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
