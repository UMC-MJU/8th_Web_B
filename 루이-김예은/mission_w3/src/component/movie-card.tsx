import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl shadow-md group transform transition duration-300 hover:scale-105">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      {/* hover 시 텍스트 + blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h2 className="text-base font-bold mb-1">{movie.title}</h2>
        <p className="text-sm line-clamp-3">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
