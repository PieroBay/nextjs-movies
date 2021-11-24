import axios, {AxiosResponse} from "axios";
import {MovieTraktDto} from "../../models/interfaces/trakt/entity.interface";

export class TraktService {
    private static _instance: TraktService;
    private readonly headers = {
        'trakt-api-key': '9c6b0fdd6caf6917f92aa47ecb11309ae3f844259fe9694efea7792b2dd54192',
        'trakt-api-version': '2'
    }

    public static getInstance(): TraktService {
        if (!this._instance) {
            this._instance = new TraktService();
        }
        return this._instance
    }

    public async getMoviesList(limit: number = 10) {
        return axios.get('https://api.trakt.tv/movies/trending?limit=' + limit, {headers: this.headers})
            .then((res: AxiosResponse) => res.data.map((v: any) => v.movie as MovieTraktDto));
    }

    public async getMoviesListSearch(search: string) {
        return axios.get('https://api.trakt.tv/movies/trending?limit=10&query=' + search, {headers: this.headers})
            .then((res: AxiosResponse) => res.data.map((v: any) => v.movie as MovieTraktDto));
    }
}