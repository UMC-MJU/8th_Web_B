import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-green-500 font-bold" : "";

  return (
    <nav className="flex gap-4 p-4">
      <NavLink to="/" className={linkClass}>
        홈
      </NavLink>
      <NavLink to="/movies/popular" className={linkClass}>
        인기 영화
      </NavLink>
      <NavLink to="/movies/upcoming" className={linkClass}>
        개봉 예정
      </NavLink>
      <NavLink to="/movies/top_rated" className={linkClass}>
        평점 높은
      </NavLink>
      <NavLink to="/movies/now_playing" className={linkClass}>
        상영 중
      </NavLink>
    </nav>
  );
};

export default Navbar;
