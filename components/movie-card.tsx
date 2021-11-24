import React from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

export interface MovieCardProps {
    imageUrl?: string;
    title: string;
    year: string | number;
    description: string;
    lang: string;
}

export class MovieCard extends React.Component<MovieCardProps, any> {
    render() {
        return <Card sx={{maxWidth: 345, margin: 1}}>
            <CardMedia
                component="img"
                height="auto"
                image={"https://image.tmdb.org/t/p/original/" + this.props.imageUrl}
            />
            <CardContent>
                <Typography marginBottom={2} variant="h5" noWrap component="div">
                    {
                        `${this.props.title}`
                    }
                </Typography>
                <Typography marginBottom={1} variant="body1" component="div">
                    {
                        `(${this.props.year} - ${this.props.lang?.toUpperCase()})`
                    }
                </Typography>
                <Typography variant="body2" align={"justify"}>
                    {this.props.description}
                </Typography>
            </CardContent>
            <div style={{flexGrow: 1}}/>
            <CardActions sx={{justifyContent: 'flex-end'}}>
                <Button size="small">Details</Button>
            </CardActions>
        </Card>;
    }
}