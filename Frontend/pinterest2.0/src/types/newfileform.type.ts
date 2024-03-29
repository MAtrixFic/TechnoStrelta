import { type ContentType } from "./card.type";

export interface IChangeData {
    setLoadData: (state: boolean) => void;
    setData: (data: any) => void;
    actionType: OperationTypes;
}

interface IDataCardProps {
    id: number,
    canEdit: boolean,
    data: any,
    title: string,
    tags: string[],
    openEditor: (flag: boolean) => void;
    setData: (data: any) => void
    openViewer: (state: boolean) => void
    setNewFileRequest: (data: newFileRequest) => void;
}

export interface IFormButtonProps {
    title: string,
    operation: () => void;
}

export interface IPhotoCardProps extends IDataCardProps {
    meta: IMetaData | undefined,
    location: ILocation | undefined

}

export interface IVideoCardProps extends IDataCardProps { }

export interface IMediaBlockProps {
    title: string;
}

export type newFileRequest = {
    video: boolean;
    image: boolean;
    album: boolean;
    contentType: ContentType;
    reqType: OperationTypes;
}

export interface INewFileProps {
    setLoadData: (state: boolean) => void;
    setImage: (data: any) => void;
    setVideo: (data: any) => void;
    imageFlug: boolean;
    videoFlug: boolean;
    albumFlug: boolean;
    contentType: ContentType;
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
    data: any | undefined,
    title: string | undefined,
    tags: string[] | undefined,
    meta: IMetaData | undefined,
    location: ILocation | undefined
}

export interface IImageFormProps extends IChangeData {
    data: IImageProps | undefined
}

export interface IVideoFormProps extends IChangeData {
    data: IVideoProps | undefined;
}


export interface ILoadVideoProps {
    width: number,
    uploadFile: (file: File, urlFile: string) => void;
}

export interface IVideoProps {
    data: any,
    title: string,
    tags: string[]
}

export enum OperationTypes {
    UPDATE,
    CREATE
}

export interface ILoadDataProps {
    width: number;
    uploadMeta: ((data: IImageProps | string) => void) | undefined;
    uploadImage: ((data: string) => void) | undefined;
    dataInp: string[];
}
