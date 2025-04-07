import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetail, CreditResponse } from "../types/movie";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<CreditResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2Y0MTJmZGRiOGQ5MDcxMDhiMjg5YmEyY2RmNWFmOCIsIm5iZiI6MTc0MzUwNTg1NC4yNTEwMDAyLCJzdWIiOiI2N2ViYzliZTUxZjYyNTRmNzY4YmViOGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0-GUQb_Qld5jkm2RQYieJ6IK90XJahc_tL12OUnds7Q`,
              },
            }
          ),
          axios.get<CreditResponse>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2M2Y0MTJmZGRiOGQ5MDcxMDhiMjg5YmEyY2RmNWFmOCIsIm5iZiI6MTc0MzUwNTg1NC4yNTEwMDAyLCJzdWIiOiI2N2ViYzliZTUxZjYyNTRmNzY4YmViOGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0-GUQb_Qld5jkm2RQYieJ6IK90XJahc_tL12OUnds7Q`,
              },
            }
          ),
        ]);

        setMovie(movieRes.data);
        setCredits(creditRes.data);
      } catch (err) {
        setError("영화 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div className="text-center py-10">로딩 중...</div>;
  if (error || !movie)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="p-6 text-black">
      <div
        className="relative w-full h-[400px] bg-cover bg-center rounded-xl overflow-hidden"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        {/* 내용 박스 */}
        <div className="absolute inset-0 flex flex-col justify-start text-black p-6">
          <div className="relative z-10 w-1/4">
            <h1 className="text-3xl font-bold mb-1">{movie.title}</h1>
            <p className="italic text-sm text-gray-300">{movie.tagline}</p>

            <div className="mt-2 text-sm flex items-center gap-4">
              <span>{movie.release_date}</span>
              <span>{movie.runtime}분</span>
            </div>

            <p className="text-yellow-400 mt-1">⭐ {movie.vote_average}</p>
            <p className="mt-4 text-sm leading-relaxed max-w-4xl">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">감독 / 출연</h2>
        <div className="flex flex-wrap gap-4">
          {credits?.cast?.slice(0, 15).map((person) => (
            <div key={person.cast_id} className="w-[100px] text-center">
              {person.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                  className="rounded-full w-[80px] h-[80px] object-cover mx-auto"
                />
              ) : (
                <div className="rounded-full w-[80px] h-[80px] bg-gray-700 mx-auto" />
              )}
              <p className="text-sm mt-2">{person.name}</p>
              <p className="text-xs text-gray-400">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
