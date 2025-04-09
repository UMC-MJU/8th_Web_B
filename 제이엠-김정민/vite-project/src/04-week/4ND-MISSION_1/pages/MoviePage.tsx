// src/pages/MoviePage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { MovieResponse, Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function MoviePage() {
    const [page, setPage] = useState(1);
    const { category } = useParams<{ category: string }>();
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`
    // 카테고리 바뀔 때 페이지 초기화
    useEffect(() => {
        setPage(1);
    }, [category]);

    const { data, isPending, isError } = useFetch<MovieResponse>(url,"en-US");

    const movies = data?.results || [];

    if (isError) {
        return (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-300 text-red-800 rounded-xl shadow-sm animate-fade-in">
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
                <button
                    className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
                    hover:bg-[#b2dab1] transition-all duration-300 disabled:bg-gray-300
                    cursor-pointer disabled:cursor-not-allowed"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    {'<'}
                </button>
                <span>{page} 페이지</span>
                <button
                    className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
                    hover:bg-[#b2dab1] transition-all duration-300
                    cursor-pointer"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    {'>'}
                </button>
            </div>

            {isPending ? (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {movies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </>
    );
}
