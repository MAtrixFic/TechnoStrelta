'use client'
import '@/styles/imageeditor.scss'
import 'react-image-crop/src/ReactCrop.scss'

import React, { useState, useRef, useEffect } from 'react'

import ButtonFuncLink from './ButtonFuncLink'
import RotateManager from './RotateManager'
import { type IImageEditorProps, type IImagePropertiesData, PropertiesName, Sides, DEFAULT_IMAGE_DATA, ImageDownScaleAndSet } from '@/types/imageeditor.type'
import ReactCrop, { type Crop } from 'react-image-crop'

const ImageEditor = ({ aspect, image, width, setData, setLoadData }: IImageEditorProps) => {
    //настройка параметров изображения
    const [imageRatio, useImageRatio] = useState<number>(() => {
        const img = new Image()
        img.src = image
        return img.height / img.width
    })
    const [imageWidth] = useState<number>(width)
    // ------------------------------------------------------

    function SetImagePosAndScale(ratio: number, side: Sides): [number, number, number, number] {
        switch (side) {
            case Sides.WIDTH:
                return [(width / 2) - (imageWidth / 2), (width / 2) - ((imageWidth * ratio) / 2), imageWidth, imageWidth * ratio]
            case Sides.HEIGHT:
                return [(width / 2) - ((imageWidth / ratio) / 2), (width / 2) - (imageWidth / 2), imageWidth / ratio, imageWidth]
        }
    }

    let canvasRef = useRef<HTMLCanvasElement>(null)
    const [canvas2D, useCanvas2D] = useState<CanvasRenderingContext2D>();
    const [imageData, useImageData] = useState<IImagePropertiesData>(DEFAULT_IMAGE_DATA);
    const [propertyIndex, usePropertyIndex] = useState<PropertiesName>(() => PropertiesName.BRIGHTNESS);
    let sliderRef = useRef<HTMLInputElement>(null);
    const [crop, useCrop] = useState<Crop>({
        unit: 'px',
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });

    function LoadImage() {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas2D?.clearRect(0, 0, width, width);
            canvas2D?.drawImage(img, ...SetImagePosAndScale(imageRatio, imageRatio > 1 ? Sides.HEIGHT : Sides.WIDTH));
        }
    }

    function SaveImage() {
        let imageData;
        if (crop.height === 0 || crop.width === 0)
            imageData = canvas2D?.getImageData(0, 0, width, width)
        else
            imageData = canvas2D?.getImageData(crop.x, crop.y, crop.width, crop.height)

        const ctx = document.createElement('canvas').getContext('2d');
        if (imageData !== undefined && ctx !== null) {
            ImageDownScaleAndSet(imageData, setData, 1, 'image/png');
            setLoadData(false)
        }
    }

    function SetProperties(makeNumll: boolean, value: number = 100) {
        makeNumll ?
            useImageData(DEFAULT_IMAGE_DATA)
            :
            useImageData({ ...imageData, [propertyIndex]: { name: imageData[propertyIndex].name, value: value } })
    }

    useEffect(() => {
        if (canvas2D !== undefined) {
            canvas2D.filter = Object.keys(imageData).map(key => `${key}(${imageData[key as PropertiesName].value}%)`).join(' ')
            LoadImage()
        }
        if (sliderRef.current !== null)
            sliderRef.current.value = String(imageData[propertyIndex].value)

    }, [imageData])

    useEffect(() => {
        const img = new Image();
        img.src = image;
        const ctx = canvasRef.current?.getContext('2d');
        useCanvas2D(ctx as CanvasRenderingContext2D);
        img.onload = () => {
            let imageRatio = img.height / img.width;
            useImageRatio(imageRatio)
            if (canvasRef.current !== null) {
                canvasRef.current.width = width;
                canvasRef.current.height = width;
            }
            ctx?.drawImage(img, ...SetImagePosAndScale(imageRatio, imageRatio > 1 ? Sides.HEIGHT : Sides.WIDTH));
        }
    }, [canvasRef])

    useEffect(() => {
        if (sliderRef.current !== null)
            sliderRef.current.value = String(imageData[propertyIndex].value);
    }, [propertyIndex])

    return (
        <div className='image-editor'>
            <ReactCrop aspect={aspect} ruleOfThirds crop={crop} onChange={cropEvent => { useCrop(cropEvent) }}>
                {<canvas ref={canvasRef} />}
            </ReactCrop>
            <div className="image-editor__manager">
                <div className="image-editor__slider">
                    <span>{imageData[propertyIndex].name}</span>
                    <input type="range" ref={sliderRef} min={0} max={200} onChange={event => SetProperties(false, Number(event.target.value))} />
                </div>
                <div className="image-editor__mods">
                    <ButtonFuncLink modCluss='reset' title={`сбросить`} updateFunc={() => SetProperties(true)} />
                    <ButtonFuncLink modCluss='save' title={`сохранить`} updateFunc={SaveImage} />
                    {Object.keys(imageData).map((key, index) =>
                        <ButtonFuncLink modCluss={key} key={index} title={imageData[key as PropertiesName].name} updateFunc={() => usePropertyIndex(key as PropertiesName)} />
                    )}
                    <RotateManager canvas={canvas2D!} canvasWidth={width} updateImageFunc={() => LoadImage()} />
                </div>
            </div>
        </div>
    )
}
export default ImageEditor;
