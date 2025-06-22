import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import { MovieResponse } from "../types/movie";

function HomePage() {
  const { data, error, isLoading } = useFetch<MovieResponse>("/search/movie", {
    params: {
      query: "어벤져스",
      include_adult: false,
      language: "ko-KR",
    },
  });

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading... </div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
}

export default HomePage;

// 검색필터
// 영화 무비
