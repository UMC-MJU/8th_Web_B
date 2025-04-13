import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useFetch from "../hooks/useFetch";
import { MovieResponse } from "../types/movie";
import { useState } from "react";

export default function MoviePage(): React.ReactElement {
  const { category } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);

  const { data, loading, error } = useFetch<MovieResponse>(
    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
      },
    }
  );

  if (error) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
        cursor-pointer disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          {"<"}
        </button>
        <span>{page} 페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {">"}
        </button>
      </div>

      <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}
