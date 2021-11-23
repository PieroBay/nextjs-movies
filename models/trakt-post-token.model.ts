import { environment } from "../env";

export interface TraktPostDtoInterface {
    code: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    grant_type: string;
};

export class TraktPostTokenModel {
    public code!: string;
    public client_id: string;
    public client_secret: string;
    public redirect_uri: string;
    public grant_type: string;

    constructor() {
        this.client_id = environment.CLIENT_ID!;
        this.client_secret = environment.CLIENT_SECRET!;
        this.redirect_uri = environment.REDIRECT_URI!;
        this.grant_type = 'authorization_code';
    }

    public toDto(): TraktPostDtoInterface {
        return {
            code: this.code,
            client_id: this.client_id,
            client_secret: this.client_secret,
            redirect_uri: this.redirect_uri,
            grant_type: 'authorization_code'
        }
    }
}