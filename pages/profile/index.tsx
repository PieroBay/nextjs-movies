import { Container, Icon, IconButton } from "@mui/material";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { authFromNextPageCtx } from "../../lib/auth.ctx";
import { TraktService } from "../../services/trakt.service";

const Profile: NextPage = (props: PropsWithChildren<any>) => {
    const profile = props.profile;
    const router = useRouter();

    async function goBack() {
        await router.back();
    }

    return <Container>
        <IconButton color="primary" onClick={goBack}>
            <Icon color="primary">arrow_back</Icon> Back
        </IconButton>
        coucou { profile.username }
    </Container>
}

export async function getServerSideProps(ctx: NextPageContext) {
    const auth = authFromNextPageCtx(ctx);
    if (!auth) {
        return {
            redirect: {
                destination: '/login'
            }
        }
    }

    const traktService = new TraktService(axios, auth);
    const profile = await traktService.getProfileInfos();

    return {
        props: {
            profile
        }
    }

}



export default Profile;