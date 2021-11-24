import type {NextPage} from 'next'
import {MovieCard} from "../../components/movie-card";
import {SearchInput} from "../../components/search-input";
import styles from './Search.module.css';
import {PropsWithChildren, useState} from "react";
import {TmdbService} from "../../lib/services/tmdb.service";
import {map2movie, MergedMovie} from "../../lib/mapper";
import {TraktService} from "../../lib/services/trakt.service";
import Loading from "../../components/loading";

export interface SearchPageProps {
    movies: MergedMovie[];
    tmdbService: TmdbService;
    traktService: TraktService;
}

const Search: NextPage<SearchPageProps> = (props: PropsWithChildren<SearchPageProps>) => {
    // services
    const tmdbService = TmdbService.getInstance();
    const traktService = TraktService.getInstance();
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
                movies.push(map2movie(movieTraktDto, await tmdbService.getMovieDetails(movieTraktDto.ids.tmdb)))
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

export async function getServerSideProps(): Promise<{props: {movies: MergedMovie[]}}> {
    const tmdbService = TmdbService.getInstance();
    const traktService = TraktService.getInstance();

    const movies = [];

    for (const movieTraktDto of await traktService.getMoviesList(10)) {
        movies.push(map2movie(movieTraktDto, await tmdbService.getMovieDetails(movieTraktDto.ids.tmdb)))
    }

    return {
        props: {
            movies
        }
    }
}

export default Search
