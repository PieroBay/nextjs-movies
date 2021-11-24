import {Button, Container, Typography} from "@mui/material";
import axios from 'axios';
import type {NextPage} from 'next';
import {useRouter} from "next/dist/client/router";
import {useEffect} from "react";
import BasicCard from "../../components/card";
import {TraktService} from "../../services/trakt.service";

const traktService = new TraktService(axios);

const linkTotraktOauth =
    <Button variant="contained" href={traktService.genOauthLink()}>Login with Trakt</Button>;

const Login: NextPage = () => {
    const {query} = useRouter();

    useEffect(() => {
        if (query.code) {
            const data = async () => {
                await traktService.getAccessToken(query.code as string);
            }
            console.log(data);
        }
    });

    return <div>
        <Typography align="center" variant="h1">Login</Typography>
        <Container maxWidth="sm">
            <BasicCard title="Login" content={linkTotraktOauth}/>
        </Container>
    </div>
}

export default Login
