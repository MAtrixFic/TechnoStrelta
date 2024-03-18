export interface IChangeData {
    setLoadData: (state: boolean) => void;
    setData: (data: any) => void;
}

interface IDataCardProps {
    data: any,
    title: string,
    tags: string[],
    openEditor: (flag: boolean) => void;
    setData: (data: IImageProps) => void
}

export interface IPhotoCardProps extends IDataCardProps {
    meta: IMetaData | undefined,
    location: ILocation | undefined
}

export interface INewFileProps {
    setLoadData: (state: boolean) => void;
    setImage: (data: any) => void;
    setVideo: (data: any) => void;
    imageFlug: boolean;
    videoFlug: boolean;
    albumFlug: boolean;
    operationType: OperationTypes;
    Image: IImageProps | undefined;
    Video: IVideoProps | undefined;
}

export interface ILocation {
    latitude?: string;
    longitude?: string;
}

export interface IMetaData {
    date?: string;
    city?: string;
}

export interface IImageProps {
    data: any,
    title: string | undefined,
    tags: string[] | undefined,
    meta: IMetaData | undefined,
    location: ILocation | undefined
}

export interface IImageFormProps extends IImageProps, IChangeData {
}

export interface IVideoProps {
    data: any,
    title: string,
    tags: string[]
}

export enum DataTypes {
    VIDEO = 'video',
    PHOTO = 'photo',
    ALBUM = 'album',
}

export enum OperationTypes {
    UPDATE,
    CREATE
}

export interface ILoadDataProps {
    width: number;
    uploadData: (data: string) => void;
}

export interface ILoadVideoFormProps extends ILoadDataProps {
    updateFile: (data: File) => void;
}