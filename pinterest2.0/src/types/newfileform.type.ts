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
    defaulVideo: string | null;
}

export interface IMetaData {
    date?: string;
    latitude?: string;
    longitude?: string;
}

export interface IAvaContextProps extends IChangeData { }
export interface IImageContextProps extends IChangeData {
    data: string;
    updateMetaData: (data: IMetaData) => void;
    metaData: IMetaData | undefined;
}
export interface IVideoContextProps extends IChangeData {
    data: File | undefined;
    src: string
}

export enum DataTypes {
    VIDEO = 'video',
    PHOTO = 'photo',
    ALBUM = 'album',
}

export enum NoData {
    DATE = 'Нет даты',
    LATITUDE = 'Нет широты',
    LONGITUDE = 'Нет долготы'
}
export const DEFAULT_META_DATA = {
    date: NoData.DATE,
    latitude: NoData.LATITUDE,
    longitude: NoData.LONGITUDE,
}


export interface ILoadDataProps {
    width: number;
}

export interface ILoadVideoFormProps extends ILoadDataProps {
    updateFile: (data: File) => void;
}