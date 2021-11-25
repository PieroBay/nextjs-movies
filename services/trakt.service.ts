import { Axios, AxiosResponse } from 'axios';
import { environment } from '../env';
import { TraktPostTokenModel } from '../models/class/trakt-post-token.model';
import { MergedMovie } from "../models/interfaces/common/movie-merged.interface";
import { MovieTmdbDto } from "../models/interfaces/tmdb/movie.interface";
import { MovieTraktDto } from "../models/interfaces/trakt/entity.interface";
import { TraktAccessInterface } from '../models/interfaces/trakt/trakt-access.interface';

export class TraktService {
    private readonly headers = {
        'trakt-api-key': '9c6b0fdd6caf6917f92aa47ecb11309ae3f844259fe9694efea7792b2dd54192',
        'trakt-api-version': '2'
    }

    constructor(private axios: Axios) {}

    public genOauthLink(): string {
        return `${environment.TRAKT_URI}oauth/authorize?response_type=code&client_id=${environment.CLIENT_ID}&redirect_uri=${environment.REDIRECT_URI}`;
    }

    public getAccessToken(code: string): Promise<TraktAccessInterface> {
        const model = new TraktPostTokenModel();
        model.code = code;
        return this.axios.post(`${environment.TRAKT_URI}oauth/token`, model.toAccessDto()).then(e => e.data);
    }

    public refreshAccessToken(refreshToken: string): Promise<TraktAccessInterface> {
        const model = new TraktPostTokenModel();
        model.refreshToken = refreshToken;
        return this.axios.post(`${environment.TRAKT_URI}oauth/token`, model.toRefreshTokenDto());
    }

    public revokeToken(token: string): Promise<TraktAccessInterface> {
        const model = new TraktPostTokenModel();
        model.token = token;
        return this.axios.post(`${environment.TRAKT_URI}oauth/revoke`, model.toRevokeTokenDto());
    }

    public async getMoviesList(limit: number = 10) {
        return this.axios.get('https://api.trakt.tv/movies/trending?limit=' + limit, {headers: this.headers})
            .then((res: AxiosResponse) => res.data.map((v: any) => v.movie as MovieTraktDto));
    }

    public async getMoviesListSearch(search: string) {
        return this.axios.get('https://api.trakt.tv/movies/trending?limit=10&query=' + search, {headers: this.headers})
            .then((res: AxiosResponse) => res.data.map((v: any) => v.movie as MovieTraktDto));
    }

    public static map2movie(traktDto: MovieTraktDto, tmdbDto: MovieTmdbDto): MergedMovie {
        return {
            poster_path: tmdbDto.poster_path,
            overview: tmdbDto.overview,
            title: traktDto.title,
            year: traktDto.year,
            original_language: tmdbDto.original_language,
            id: traktDto.ids.tmdb.toString()
        }
    }
}