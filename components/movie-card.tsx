import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {POSTER_BASE_URL} from "../services/tmdb.service";

export interface MovieCardProps {
    imageUrl?: string;
    title: string;
    year?: string | number;
    description?: string;
    lang?: string;
    id: string;
    onClickDetails: (id: string) => void;
}

export class MovieCard extends React.Component<MovieCardProps, any> {
    constructor(props: MovieCardProps) {
        super(props);
        this.onClickDetail = this.onClickDetail.bind(this);
    }

    onClickDetail() {
        this.props.onClickDetails(this.props.id);
    }

    render() {
        return <Card sx={{maxWidth: 345, margin: 1}}>
            <CardMedia
                component="img"
                height="auto"
                image={POSTER_BASE_URL('w300') + this.props.imageUrl}
            />
            <CardContent>
                <Typography marginBottom={2} variant="h5" noWrap component="div">
                    {
                        `${this.props.title}`
                    }
                </Typography>
                {(this.props.year) ?
                    <Typography marginBottom={1} variant="body1" component="div">
                        {
                            `(${this.props.year} - ${this.props.lang?.toUpperCase()})`
                        }
                    </Typography>
                    : ''}
                <Typography variant="body2" align={"justify"}>
                    {this.props.description}
                </Typography>
            </CardContent>
            <div style={{flexGrow: 1}}/>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <Button size="small" onClick={this.onClickDetail}>Details</Button>
            </CardActions>
        </Card>;
    }
}