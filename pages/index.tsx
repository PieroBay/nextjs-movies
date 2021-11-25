import {Container, Typography} from "@mui/material";
import axios from "axios";
import type {NextPage, NextPageContext} from 'next';
import {useEffect, useState} from "react";
import Loading from "../components/loading";
import {MovieCard} from "../components/movie-card";
import {authFromNextPageCtx, redirectToLogin} from '../lib/auth.ctx';
import {EntityTypeEnum} from "../models/enum/entity-type.enum";
import {MergedMovie} from "../models/interfaces/common/movie-merged.interface";
import {TmdbService} from '../services/tmdb.service';
import {TraktService} from '../services/trakt.service';
import styles from './search/Search.module.css';
import {useRouter} from "next/dist/client/router";

const Home: NextPage = () => {
    const tmdbService = new TmdbService(axios);
    const traktService = new TraktService(axios);
    const router = useRouter();

    // state
    const [movies, setMovies] = useState<MergedMovie[]>();
    const [series, setSeries] = useState<MergedMovie[]>();
    const [searchInProgress, setSearchInProgress] = useState({show: false, movie: false});

    async function getWatchedMoviesShow(type: EntityTypeEnum) {
        setSearchInProgress({...searchInProgress, [type]: true});
        const movieCalls = [];
        let limit = 5;

        for (const movieTraktDto of await traktService.getWatched(type)) {
            if (movieTraktDto && limit > 0) {
                const tmdbCall = (type === EntityTypeEnum.MOVIE)
                    ? tmdbService.getMovieDetails(movieTraktDto.ids.tmdb)
                    : tmdbService.getShowDetails(movieTraktDto.ids.tmdb);
                movieCalls.push(TraktService.map2movie(movieTraktDto,
                    await tmdbCall))
            }
            limit--;
        }
        (type === EntityTypeEnum.MOVIE) ? setMovies(movieCalls) : setSeries(movieCalls);

        setSearchInProgress({...searchInProgress, [type]: false});
    }

    useEffect(() => {
        getWatchedMoviesShow(EntityTypeEnum.MOVIE);
        getWatchedMoviesShow(EntityTypeEnum.SHOW);
    }, [])

    function onClickDetail(entityId: string): void {
        router.push('/details/' + entityId);
    }


    function getMoviesTemplate(movies: MergedMovie[]): JSX.Element {
        return <div className={styles.filmListLine}>
            {movies.map((n) => {
                return <MovieCard
                    key={n.id}
                    id={n.id_tmdb}
                    title={n.title}
                    imageUrl={n.poster_path}
                    onClickDetails={onClickDetail}
                />
            })
            }
        </div>
    }

    return <div>
        <Typography align="center" variant="h1">Dashboard</Typography>
        <Container maxWidth="md">
            <Typography align="center" variant="h3">Derniers Films vues</Typography>
            {
                (!searchInProgress || !searchInProgress.movie) && movies ? getMoviesTemplate(movies) : <Loading/>
            }
            <Typography align="center" variant="h3">Derniers épisodes vues</Typography>
            {
                (!searchInProgress || !searchInProgress.show) && series ? getMoviesTemplate(series) : <Loading/>
            }

        </Container>
    </div>

}

Home.getInitialProps = async (ctx: NextPageContext) => {
    const auth = authFromNextPageCtx(ctx);
    const res = ctx.res;
    if (!auth) {
        console.log(auth)
        redirectToLogin(res!);
    }
    return {
        props: {}
    }
}

export default Home
