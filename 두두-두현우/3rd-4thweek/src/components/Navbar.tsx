import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "HOME" },
  { to: "/movies/popular", label: "Popular Movie" },
  { to: "/movies/now_playing", label: "Now Playing" },
  { to: "/movies/top_rated", label: "HOT" },
  { to: "/movies/upcoming", label: "Upcoming" },
];

export const Navbar = () => {
  return (
    <div className="flex gap-3 p-4">
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => {
            return isActive ? "text-[#b2dab1] font-bold" : "text-gray-500";
          }}
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};
