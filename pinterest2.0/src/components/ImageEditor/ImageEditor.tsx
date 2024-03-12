'use client'
import '@/styles/imageeditor.scss'
import React, { useState, useRef, useEffect } from 'react'
import ButtonFuncLink from './ButtonFuncLink'

interface IImageEditorProps {
    image: string;
    width: number;
}

enum PropertiesName {
    BRIGHTNESS = 'brightness',
    CONTRAST = 'contrast'
}

interface IImageData {
    name: string;
    value: number;
}

interface IImagePropertiesData {
    [PropertiesName.BRIGHTNESS]: IImageData
    [PropertiesName.CONTRAST]: IImageData
}




const ImageEditor = ({ image, width }: IImageEditorProps) => {
    const imageWidth = width - 25;
    function SetImagePosAndScale(ratio: number): [number, number, number, number] {
        return [(width / 2) - (imageWidth / 2), (width / 2) - ((imageWidth * ratio) / 2), imageWidth, imageWidth * ratio]
    }

    let canvasRef = useRef<HTMLCanvasElement>(null)
    const [canvas2D, useCanvas2D] = useState<CanvasRenderingContext2D>();
    const [imageData, useImageData] = useState<IImagePropertiesData>({
        [PropertiesName.BRIGHTNESS]: { name: 'яркость', value: 100 },
        [PropertiesName.CONTRAST]: { name: 'котрастность', value: 100 },
    });
    const [propertyIndex, usePropertyIndex] = useState<PropertiesName>(() => PropertiesName.BRIGHTNESS)
    let sliderRef = useRef<HTMLInputElement>(null);

    function LoadImage() {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            const imageRatio = img.height / img.width;
            canvas2D!.clearRect(0, 0, width, width);
            canvas2D!.drawImage(img, ...SetImagePosAndScale(imageRatio));
        }
    }

    useEffect(() => {
        const img = new Image();
        img.src = image;
        const ctx = canvasRef.current?.getContext('2d');
        useCanvas2D(ctx as CanvasRenderingContext2D);
        img.onload = () => {
            const imageRatio = img.height / img.width;
            if (canvasRef.current !== null) {
                canvasRef.current.width = width;
                canvasRef.current.height = width;
            }
            ctx?.drawImage(img, ...SetImagePosAndScale(imageRatio));
        }
    }, [canvasRef])

    useEffect(() => {
        if (sliderRef.current !== null)
            sliderRef.current.value = String(imageData[propertyIndex].value);
    }, [propertyIndex])

    return (
        <div className='image-editor'>
            {<canvas style={{ background: 'white', borderRadius: '25px' }} ref={canvasRef} />}
            <div className="image-editor__manager">
                <div className="image-editor__slider">
                    <span>{imageData[propertyIndex].name}</span>
                    <input type="range" ref={sliderRef} defaultValue={imageData[propertyIndex].value} min={0} max={200} onChange={event => {
                        useImageData({ ...imageData, [propertyIndex]: { name: imageData[propertyIndex].name, value: Number(event.target.value) } })
                        canvas2D!.filter = Object.keys(imageData).map(key => `${key}(${imageData[key as PropertiesName].value}%)`).join(' ')
                        console.log(canvas2D?.filter)
                        LoadImage()
                    }} />
                </div>
                <div className="image-editor__mods">
                    {Object.keys(imageData).map((key, index) =>
                        <ButtonFuncLink key={index} title={imageData[key as PropertiesName].name} updateFunc={() => usePropertyIndex(key as PropertiesName)} />
                    )}
                </div>
            </div>
        </div>
    )
}
export default ImageEditor;
