import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const HomePage = () : React.ReactElement => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default HomePage;