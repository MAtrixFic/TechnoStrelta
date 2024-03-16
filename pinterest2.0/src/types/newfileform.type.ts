export interface IChangeData {
    setLoadData: (state: boolean) => void;
    setData: (data: any) => void;
}

export interface INewFileProps extends IChangeData {
    imageFlug: boolean;
    videoFlug: boolean;
    albumFlug: boolean;
    avaFlug: boolean;
    defaulImage: string | null;
}

export interface IMetaData {
    date?: string;
    latitude?: string;
    longitude?: string;
}

export interface IAvaContextProps extends IChangeData { }
export interface IImageContextProps extends IChangeData {
    dataType: DataTypes;
    data: string;
    updateMetaData: (data: IMetaData) => void;
    metaData: IMetaData | undefined;
}
export interface IVideoContextProps extends IChangeData {
    dataType: DataTypes;
    data: ArrayBuffer | Blob;
}

export enum DataTypes {
    VIDEO = 'video',
    PHOTO = 'photo',
    ALBUM = 'album',
}
export const DEFAULT_META_DATA = {
    date: 'Нет даты',
    latitude: 'Нет широты',
    longitude: 'Нет долготы',
}