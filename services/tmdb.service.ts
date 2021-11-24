import {MovieTmdbDto} from "../models/interfaces/tmdb/movie.interface";
import {Axios, AxiosResponse} from "axios";

export class TmdbService {
    private readonly apiKey = '0feabd20b772d9bda58cfd77e6c7ba7b';

    constructor(private axios: Axios) {
    }

    public async getMovieDetails(id: number): Promise<MovieTmdbDto> {
        return this.axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`)
            .then((res: AxiosResponse) => res.data);
    }
}