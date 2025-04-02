import { Link, NavLink } from "react-router-dom";

const LINKS =[
    {to:'/', label: '홈'},
    {to:'/movies/popular', label: '인기영화'},
    {to:'/movies/now_playing', label: '상영 중'},
    {to:'/movies/top_rated', label: '평점 높은'},
    {to:'/movies/upcoming', label: '개봉 예정'},
];


export const Navbor = () => {
    return(
        <div className="flex gap-3 p-4">
            {LINKS.map(({to, label}) => (
                <NavLink
                key={to}
                to={to}
                className={({isActive}) => {
                    return isActive ? 'text-[#b2dab1] font-bold' : 'text-gray-500';
                }}
                >
                    {label}
                </NavLink>
            ))}

            {/* 이렇게 Link를 활용해서 이동해도 좋지만 코드가 반복되므로 maping을 하는게 좋음 */}
            {/* <Link to='/'>홈</Link>
            <Link to='/movies/popular'>인기 영화</Link>
            <Link to='/movies/now_playing'>상영 중</Link>
            <Link to='/movies/top_rated'>평점 높은</Link> */}
        </div>
    );
}