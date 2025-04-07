import { useEffect, useState } from "react"
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
// import NextPage from "../components/NextPage";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);

    // 1.로딩상태
    const [isPending, setIsPending] = useState(false);
    //2. 에러상태
    const [isError, setIsError] = useState(false);
    //3. 페이지
    const [page, setPage] = useState(1);

    const {category} = useParams<{category: string}>();

    // console.log(params);
    
    useEffect(() => {
        // 카테고리가 바뀔 때 페이지를 1로 초기화
        setPage(1);
    }, [category]);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsPending(true);
            try {
                const { data } = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
                        },
                    }
                );
                setMovies(data.results);
                console.log(data.results)
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovies();
    }, [page,category]);

    

    if (isError) {
        return (
            <div className="flex item-ceter gap-3 p-4 bg-red-50 border border-red-300 text-red-800 rounded-xl shadow-sm 
            animate-fade-in">
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    return (
        <>
            {/* <NextPage/> */}
            <div className="flex item-center justify-center gap-6 mt-5">
                <button
                    className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
                hover:bg-[#b2dab1] transition-all duration-300 disabled:bg-gray-300
                cursor-pointer disabled:cursor-not-allowed"
                    disabled={page === 1}
                    onClick={() => setPage((prev): number => prev - 1)}>{'<'}</button>
                <span>{page} 페이지</span>
                <button
                    className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
                hover:bg-[#b2dab1] transition-all duration-300
                cursor-pointer"
                    onClick={() => setPage((prev): number => prev + 1)}>{'>'}</button>
            </div>

            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>
            )}

            {!isPending && (
                <div className="p-10 grid gap-4 grid-cols-2 
                sm:grid-cols-3 md:grid-cols-4 lg:gird-cols-5 xl:gird-cols-6">
                    {movies &&
                        movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                </div>
            )}
        </>
    )
}