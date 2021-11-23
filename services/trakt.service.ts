import { Axios } from 'axios';
import { environment } from '../env';
import { TraktAccessInterface } from '../interfaces/trakt-access.interface';
import { TraktPostTokenModel } from '../models/trakt-post-token.model';

export class TraktService {

    constructor(private axios: Axios) {}

    public genOauthLink(): string {
        return `${environment.TRAKT_URI}oauth/authorize?response_type=code&client_id=${environment.CLIENT_ID}&redirect_uri=${environment.REDIRECT_URI}`;
    }

    public getAccessToken(code: string): Promise<TraktAccessInterface> {
        const model = new TraktPostTokenModel();
        model.code = code;
        return this.axios.post(`${environment.TRAKT_URI}ooauth/token`, model.toAccessDto());
    }

    public refreshAccessToken(refreshToken: string): Promise<TraktAccessInterface> {
        const model = new TraktPostTokenModel();
        model.refreshToken = refreshToken;
        return this.axios.post(`${environment.TRAKT_URI}ooauth/token`, model.toRefreshTokenDto());
    }

    public revokeToken(token: string): Promise<TraktAccessInterface> {
        const model = new TraktPostTokenModel();
        model.token = token;
        return this.axios.post(`${environment.TRAKT_URI}ooauth/revoke`, model.toRevokeTokenDto());
    }
}