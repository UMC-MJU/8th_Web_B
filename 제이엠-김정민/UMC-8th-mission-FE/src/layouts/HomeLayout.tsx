import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        // 높이를 페이지 전체로 선언
        <div className="h-dvh flex flex-col"> 
            <nav> 네비게이션 바 입니다. </nav>
            <main className="flex-1">
                <Outlet/>
            </main>
            <footer>푸터</footer>
        </div>
    )
};
        
export default HomeLayout;