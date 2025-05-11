import { Link, Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 고정된 헤더 */}
      <header
        className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-black/80 
            backdrop-blur z-50 shadow-md border-b border-gray-700"
      >
        <div className="text-pink-500 font-bold">DUDU</div>
        <div className="space-x-2">
          <a href="/" className="text-white hover:text-pink-400">
            HOME
          </a>
          <a href="/my" className="text-white hover:text-pink-400">
            MY
          </a>
          <a href="/login" className="text-white hover:text-pink-400">
            Signin
          </a>
          <a
            href="/signup"
            className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
          >
            Signup
          </a>
        </div>
      </header>

      {/* 본문: 헤더 높이만큼 padding */}
      <main className="flex-1 pt-24">
        <Outlet />
      </main>

      {/* 푸터 */}
      <footer className="p-4 bg-black text-white text-center border-t border-gray-700">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy;{new Date().getFullYear()} DUDU UMC Practice </p>

          <div className={"flex justify-center space-x-4 mt-4"}>
            <Link to={"#"}>Privay Policy</Link>
            <Link to={"#"}>Terms of Service</Link>
            <Link to={"#"}>Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeLayout;
