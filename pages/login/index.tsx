import { Button, Container, Typography } from "@mui/material";
import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from "next/dist/client/router";
import { useEffect, useMemo } from "react";
import BasicCard from "../../components/card";
import { useAuth } from "../../lib/auth.ctx";
import { TraktAccessInterface } from "../../models/interfaces/trakt/trakt-access.interface";
import { TraktService } from "../../services/trakt.service";

const Login: NextPage = () => {
    const traktService = useMemo<TraktService>(() => new TraktService(axios), [axios]);
    const {auth, userLoggedIn, userLoggedOut} = useAuth();

    const linkTotraktOauth =
        <Button variant="contained" href={traktService.genOauthLink()}>Login with Trakt</Button>;

    const router = useRouter();

    useEffect(() => {
        if (router.query.code) {
            traktService.getAccessToken(router.query.code as string).then(async (e: TraktAccessInterface) => {
                userLoggedIn(e);
                await router.push('/');
            })
        }
    }, [router.query.code]);

    return <div>
        <Typography align="center" variant="h1">Login</Typography>
        <Container maxWidth="sm">
            {!auth ?
                (<BasicCard title="Login" content={linkTotraktOauth}/>)
                : <Button variant="contained" onClick={userLoggedOut}>Loggout</Button>
            }
        </Container>
    </div>
}

export default Login
