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
    page:number,
    results: Movie[],
    total_Pages: number | undefined,
    total_result: number,
}


export interface MovieDetail {
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    runtime: number;
    tagline: string;
}

export interface Credit {
    crew: { id: number; name: string; job: string; profile_path: string | null; }[];
    cast: { id: number; name: string; profile_path: string | null; character: string; }[];
}

