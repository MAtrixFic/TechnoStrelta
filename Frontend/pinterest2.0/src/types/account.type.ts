import { AlbumTypes } from "./card.type";
import type { IAlbumCardProps } from "./card.type";

export interface IChangeAlbumTypeButtonProps {
    className: string;
    id: AlbumTypes;
    active: string;
    changeAlbumType: ChangeAlbumType;
    title: string;
}

type ChangeAlbumType = {
    (type: AlbumTypes): void;
}

export interface ICards{
    public: IAlbumCardProps[];
    collaboration: IAlbumCardProps[];
    private: IAlbumCardProps[];
}