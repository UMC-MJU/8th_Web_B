// src/pages/MovieDetailPage.tsx
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Credit, MovieDetail } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const MovieDetailPage = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const MovieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}`
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`

    const { data: movie, isPending: isMovieLoading } = useFetch<MovieDetail>(MovieDetailUrl,"en-US");

    const { data: credits, isPending: isCreditsLoading } = useFetch<Credit>(creditsUrl);

    if (isMovieLoading || isCreditsLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    
    if ( !movie || !credits) {
        return <div>영화 정보를 불러오는 데 실패했습니다.</div>;
    }

    const director = credits.crew.find((member) => member.job === "Director");
    const actors = credits.cast.slice(0, 15);


    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            {/* TOP SECTION - 포스터 + 영화 정보 */}
            <section
                className="relative w-full bg-cover bg-center h-[50vh] flex items-center text-left px-6 md:px-12 lg:px-16 py-8"
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
                    <p className=" text-sm md:text-base">평균: {movie.vote_average.toFixed(1)}</p>
                    <p className=" text-sm md:text-base">{movie.release_date.slice(0,4)}</p>
                    <p className=" text-sm md:text-base">{movie.runtime}분</p>
                    <p className=" text-lg md:text-2xl mt-2 mb-4">{movie.tagline}</p>
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{movie.overview}</p>
                </div>
            </section>

            {/* BOTTOM SECTION - 감독 & 출연진 */}
            <section className="w-full bg-black py-8 px-4 md:px-8 min-h-[50vh]">
                <h2 className="text-2xl font-bold mb-6">감독 / 배우</h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {/* DIRECTOR */}
                    {director && (
                        <div className="w-20 md:w-24 text-center">
                            {director.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                                    alt={director.name}
                                    className="mx-auto mb-2 rounded-full w-20 h-20 md:w-24 md:h-24 object-cover border-2 border-white"
                                />
                            ) : (
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-700 rounded-full mx-auto mb-2" />
                            )}
                            <p className="text-xs md:text-sm font-semibold">{director.name}</p>
                            <p className="text-xs text-gray-400">Director</p>
                        </div>
                    )}

                    {/* ACTORS */}
                    {actors.map(actor => (
                        <div key={actor.id} className="w-20 md:w-24 text-center">
                            {actor.profile_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                    alt={actor.name}
                                    className="mx-auto mb-2 rounded-full w-20 h-20 md:w-24 md:h-24 object-cover border-2 border-white"
                                />
                            ) : (
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-700 rounded-full mx-auto mb-2" />
                            )}
                            <p className="text-xs md:text-sm font-semibold truncate">{actor.name}</p>
                            <p className="text-xs text-gray-400 truncate">{actor.character}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
