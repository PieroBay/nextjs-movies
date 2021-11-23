import { Button, Container, Typography } from "@mui/material";
import type { NextPage } from 'next';
import BasicCard from "../components/card";
import ButtonAppBar from '../components/navbar';

const linkTotraktOauth = () => {
    const clientId = process.env.CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URI;
    const linkToOauth = `https://trakt.tv/oauth/authorize?response_type=code&client_id=9b36d8c0db59eff5038aea7a417d73e69aea75b41aac771816d2ef1b3109cc2f&redirect_uri=http://localhost:3000`;
    return <Button variant="contained" href={linkToOauth}>Login with Trakt</Button>
}

const Login: NextPage = () => {
    return <div>
        <ButtonAppBar title="Login"/>
        <Typography align="center" variant="h1">Login</Typography>
        <Container maxWidth="sm">
            <BasicCard title="Login" content={linkTotraktOauth()} />
        </Container>
    </div>
}

export default Login
