import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav>네비게이션 바</nav>
      <main className="flex-1">
        {/* Outlet을 통해 자식 페이지들(HomePage, LoginPage 등)이 main 영역에 렌더링됨 */}
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default HomeLayout;
