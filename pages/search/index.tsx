import type {NextPage, NextPageContext} from 'next'
import {MovieCard} from "../../components/movie-card";
import {SearchInput} from "../../components/search-input";
import styles from './Search.module.css';
import {PropsWithChildren, useState} from "react";
import {TmdbService} from "../../services/tmdb.service";
import Loading from "../../components/loading";
import axios from "axios";
import {TraktService} from "../../services/trakt.service";
import {MergedMovie} from "../../models/interfaces/common/movie-merged.interface";

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

    async function onSearchChange(searchText: string) {
        if (!searchInProgress) {
            setSearchInProgress(true);
            lastSearchQueue = '';
            const movies = [];
            for (const movieTraktDto of await traktService.getMoviesListSearch(searchText)) {
                movies.push(TraktService.map2movie(movieTraktDto, await tmdbService.getMovieDetails(movieTraktDto.ids.tmdb)))
            }
            setMovies(movies)
            setSearchInProgress(false);
            if (lastSearchQueue) {
                await onSearchChange(lastSearchQueue)
            }
        } else {
            lastSearchQueue = searchText;
        }
    }

    function getMoviesTemplate(movies: MergedMovie[]): JSX.Element {
        return <div className={styles.filmList}>
            {movies.map((n) =>
                <MovieCard key={n.poster_path}
                           title={n.title}
                           description={n.overview}
                           year={n.year}
                           imageUrl={n.poster_path}
                           lang={n.original_language}/>)
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

export async function getServerSideProps(ctx: NextPageContext): Promise<{ props: { movies: MergedMovie[] } }> {
    const tmdbService = new TmdbService(axios);
    const traktService = new TraktService(axios);
    // const auth = authFromNextPageCtx(ctx);

    const movies = [];
    for (const movieTraktDto of await traktService.getMoviesList(10)) {
        movies.push(TraktService.map2movie(movieTraktDto, await tmdbService.getMovieDetails(movieTraktDto.ids.tmdb)))
    }

    return {
        props: {
            movies
        }
    }
}

export default Search
