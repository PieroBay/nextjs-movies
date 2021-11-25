import { Axios, AxiosResponse } from "axios";
import { MovieTmdbDto } from "../models/interfaces/tmdb/movie.interface";


export const POSTER_BASE_URL = (definition: 'w300' | 'w500' |'original' = 'original' ) => `https://image.tmdb.org/t/p/${definition}`

export class TmdbService {
    private readonly apiKey = '0feabd20b772d9bda58cfd77e6c7ba7b';

    constructor(private axios: Axios) {
    }

    public async getMovieDetails(id: number): Promise<MovieTmdbDto> {
        return this.axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`)
            .then((res: AxiosResponse) => res.data);
    }

    public async getShowDetails(id: number): Promise<MovieTmdbDto> {
        return this.axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}`)
            .then((res: AxiosResponse) => res.data);
    }
}