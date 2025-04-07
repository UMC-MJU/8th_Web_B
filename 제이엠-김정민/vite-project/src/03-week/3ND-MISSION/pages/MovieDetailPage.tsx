import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Credit, MovieDetail } from '../types/movie';

export const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credit | null>(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const [movieRes, creditsRes] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }),
                    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }),
                ]);

                setMovie(movieRes.data);
                setCredits(creditsRes.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (isPending) {
        return <div className="flex items-center justify-center h-dvh"><LoadingSpinner/></div>;
    }

    if (!movie || !credits) {
        return <div className="flex items-center justify-center h-dvh">
            <LoadingSpinner/>
            영화 정보를 불러올 수 없습니다.
            </div>;
    }

    const director = credits.crew.find(member => member.job === 'Director');
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
                    <p className="mb-2 text-sm md:text-base">개봉일: {movie.release_date}</p>
                    <p className="mb-2 text-sm md:text-base">평점: {movie.vote_average}</p>
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
};
