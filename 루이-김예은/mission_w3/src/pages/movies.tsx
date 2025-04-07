import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../component/movie-card";

import axios from "axios";

// movies.tsx
const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      //응답에 대한 타입 정의
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2Y0MTJmZGRiOGQ5MDcxMDhiMjg5YmEyY2RmNWFmOCIsIm5iZiI6MTc0MzUwNTg1NC4yNTEwMDAyLCJzdWIiOiI2N2ViYzliZTUxZjYyNTRmNzY4YmViOGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0-GUQb_Qld5jkm2RQYieJ6IK90XJahc_tL12OUnds7Q",
          },
        }
      );

      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesPage;
