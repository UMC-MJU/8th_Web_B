// navbar.tsx
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            {/* Link 태그를 통해서 원하는 경로로 페이지 이동 가능 */}
            <Link to={'/'}>홈 페이지로 이동 </Link>
            <Link to='/movies'>영화 목록 페이지로 이동</Link>
        </nav>
    );
};

export default Navbar;
