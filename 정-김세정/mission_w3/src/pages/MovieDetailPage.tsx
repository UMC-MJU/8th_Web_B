import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Credit, MovieDetail } from "../types/movieDetail";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MovieDetailPage = () : React.ReactElement => {
    const { movieId } = useParams<{movieId: string}>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credit | null>(null);
    //1. 로딩 상태
    const [isPending, setIsPending] = useState(false);
    //2. 에러 상태
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () : Promise<void> => {
            setIsPending(true);
            try {
                const [movieRes, creditRes] = await Promise.all([
                    axios.get<MovieDetail>(
                        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                        {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            },
                        }
                    ),
                    axios.get<Credit>(
                        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                        {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            },
                        }
                    ),
                ]);

                setMovie(movieRes.data);
                setCredits(creditRes.data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovieDetails();
    },[movieId]);

    if (isError) {
        return (
        <div>
            <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
        </div>
        );
    }

    if (isPending || !movie || !credits){
        return (
            <div className='flex justify-center items-center h-dvh'>
                <LoadingSpinner />
            </div>
        );
    }

    const directorList = credits.crew.filter((p) => p.job === "Director" );
    const castList = credits.cast.slice(0, 20);


    return (
        <div className='text-white'>
            <div
            className='relative h-[500px] bg-cover bg-center flex items-end'
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
            >
                <div className='bg-black/60 w-full p-10'>
                <h1 className='text-4xl font-bold'>{movie.title}</h1>
                <p className='mt-2 text-sm'>
                    평균 {movie.vote_average.toFixed(1)} • {movie.release_date.slice(0, 4)} • {movie.runtime}분
                </p>
                <p className='italic mt-3 text-lg text-[#b2dab1]'>
                    {movie.tagline}
                </p>
                <p className='mt-4 text-sm text-gray-300 max-w-4xl leading-relaxed'>
                    {movie.overview}
                </p>
                </div>
            </div>

            <div className='bg-black px-8 py-10'>
                <h2 className='text-2xl font-bold mb-6'>감독/출연</h2>
                <div className='flex flex-wrap gap-6'>
                    {[...directorList, ...castList].map((person) => (
                        <div
                        key={person.id}
                        className='w-24 text-center text-sm flex-shrink-0'
                        >
                            <div className='w-24 h-24 rounded-full ovverflow-hidden bg-gray-300 mx-auto mb-2 border border-white'>
                                {person.profile_path ? (
                                    <img
                                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                                    alt={person.name}
                                    className='w-full h-full object-cover rounded-full'
                                    />
                                ) : (
                                    <div className='w-full h-full flex items-center justify-center text-xs text-gray-500'>
                                        No Image
                                    </div>
                                )}
                                </div>
                                <p className='font-semibold leading-tight'>{person.name}</p>
                                {"character" in person && (
                                    <p className='text-gray-400 text-xs leading-tight mt-1'>
                                        {person.character}
                                    </p>
                                )}
                                {"job" in person && (
                                    <p className='text-gray-400 text-xs leading-tight mt-1'>
                                        {person.job}
                                    </p>
                                )}
                            </div>
                    ))}
                </div>
            </div>
        </div>
        
    );
};

export default MovieDetailPage;