import {Genres, MovieTmdbDto} from "../models/interfaces/tmdb/movie.interface";
import {CardMedia, Chip, Container, Typography} from "@mui/material";
import styles from "../pages/details/Detail.module.css";
import {POSTER_BASE_URL} from "../services/tmdb.service";
import {currencyFormatter} from "../lib/format";
import Icon from "@mui/material/Icon";
import React from "react";

export function getDetailTemplate(entity: MovieTmdbDto): JSX.Element {
    function goToSite() {
        window.open(entity.homepage, '_blank');
    }

    return <Container sx={{maxWidth: '100'}}>
        <div className={styles.topSection}>
            <CardMedia
                component="img"
                sx={{width: 350}}
                image={POSTER_BASE_URL() + entity.poster_path}
            />
            <div className={styles.descriptionSection}>
                <Typography marginBottom={0} variant="h3">{entity.title}</Typography>
                <Typography marginBottom={1} variant="h5">{entity.release_date}</Typography>
                <Typography marginBottom={1} variant="body1">
                    {currencyFormatter.format(entity.budget)}
                </Typography>
                <div style={{display: 'flex'}}>
                    <div className='iconAndText'>
                        <Icon color={'success'}>volunteer_activism</Icon>
                        <p>{entity.vote_average}/10</p>
                    </div>
                    <div className='iconAndTextClickable' onClick={goToSite}>
                        <Icon color={'primary'}>public</Icon>
                        <Typography marginBottom={1} variant="body1" color={'primary'}>website</Typography>
                    </div>
                </div>
                {getChip(entity.genres)}
                <Typography variant="body1" align={"justify"}>{entity.overview}</Typography>
            </div>
        </div>
    </Container>
}


function getChip(genres: Genres[]) {
    return <div style={{marginBottom: 16}}>{genres.map((g, id) => <Chip key={id} sx={{marginRight: 2}} label={g.name}/>)}</div>
}