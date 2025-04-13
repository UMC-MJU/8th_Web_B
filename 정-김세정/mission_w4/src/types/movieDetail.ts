export interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    tagline: string;
    genres: {id: number; name: string}[];
}

export interface Credit {
    id: number;
    cast: {
        id: number;
        name: string;
        profile_path: string | null;
        character: string;
    }[];
    crew: {
        id: number;
        name: string;
        job: string;
        profile_path: string | null;
    }[];
}