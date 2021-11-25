import { Container, Typography } from "@mui/material";
import axios from "axios";
import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import { MovieCard } from "../components/movie-card";
import ButtonAppBar from "../components/navbar";
import { EntityTypeEnum } from "../models/enum/entity-type.enum";
import { MergedMovie } from "../models/interfaces/common/movie-merged.interface";
import { TmdbService } from '../services/tmdb.service';
import { TraktService } from '../services/trakt.service';
import styles from './search/Search.module.css';

const tmdbService = new TmdbService(axios);
const traktService = new TraktService(axios);

const Home: NextPage = () => {
    // If not logged, redirect to login page
    if (false) {
        Router.push('/login');
    }

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

    function getMoviesTemplate(movies: MergedMovie[]): JSX.Element {
        return <div className={styles.filmListLine}>
            {movies.map((n) =>
                <MovieCard key={n.poster_path}
                    title={n.title}
                    imageUrl={n.poster_path} />)
            }
        </div>
    }

    return <div>
        <ButtonAppBar title="Dashboard"/>
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

export default Home
