export interface IImageEditorProps {
    aspect: number | undefined;
    image: string;
    setLoadData: (state: boolean) => void;
    setData: (data: string) => void;
    width: number;
}

export enum PropertiesName {
    BRIGHTNESS = 'brightness',
    CONTRAST = 'contrast',
    GRAYSCALE = 'grayscale',
    SATURATE = 'saturate'
}

export enum Sides {
    WIDTH,
    HEIGHT
}

export interface IImageData {
    name: string;
    value: number;
}

export interface IImagePropertiesData {
    [PropertiesName.BRIGHTNESS]: IImageData
    [PropertiesName.CONTRAST]: IImageData
    [PropertiesName.GRAYSCALE]: IImageData,
    [PropertiesName.SATURATE]: IImageData
}