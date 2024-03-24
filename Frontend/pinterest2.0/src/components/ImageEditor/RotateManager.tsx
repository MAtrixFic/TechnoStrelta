import React, { useState, useEffect, useRef } from 'react'
import ButtonFuncLink from './ButtonFuncLink'

interface RotateManagerProps {
    canvas: CanvasRenderingContext2D;
    canvasWidth: number;
    updateImageFunc: () => void;
}

const RotateManager = ({ canvas, canvasWidth, updateImageFunc }: RotateManagerProps) => {
    const [rotateAngle, useRotateAngle] = useState<number>(0)
    const [currentAngle, useCurrentAngle] = useState<number>(0)
    let inputAngleRef = useRef<HTMLInputElement>(null)

    function RotateObject(canvas: CanvasRenderingContext2D, rotation: number, canvasWidth: number, updateImage: () => void) {
        canvas?.clearRect(0, 0, canvasWidth, canvasWidth);
        canvas?.translate(canvasWidth / 2, canvasWidth / 2);
        canvas?.rotate((rotation * Math.PI) / 180);
        canvas?.translate(-canvasWidth / 2, -canvasWidth / 2);
        updateImage();
    }

    useEffect(() => {
        useCurrentAngle(prev => prev + rotateAngle)
    }, [rotateAngle])

    useEffect(() => {
        RotateObject(canvas, rotateAngle, canvasWidth, updateImageFunc)
    }, [currentAngle])

    return (
        <div className="image-editor__rotate-block">
            <input ref={inputAngleRef} type="number" defaultValue={0}
                onBlur={event => {
                    if (event.target.value.length === 0 || Number(event.target.value) > 360 || Number(event.target.value) < -360)
                        event.target.value = '0'
                    useRotateAngle(Number(event.target.value) - currentAngle)
                }}
            />
        </div>
    )
}

export default RotateManager
