import { Button, Container, Typography } from "@mui/material";
import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from "next/dist/client/router";
import Router from 'next/router';
import { useContext, useEffect } from "react";
import BasicCard from "../../components/card";
import ButtonAppBar from "../../components/navbar";
import { TraktAccessInterface } from "../../models/interfaces/trakt/trakt-access.interface";
import { TraktService } from "../../services/trakt.service";
import { GlobalStateContext } from "../../states/global.state";

const Login: NextPage = () => {
    const global = useContext(GlobalStateContext);

    const traktService = new TraktService(axios);
    const linkTotraktOauth =
        <Button variant="contained" href={traktService.genOauthLink()}>Login with Trakt</Button>;
    const {query} = useRouter();

    useEffect(() => {
        if (global.token) {
            Router.push('/');
        }
        if (query.code) {
            traktService.getAccessToken(query.code as string).then((e: TraktAccessInterface) => {
                global.update({token: e.access_token});
                window.localStorage.setItem('token', e.access_token);
                Router.push('/');
            })
        }
    });

    return <div>
        <ButtonAppBar title="Login"/>
        <Typography align="center" variant="h1">Login</Typography>
        <Container maxWidth="sm">
            {(!global.token) ?
                (<BasicCard title="Login" content={linkTotraktOauth}/>)
                : ''
            }
        </Container>
    </div>
}

export default Login
