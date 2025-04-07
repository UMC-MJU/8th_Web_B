import { useState } from "react"
import { Movie } from "../types/movie"
import { useNavigate } from "react-router-dom";

interface MovieCardProps{
    movie: Movie
}

export default function MovieCard({movie}: MovieCardProps) {
    const [isHovered,setIsHovered] = useState(false);
    // React는 SPA로써 전체페이지를 새고로침하지 않고 특정 컴포넌트만 바뀌는 것 처럼 작동.

    const navigate = useNavigate();

    return (
        <div 
        onClick={() => navigate(`/movie/${movie.id}`)}
        // overflow-hidden은 HTML(width, height)를 지정했을 때, 내용이 넘치면 뒷부분을 짤라줌
        className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer
        w-44 transition-transform duration-500 hover:scale-105'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} 영화의 이미지`}
            className=""
            />


        {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50
            to-transparent backdrop-blur-md 
            flex flex-col justify-center item-center 
            text-white p-4">
                <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
                <p className="text-sm text-gray-300 mt-2
                line-clamp-5">
                {movie.overview}
                </p>
            </div>
        )}
        </div>
    )
}
