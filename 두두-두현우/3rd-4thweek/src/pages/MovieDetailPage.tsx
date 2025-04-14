import { useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useCustomFetch } from "../hooks/useCustomFetch";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface Credit {
  id: number;
  cast: {
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: {
    name: string;
    job: string;
  }[];
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const [credit] = useState<Credit | null>(null);
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;

  const { isPending, isError, data: movie } = useCustomFetch<MovieDetail>(url);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError || !movie) {
    return (
      <div className="text-red-500">영화 정보를 불러오는 데 실패했습니다.</div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full max-w-md mb-4"
      />
      <p className="text-gray-700">{movie.overview}</p>
      <p className="text-sm text-gray-500 mt-2">개봉일: {movie.release_date}</p>
      <p className="text-sm text-gray-500">평점: {movie.vote_average}</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">감독</h2>
        <ul className="mb-4">
          {credit?.crew
            .filter((person) => person.job === "Director")
            .map((director, index) => (
              <li key={index} className="text-gray-700">
                {director.name}
              </li>
            ))}
        </ul>
        <h2 className="text-2xl font-semibold mb-2">출연진</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {credit?.cast.slice(0, 8).map((actor, index) => (
            <div key={index} className="text-center">
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="rounded-lg mx-auto mb-2"
                />
              ) : (
                <div className="w-[100px] h-[150px] bg-gray-200 rounded mx-auto mb-2" />
              )}
              <p className="font-medium">{actor.name}</p>
              <p className="text-sm text-gray-500">({actor.character})</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
