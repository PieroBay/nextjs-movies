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
    const [isSaw, setIsSaw] = useState<boolean>(false);
    const [isAlreadyAdded, setIsAlreadyAdded] = useState<boolean>(false);

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
        await router.back();
    }

    async function markAsSaw() {
        if (traktService) {
            await traktService.setWatched(entity!.id);
        }
    }

    async function addToWatchList() {
        if (traktService) {
            await traktService.setToWatched(entity!.id);
        }
    }

    const sawItBtn = (isSaw: boolean) => <Button variant="contained" disabled={isSaw} onClick={markAsSaw}
                                                 endIcon={<Icon>visibility</Icon>}>
        {isSaw ? 'Already mark as saw' : 'I saw it'}
    </Button>

    const addToWatchBtn = (isAlreadyAdded: boolean) => <Button variant="contained" disabled={isAlreadyAdded}
                                                               onClick={addToWatchList} color={"success"}
                                                               sx={{marginLeft: 1}}
                                                               endIcon={<Icon>add</Icon>}>
        {isAlreadyAdded ? 'already in watchlist' : 'add it to watch list'}
    </Button>

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
                {sawItBtn(isSaw)}
                {addToWatchBtn(isAlreadyAdded)}
            </div>
        }

    </Container>

}

export default MovieDetail