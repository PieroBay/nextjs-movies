import React, {createContext} from "react";
import {TraktAccessInterface} from "../models/interfaces/trakt/trakt-access.interface";
import {NextPageContext} from "next";

export const COOKIES_KEY = 'authInfo'

export const AuthContext = createContext({
    auth: undefined as TraktAccessInterface | undefined,
    userLoggedIn: (authInfo: TraktAccessInterface) => {},
    userLoggedOut: () => {}
});

export const useAuth = () => React.useContext(AuthContext);

export function authFromNextPageCtx(ctx: NextPageContext): TraktAccessInterface | undefined {
    // @ts-ignore
    if (ctx.req?.headers?.cookie) {
        const cookieParsed = parseCookie(ctx.req.headers.cookie);
        return JSON.parse(cookieParsed[COOKIES_KEY]!)
    }
    return undefined;
}

const parseCookie = (str: string) =>
    str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            // @ts-ignore
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {} as AuthCookie);

export interface AuthCookie {
    [COOKIES_KEY: string]: string;
}