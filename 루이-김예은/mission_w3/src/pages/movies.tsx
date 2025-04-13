import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../component/movie-card";

import axios from "axios";

// movies.tsx
const MoviesPage = () => {
  const { category } = useParams(); // popular, upcoming, top-rated, now-playing
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      //응답에 대한 타입 정의
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2Y0MTJmZGRiOGQ5MDcxMDhiMjg5YmEyY2RmNWFmOCIsIm5iZiI6MTc0MzUwNTg1NC4yNTEwMDAyLCJzdWIiOiI2N2ViYzliZTUxZjYyNTRmNzY4YmViOGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0-GUQb_Qld5jkm2RQYieJ6IK90XJahc_tL12OUnds7Q",
            },
          }
        );

        setMovies(data.results);
      } catch (err) {
        setError("에러 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <>
      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 pb-10">
        <button
          disabled={page === "1"}
          className="bg-gray-200 px-3 py-2 rounded disabled:opacity-50 cursor-pointer"
          onClick={() => setSearchParams({ page: String(Number(page) - 1) })}
        >
          &lt;
        </button>
        <span>{page} 페이지</span>
        <button
          className="bg-purple-300 px-3 py-2 rounded cursor-pointer"
          onClick={() => setSearchParams({ page: String(Number(page) + 1) })}
        >
          &gt;
        </button>
      </div>

      <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MoviesPage;
