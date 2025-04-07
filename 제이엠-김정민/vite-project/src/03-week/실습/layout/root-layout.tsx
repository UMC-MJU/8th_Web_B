import {Outlet} from "react-router-dom";
import Navbar from "../../../03-week/실습/components/navbar";

const RootLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};

export default RootLayout;
