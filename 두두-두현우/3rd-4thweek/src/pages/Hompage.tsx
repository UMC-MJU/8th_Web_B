import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const Hompage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Hompage;
