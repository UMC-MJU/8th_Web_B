import { useState } from "react";
import { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";

export default function MoviePage() {
  const [Page, setPage] = useState(1);
  const { Category } = useParams<{
    Category: string;
  }>();

  const url = `https://api.themoviedb.org/3/movie/${Category}?language=ko-KR&page=${Page}`;

  const {
    data: movies,
    isPending,
    isError,
  } = useCustomFetch<MovieResponse>(url);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">!공습경보!</span>
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
          disabled={Page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >{`<`}</button>
        <span>{Page}페이지</span>
        <button
          className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer"
          onClick={() => setPage((prev) => prev + 1)}
        >{`>`}</button>
      </div>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 ">
          {movies?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
