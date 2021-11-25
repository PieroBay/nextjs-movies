export interface MovieTmdbDto {
    adult: boolean;
    backdrop_path: string;
    budget: number;
    genres: Genres[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    title: string;
    vote_average: number;
    vote_count: number;

    [key: string]: any // for all unused props
}

export interface Genres {
    name: string;
    id: number;
}