import {MovieTmdbDto} from "../../models/interfaces/tmdb/movie.interface";
import axios, {AxiosResponse} from "axios";

export class TmdbService {
    private static _instance: TmdbService;

    private readonly apiKey = '0feabd20b772d9bda58cfd77e6c7ba7b';

    public static getInstance(): TmdbService {
        if (!this._instance) {
            this._instance = new TmdbService();
        }
        return this._instance
    }

    public async getMovieDetails(id: number): Promise<MovieTmdbDto> {
        return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`)
                    .then((res: AxiosResponse) => res.data);
    }
}