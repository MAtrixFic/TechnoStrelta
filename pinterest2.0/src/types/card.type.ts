export interface IAlbumCardProps {
    src: any,
    title: string
    link: string
    tags: string[]
}

export interface IVideoCardProps {
    data: string,
    title: string,
    tags: string
}

export enum ContentType {
    ALBUM,
    PHOTO,
    VIDEO
}

export enum AlbumTags {
    DATE = '#date',
    LOCATION = '#location',
}