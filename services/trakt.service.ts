import { Axios, AxiosResponse } from 'axios';
import { environment } from '../env';
import { TraktPostTokenModel } from '../models/class/trakt-post-token.model';
import { EntityTypeEnum } from '../models/enum/entity-type.enum';
import { MergedMovie } from "../models/interfaces/common/movie-merged.interface";
import { MovieTmdbDto } from "../models/interfaces/tmdb/movie.interface";
import { MovieTraktDto, ProfileTraktDto } from "../models/interfaces/trakt/entity.interface";
import { TraktAccessInterface } from '../models/interfaces/trakt/trakt-access.interface';

export class TraktService {
  private readonly baseHeaders = {
    'trakt-api-key':
      '9c6b0fdd6caf6917f92aa47ecb11309ae3f844259fe9694efea7792b2dd54192',
    'trakt-api-version': '2'
  };

  private readonly headers = this.auth
    ? {
        ...this.baseHeaders,
        Authorization: 'Bearer ' + this.auth.access_token
      }
    : this.baseHeaders;

  constructor(private axios: Axios, private auth?: TraktAccessInterface) {}

  public static map2movie(
    traktDto: MovieTraktDto,
    tmdbDto: MovieTmdbDto
  ): MergedMovie {
    return {
      poster_path: tmdbDto.poster_path,
      id: traktDto.ids.trakt,
      overview: tmdbDto.overview,
      title: traktDto.title,
      year: traktDto.year,
      original_language: tmdbDto.original_language,
      id_tmdb: traktDto.ids.tmdb.toString()
    };
  }

  public genOauthLink(): string {
    return `${environment.TRAKT_URI}oauth/authorize?response_type=code&client_id=${environment.CLIENT_ID}&redirect_uri=${environment.REDIRECT_URI}`;
  }

  public getAccessToken(code: string): Promise<TraktAccessInterface> {
    const model = new TraktPostTokenModel();
    model.code = code;
    return this.axios
      .post(`${environment.TRAKT_URI}oauth/token`, model.toAccessDto())
      .then((e) => e.data);
  }

  public refreshAccessToken(
    refreshToken: string
  ): Promise<TraktAccessInterface> {
    const model = new TraktPostTokenModel();
    model.refreshToken = refreshToken;
    return this.axios.post(
      `${environment.TRAKT_URI}oauth/token`,
      model.toRefreshTokenDto()
    );
  }

  public revokeToken(token: string): Promise<TraktAccessInterface> {
    const model = new TraktPostTokenModel();
    model.token = token;
    return this.axios.post(
      `${environment.TRAKT_URI}oauth/revoke`,
      model.toRevokeTokenDto()
    );
  }

  public async getMoviesList(limit: number = 10): Promise<MovieTraktDto[]> {
    return this.axios
      .get(`${environment.TRAKT_URI}movies/trending?limit=${limit}`, {
        headers: this.headers
      })
      .then((res: AxiosResponse) =>
        res.data.map((v: any) => v.movie as MovieTraktDto)
      );
  }

  public async getMoviesListSearch(search: string): Promise<MovieTraktDto[]> {
    return this.axios
      .get(
        `${environment.TRAKT_URI}search/movie?query=${search}&fields=title&limit=15`,
        { headers: this.headers }
      )
      .then((res: AxiosResponse) =>
        res.data.map((v: any) => v.movie as MovieTraktDto)
      );
  }

  public async getWatched(type: EntityTypeEnum): Promise<MovieTraktDto[]> {
    return this.axios
      .get(`${environment.TRAKT_URI}sync/history/${type}s`, {
        headers: this.headers
      })
      .then((res: AxiosResponse) =>
        res.data.map((v: any) => ({ id: v.id, ...v[type] } as MovieTraktDto))
      );
  }

  public async getWatchList(type: EntityTypeEnum): Promise<MovieTraktDto[]> {
    console.log(this.auth);
    return this.axios
      .get(`${environment.TRAKT_URI}sync/watchlist/${type}s`, {
        headers: this.headers
      })
      .then((res: AxiosResponse) =>
        res.data.map((v: any) => ({ id: v.id, ...v[type] } as MovieTraktDto))
      );
  }

  public async getProfileInfos(): Promise<ProfileTraktDto> {
    return this.axios
      .get(`${environment.TRAKT_URI}users/settings`, {
        headers: this.headers
      })
      .then((e: any) => e.data.user as ProfileTraktDto);
  }

  public async setWatched(tmdbId: number): Promise<any> {
    return this.axios.post(
      `${environment.TRAKT_URI}sync/history`,
      { movies: [{ ids: { tmdb: tmdbId } }] },
      { headers: this.headers }
    );
  }

  public async removeWatched(tmdbId: number): Promise<any> {
    return this.axios.post(
      `${environment.TRAKT_URI}sync/history/remove`,
      { movies: [{ ids: { tmdb: tmdbId } }] },
      { headers: this.headers }
    );
  }

  public async setToWatched(tmdbId: number): Promise<any> {
    return this.axios.post(
      `${environment.TRAKT_URI}sync/watchlist`,
      { movies: [{ ids: { tmdb: tmdbId } }] },
      { headers: this.headers }
    );
  }
}