export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[]; // 실제로 들어오는거는 여러개의 영화 데이터니 Movie의 배열로 표현
  total_pages: number;
  total_results: number;
};

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: { id: number; name: string }[];
};

// 출연진 및 감독 정보
export type Cast = {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string;
};

export type Crew = {
  department: string;
  job: string;
  name: string;
};

export type CreditResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};
