export interface IImageEditorProps {
    image: string;
    width: number;
}

export enum PropertiesName {
    BRIGHTNESS = 'brightness',
    CONTRAST = 'contrast'
}

export interface IImageData {
    name: string;
    value: number;
}

export interface IImagePropertiesData {
    [PropertiesName.BRIGHTNESS]: IImageData
    [PropertiesName.CONTRAST]: IImageData
}