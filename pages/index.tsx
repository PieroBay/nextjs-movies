import type {NextPage, NextPageContext} from 'next'
import {Typography} from "@mui/material";
import {authFromNextPageCtx, redirectToLogin, useAuth} from "../lib/auth.ctx";
import {useEffect} from "react";
import Router from 'next/router'

const Home: NextPage = () => {
    const {auth} = useAuth();


    useEffect(() => {
        console.log('------>', auth)
    }, [auth])

    return <div>
        <Typography variant="h1">Index</Typography>
    </div>
}

Home.getInitialProps = async (ctx: NextPageContext) => {
    const auth = authFromNextPageCtx(ctx);
    const res = ctx.res;
    console.log('TEST', auth)
    if(!auth) {
        redirectToLogin(res!);
    } else {
        return {
            props: {}
        }
    }
}

export default Home
