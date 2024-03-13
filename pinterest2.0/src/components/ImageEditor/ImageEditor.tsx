'use client'
import '@/styles/imageeditor.scss'
import React, { useState, useRef, useEffect } from 'react'
import ButtonFuncLink from './ButtonFuncLink'
import type { IImageEditorProps, IImagePropertiesData } from '@/types/imageeditor.type'
import { PropertiesName } from '@/types/imageeditor.type'

import 'react-image-crop/src/ReactCrop.scss'
import ReactCrop from 'react-image-crop'
import type { Crop } from 'react-image-crop'

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

    const [newImage, useNewImage] = useState<string>();
    const [crop, useCrop] = useState<Crop>({
        unit: '%',
        x: 0,
        y: 0,
        width: 100,
        height: 100
    });

    function LoadImage() {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            const imageRatio = img.height / img.width;
            canvas2D!.clearRect(0, 0, width, width);
            canvas2D!.drawImage(img, ...SetImagePosAndScale(imageRatio));
        }
    }

    function SaveImage() {
        const imageData = canvas2D?.getImageData(crop.x, crop.y, crop.width, crop.height)
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        if (imageData !== undefined && ctx !== null) {
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            ctx.putImageData(imageData, 0, 0);
            var image = new Image();
            image.src = canvas.toDataURL();
            useNewImage(image.src);
        }
    }

    function RotateObject(rotation: number, canvasWidth: number, canvasHeight: number) {
        canvas2D!.clearRect(0, 0, width, width);
        canvas2D?.translate(canvasWidth / 2, canvasHeight / 2);
        canvas2D?.rotate((rotation * Math.PI) / 180);
        canvas2D?.translate(-canvasWidth / 2, -canvasHeight / 2);
        LoadImage();
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
            {newImage && <img src={newImage} alt='*' />}
            <ReactCrop ruleOfThirds crop={crop} onChange={cropEvent => { useCrop(cropEvent) }}>
                {<canvas ref={canvasRef} />}
            </ReactCrop>
            <div className="image-editor__manager">
                <div className="image-editor__slider">
                    <span>{imageData[propertyIndex].name}</span>
                    <input type="range" ref={sliderRef} min={0} max={200} onChange={event => {
                        useImageData({ ...imageData, [propertyIndex]: { name: imageData[propertyIndex].name, value: Number(event.target.value) } })
                        canvas2D!.filter = Object.keys(imageData).map(key => `${key}(${imageData[key as PropertiesName].value}%)`).join(' ')
                        LoadImage()
                    }} />
                </div>
                <div className="image-editor__mods">
                    {Object.keys(imageData).map((key, index) =>
                        <ButtonFuncLink key={index} title={imageData[key as PropertiesName].name} updateFunc={() => usePropertyIndex(key as PropertiesName)} />
                    )}
                    <div className="image-editor__transform">
                        <ButtonFuncLink title='image' updateFunc={SaveImage} />
                    </div>
                    <div className="image-editor__transform">
                        <ButtonFuncLink title='<' updateFunc={() => RotateObject(90, width, width)} />
                    </div>
                    <div className="image-editor__transform">
                        <ButtonFuncLink title='>' updateFunc={() => RotateObject(-90, width, width)} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ImageEditor;
