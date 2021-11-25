import CssBaseline from '@mui/material/CssBaseline';
import type {AppProps} from 'next/app';
import '../styles/globals.css';
import {AuthContext, COOKIES_KEY} from "../lib/auth.ctx";
import {useEffect, useState} from "react";
import {TraktAccessInterface} from "../models/interfaces/trakt/trakt-access.interface";
import cookies from 'js-cookie'
import ButtonAppBar from "../components/navbar";
import {useRouter} from "next/dist/client/router";

function MyApp({Component, pageProps}: AppProps) {
    const [auth, setAuth] = useState<TraktAccessInterface | undefined>(undefined)
    const router = useRouter();

    useEffect(() => {
        const authSaved = cookies.get(COOKIES_KEY)
        if (authSaved) {
            setAuth(JSON.parse(authSaved))
        }
    }, [])

    function userLoggedIn(auth: TraktAccessInterface) {
        if (auth) {
            setAuth(auth);
            cookies.set(COOKIES_KEY, JSON.stringify(auth));
        }
    }

    function userLoggedOut() {
        setAuth(undefined)
        cookies.remove(COOKIES_KEY);
    }

    return <AuthContext.Provider value={{auth, userLoggedIn, userLoggedOut}}>
        <CssBaseline/>
        <ButtonAppBar title={router.route.replace('/', '')}/>
        <Component {...pageProps} />
    </AuthContext.Provider>
}

export default MyApp
