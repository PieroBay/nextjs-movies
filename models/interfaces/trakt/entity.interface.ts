import { EntityTypeEnum } from "../../enum/entity-type.enum";

export interface EntityListTraktDto {
    title: string;
    type: EntityTypeEnum;
    year: number;
    description: string;
    id: string;
}

export interface TraktIdsDto {
    trakt: number;
    imdb: string;
    tmdb: number;
    slug?: string;
    tvdb?: number;
}

export interface MovieTraktDto {
    title: string;
    year: number;
    ids: TraktIdsDto;
}

export interface MovieShowWatchedTraktDto {
    last_watched_at: string;
    movie?: MovieTraktDto;
    show?: ShowTraktDto;
}

export interface ShowTraktDto {
    title: string;
    year: number;
    ids: TraktIdsDto;
}

export interface SeasonTraktDto {
    number: number;
    ids: TraktIdsDto;
}

export interface EpisodeTraktDto {
    season: number;
    number: number;
    title: string;
    ids: TraktIdsDto;
}

export interface PersonTraktDto {
    name: string;
    ids: TraktIdsDto;
}