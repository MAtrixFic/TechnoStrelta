export interface IAlbumCardProps {
    title: string;
    src: string;
    tags: string[];
    type: AlbumTypes;
    path: string;
}

export enum AlbumTypes {
    PUBLIC = 'public',
    COLLABORATION = 'collaboration',
    PRIVATE = 'private',
    ALL = 'all'
}

export enum AlbumTags {
    DATE = '#date',
    LOCATION = '#lacation',
}