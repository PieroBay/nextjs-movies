import type {NextPage} from 'next'
import {useRouter} from "next/dist/client/router";
import React, {useEffect, useState} from "react";
import {TmdbService} from "../../services/tmdb.service";
import axios from "axios";
import Loading from "../../components/loading";
import {MovieTmdbDto} from "../../models/interfaces/tmdb/movie.interface";
import {getDetailTemplate} from "../../components/movie-detail";
import {Button, Container, IconButton} from "@mui/material";
import Icon from "@mui/material/Icon";
import styles from "./Detail.module.css";
import {useAuth} from "../../lib/auth.ctx";
import {TraktService} from "../../services/trakt.service";


const MovieDetail: NextPage = () => {
    const router = useRouter()
    // services
    const tmdbService = new TmdbService(axios);
    let traktService: TraktService | undefined = undefined;
    // state
    const [entity, setEntity] = useState<MovieTmdbDto | undefined>(undefined);

    const {auth} = useAuth();

    if (auth) {
        traktService = new TraktService(axios, auth);
    }

    useEffect(() => {
        const fetchDetail = async (detailId: number) => (setEntity(await tmdbService.getMovieDetails(detailId)));
        const id = +(router.query.detailId as string);

        if (!isNaN(id)) {
            fetchDetail(id).then();
        }

    }, [router.query.detailId]);

    async function goBack() {
        await router.push('/search');
    }

    async function markAsSaw() {

    }

    async function addToWatchList() {
        if (traktService) {
            const data = await traktService.setWatched('kqsldjlkqsdljkdsqjlk');
            console.log("--->", data)
        }
    }

    return <Container>
        <IconButton color="primary" onClick={goBack}>
            <Icon color={'primary'}>arrow_back</Icon>
            Back
        </IconButton>
        {
            !entity ? <Loading/> : getDetailTemplate(entity)
        }
        {
            auth && <div className={styles.actionSection}>
                <Button variant="contained" endIcon={<Icon>visibility</Icon>}>
                    I saw it
                </Button>
                <Button variant="contained" onClick={addToWatchList} color={"success"} sx={{marginLeft: 1}}
                        endIcon={<Icon>add</Icon>}>
                    add it to watch list
                </Button>
            </div>
        }

    </Container>

}

export default MovieDetail