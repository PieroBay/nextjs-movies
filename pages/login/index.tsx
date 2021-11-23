import { Button, Container, Typography } from "@mui/material";
import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import BasicCard from "../../components/card";
import ButtonAppBar from "../../components/navbar";
import { TraktService } from "../../services/trakt.service";

const traktService = new TraktService(axios);

const linkTotraktOauth =
    <Button variant="contained" href={traktService.genOauthLink()}>Login with Trakt</Button>;

const getUrlCodeAndConvertToToken = async (code: string) => {
    useEffect(() => {
        if (code) {
            const data = traktService.getAccessToken(code);
        }
    });
}

const Login: NextPage = () => {
    const { query } = useRouter();

    if (query.code) {
        getUrlCodeAndConvertToToken(query.code?.toString());
    }

    return <div>
        <ButtonAppBar title="Login"/>
        <Typography align="center" variant="h1">Login</Typography>
        <Container maxWidth="sm">
            <BasicCard title="Login" content={linkTotraktOauth} />
        </Container>
    </div>
}

export default Login
