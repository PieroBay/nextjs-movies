import CssBaseline from '@mui/material/CssBaseline';
import cookies from 'js-cookie';
import type { AppProps } from 'next/app';
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import ButtonAppBar from "../components/navbar";
import { AuthContext, COOKIES_KEY } from "../lib/auth.ctx";
import { TraktAccessInterface } from "../models/interfaces/trakt/trakt-access.interface";
import '../styles/globals.css';

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
        router.push('/login');
    }

    return <AuthContext.Provider value={{auth, userLoggedIn, userLoggedOut}}>
        <CssBaseline/>
        <ButtonAppBar title={router.route.replace('/', '')}/>
        <Component {...pageProps} />
    </AuthContext.Provider>
}

export default MyApp
