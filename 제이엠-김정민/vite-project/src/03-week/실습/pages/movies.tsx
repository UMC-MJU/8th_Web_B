import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Movie, MovieResponse } from "../types/movie";

import axios from "axios";

// movies.tsx
const Movies = () => {
    const [movies,setMovies] = useState<Movie[]>([]);

    console.log(movies);

useEffect(()=> {
    const fetchMovies = async () => {
        //응답에 대한 타입 설정
        const {data} = await axios.get<MovieResponse>(
            `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Y2U5ZTZlYmU2ZmMyZTc3MjU3Njk1M2M4OTdjZjMyMCIsIm5iZiI6MTc0MzU1OTgwNi44NzYsInN1YiI6IjY3ZWM5YzdlMzVmNWI3MGUzYWNlNTM0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HHRv6UnT_hNXvjEx4-Zf1UeF11omFSsq1FV-x0_G4UQ`,
                },
            }
        );
        setMovies(data.results);
    };

    fetchMovies();
},[]);

    // useParams를 활용하면 파라미터에 대해 받아볼 수 있음.
    // const params = useParams();
    // console.log(params);
    return (
        // params.movieId라고 나오는 이유: crateBrowserRouter에서 path로 :movies 이렇게 작성해서 => movieId라고 나옴
        // <h1>{params.movieId}번의 Movies Page 야호~!</h1>
        <>
        <h1>영화 데이터 불러오자</h1>  
        <ul>
            {/* 옵셔널 체인 활용 */}
        {movies?.map((movie) => (
            <li key ={movie.id}>
                <h1>{movie.title}</h1>
            </li>
        ))}
        </ul>
        </>
    );
};

export default Movies;
