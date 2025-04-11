import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <nav>Navbar</nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default HomeLayout;
