export interface IAlbumCardProps {
    private: boolean,
    view: string,
    link: string
    tags: string[]
}

interface IDataCardProps {
    data: string,
    title: string,
    tags: string[]
}

export interface IPhotoCardProps extends IDataCardProps {
    meta: string,
    location: string
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