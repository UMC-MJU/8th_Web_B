import { Link } from "react-router-dom";

const Footer = () => {
    return <footer className="text-center text-sm text-gray-500 py-4 border-t border-gray-700">
            ⓒ 2025 돌려돌려LP판. All rights reserved.
            <div className={"flex justify-center space-x-4 mt-4"}>
                <Link to={"#"}>Privacy Policy</Link>
                <Link to={"#"}>Terms of Service</Link>
                <Link to={"#"}>Contact</Link>
            </div>
            </footer>
};

export default Footer;