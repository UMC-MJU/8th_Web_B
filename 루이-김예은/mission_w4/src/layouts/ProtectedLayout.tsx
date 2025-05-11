import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to={"/login"} state={{ location }} replace />;
  }
  return (
    <div className="h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 mt-20">
        {/* Outlet을 통해 자식 페이지들(HomePage, LoginPage 등)이 main 영역에 렌더링됨 */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
