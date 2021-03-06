import type {GetStaticProps, NextPage, NextPageContext} from 'next'
import {MovieCard} from "../../components/movie-card";
import {SearchInput} from "../../components/search-input";
import styles from './Search.module.css';
import {PropsWithChildren, useState} from "react";
import {TmdbService} from "../../services/tmdb.service";
import Loading from "../../components/loading";
import axios from "axios";
import {TraktService} from "../../services/trakt.service";
import {MergedMovie} from "../../models/interfaces/common/movie-merged.interface";
import {useRouter} from "next/dist/client/router";

export interface SearchPageProps {
    movies: MergedMovie[];
    tmdbService: TmdbService;
    traktService: TraktService;
}

const Search: NextPage<SearchPageProps> = (props: PropsWithChildren<SearchPageProps>) => {
    // services
    const tmdbService = new TmdbService(axios);
    const traktService = new TraktService(axios);
    // state
    const [movies, setMovies] = useState<MergedMovie[]>(props.movies);
    const [searchInProgress, setSearchInProgress] = useState(false);
    // props
    let lastSearchQueue = ''
    const router = useRouter();

    async function onSearchChange(searchText: string) {
        if(!searchText) {
            setSearchInProgress(true);
            const movies = [];
            for (const movieTraktDto of await traktService.getMoviesList(10)) {
                movies.push(TraktService.map2movie(movieTraktDto, await tmdbService.getMovieDetails(movieTraktDto.ids.tmdb)));
            }
            setMovies(movies)
            setSearchInProgress(false);
        }
        if (!searchInProgress && searchText.length >= 3) {
            setSearchInProgress(true);
            lastSearchQueue = '';
            const movies = [];
            for (const movieTraktDto of await traktService.getMoviesListSearch(searchText)) {
                try {
                    movies.push(TraktService.map2movie(movieTraktDto, await tmdbService.getMovieDetails(movieTraktDto.ids.tmdb)));
                } catch (e) {
                    console.log(e)
                }
            }
            setMovies(movies)
            setSearchInProgress(false);
            if (lastSearchQueue) {
                console.log('lastqueue', lastSearchQueue)
               // await onSearchChange(lastSearchQueue)
            }
        } else {
            lastSearchQueue = searchText;
        }
    }

    function onClickDetail(entityId: string): void {
        router.push('/details/' + entityId);
    }

    function getMoviesTemplate(movies: MergedMovie[]): JSX.Element {
        return <div className={styles.filmList}>
            {movies.map((n) =>
                <MovieCard key={n.id}
                           title={n.title}
                           description={n.overview}
                           year={n.year}
                           imageUrl={n.poster_path}
                           lang={n.original_language}
                           id={n.id_tmdb}
                           onClickDetails={onClickDetail}
                />)
            }
        </div>
    }

    return <div>
        <div className={styles.searchBar}>
            <SearchInput onSearchChange={onSearchChange}/>
        </div>
        {
            searchInProgress ? <Loading/> : getMoviesTemplate(movies)
        }
    </div>
}

export async function getStaticProps(ctx: NextPageContext) {
    const tmdbService = new TmdbService(axios);
    const traktService = new TraktService(axios);
    // const auth = authFromNextPageCtx(ctx);

    const movies = [];
    for (const movieTraktDto of await traktService.getMoviesList(10)) {
        movies.push(TraktService.map2movie(movieTraktDto, await tmdbService.getMovieDetails(movieTraktDto.ids.tmdb)));
    }



    return {
        props: {
            movies
        },
        revalidate: 60
    }
}

export default Search
