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
    SATURATE = 'saturate',
    SEPIA = 'sepia',
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
    [PropertiesName.SATURATE]: IImageData,
    [PropertiesName.SEPIA]: IImageData
}

export const DEFAULT_IMAGE_DATA: IImagePropertiesData = {
    [PropertiesName.BRIGHTNESS]: { name: 'яркость', value: 100 },
    [PropertiesName.CONTRAST]: { name: 'котрастность', value: 100 },
    [PropertiesName.GRAYSCALE]: { name: 'сероватость', value: 0 },
    [PropertiesName.SATURATE]: { name: 'насыщенность', value: 100 },
    [PropertiesName.SEPIA]: { name: 'античность', value: 0 }
}

//fuctions 

function BlobToImage(_blob: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(_blob);
    reader.onloadend = () => {
        console.log(reader.result);
    }
}

function ImageDataToImage(imagedata: ImageData) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx?.putImageData(imagedata, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    return image;
}

export function ImageDownScaleAndSet(_imageData: ImageData, _setData: (data: string) => void, quality: number, type: string) {
    const canvas = document.createElement("canvas");
    canvas.width = _imageData.width;
    canvas.height = _imageData.height;
    const ctx = canvas.getContext("2d");
    ctx?.putImageData(_imageData, 0, 0);

    canvas.toBlob(blob => {
        if (blob) {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                console.log(reader.result)
                _setData(reader.result as string)
            }
        }

    }, type, quality);
}

export async function FromBase64ToFile(base64: string, name: string) {
    const data = await fetch(base64)
        .then(res => res.blob())
        .then(blob => {
            const file = new File([blob], name, { type: "image/jpeg" })
            return file
        })
    return data;
}