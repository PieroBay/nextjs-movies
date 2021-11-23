import { Button, Container, Typography } from "@mui/material";
import axios from 'axios';
import type { NextPage } from 'next';
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import BasicCard from "../components/card";
import ButtonAppBar from "../components/navbar";

const client_id = '9c6b0fdd6caf6917f92aa47ecb11309ae3f844259fe9694efea7792b2dd54192';
const client_secret = '4e7e11e2a9a50b4b4e918375491e620d8d4701681aecd16f1b743cbe554eb883';
const redirect_uri = 'http://localhost:3000/login';
const linkToOauth = `https://trakt.tv/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`;

const linkTotraktOauth =
    <Button variant="contained" href={linkToOauth}>Login with Trakt</Button>;

const getUrlCodeAndConvertToToken = async (code: string) => {
    const data = await axios.post('https://api.trakt.tv/oauth/token', {
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type: 'authorization_code'
    });

}

const Login: NextPage = () => {
    const { query } = useRouter();

    useEffect(() => {
        if (query.code) {
            getUrlCodeAndConvertToToken(query.code.toString());
        }
    });

    return <div>
        <ButtonAppBar title="Login"/>
        <Typography align="center" variant="h1">Login</Typography>
        <Container maxWidth="sm">
            <BasicCard title="Login" content={linkTotraktOauth} />
        </Container>
    </div>
}

export default Login
