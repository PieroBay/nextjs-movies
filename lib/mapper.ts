import {MovieTraktDto} from "../models/interfaces/trakt/entity.interface";
import {MovieTmdbDto} from "../models/interfaces/tmdb/movie.interface";


export function map2movie(traktDto: MovieTraktDto, tmdbDto: MovieTmdbDto): MergedMovie {
    return {
        poster_path: tmdbDto.poster_path,
        overview: tmdbDto.overview,
        title: traktDto.title,
        year: traktDto.year,
        original_language: tmdbDto.original_language
    }
}

export interface MergedMovie {
    poster_path: string;
    overview: string;
    title: string;
    year: number;
    original_language: string;
}