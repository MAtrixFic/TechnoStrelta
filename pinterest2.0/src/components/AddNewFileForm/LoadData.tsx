import React, { useState, useRef, useContext } from 'react'
import { AvaContext, ImageContext, VideoContext } from './NewFileForm';
import * as ExifReader from 'exifreader';
import { NoData } from '@/types/newfileform.type';
import { type ILoadDataProps } from '@/types/newfileform.type';


const LoadData = ({ width }: ILoadDataProps) => {
    const ratio = 268 / 218; //отношение картинки "файл"
    const getAvaContext = useContext(AvaContext); //контекст для аватарки 
    const getImageContext = useContext(ImageContext); //контекст для фото

    function GetMetaDataForMetaAndLocation(file: File) {
        ExifReader.load(file).then(data => {
            console.log(data)
            if (getImageContext) {
                getImageContext.updateMetaData({
                    date: data.DateTime ? data.DateTime.description : NoData.DATE,
                    latitude: data.GPSLatitude ? data.GPSLatitude.description : NoData.LATITUDE,
                    longitude: data.GPSLongitude ? data.GPSLongitude.description : NoData.LONGITUDE
                })
            }
        })
    }

    function ConverImageToBase64(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.currentTarget.files !== null) {
            const file = event.currentTarget.files[0];
            console.log(file);
            const reader = new FileReader();
            GetMetaDataForMetaAndLocation(file);
            reader.onloadend = function () {
                const base64 = reader.result;
                getAvaContext?.setData(base64 as string)
                getImageContext?.setData(base64 as string)
            };

            reader.readAsDataURL(file);
        }
    }

    //картинка "файл" - тут
    return (
        <label className="new-file-form__load-img">
            <svg width={width} height={width * ratio} viewBox="0 0 218 268" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M96 10H30C18.9543 10 10 18.9543 10 30V192C10 203.046 18.9543 212 30 212H99.1012C99.0341 210.842 99 209.675 99 208.5C99 194.285 103.985 181.234 112.302 171H37C33.6863 171 31 168.314 31 165C31 161.686 33.6863 159 37 159H123C123.693 159 124.36 159.118 124.979 159.334C133.363 153.607 143.286 149.969 154 149.168V67H126C109.432 67 96.0005 53.5685 96.0005 37V8.46816V0C96.0005 0 98.7591 0.643708 104 3.42972C110.981 7.14011 122.365 14.6502 137.5 29.5C151.493 43.2291 158.097 52.9152 161.214 59C164 64.4385 164 67 164 67H164V149.251C194.283 152.026 218 177.493 218 208.5C218 241.361 191.361 268 158.5 268C130.282 268 106.653 248.358 100.538 222H30C13.4315 222 0 208.569 0 192V30C0 13.4315 13.4315 0 30 0H96V10ZM31 111C31 107.686 33.6863 105 37 105H91C94.3137 105 97 107.686 97 111C97 114.314 94.3137 117 91 117H37C33.6863 117 31 114.314 31 111ZM37 132C33.6863 132 31 134.686 31 138C31 141.314 33.6863 144 37 144H126C129.314 144 132 141.314 132 138C132 134.686 129.314 132 126 132H37ZM158.5 260C186.943 260 210 236.943 210 208.5C210 180.057 186.943 157 158.5 157C130.057 157 107 180.057 107 208.5C107 236.943 130.057 260 158.5 260ZM160.828 244.828L186.284 219.373C187.846 217.81 187.846 215.278 186.284 213.716C184.722 212.154 182.19 212.154 180.627 213.716L162 232.343V176C162 173.791 160.209 172 158 172C155.791 172 154 173.791 154 176V232.343L135.373 213.716C133.81 212.154 131.278 212.154 129.716 213.716C128.154 215.278 128.154 217.81 129.716 219.373L155.172 244.828C156.734 246.391 159.266 246.391 160.828 244.828ZM104 37V12.6362C110.422 16.5346 119.845 23.386 131.897 35.2105C142.682 45.7915 148.689 53.6525 152.015 59H126C113.85 59 104 49.1503 104 37Z" fill="#006ADC" />
            </svg>
            <input type="file" accept=".jpg, .jpeg, .png" onChange={ConverImageToBase64} />
        </label>
    )
}

export default LoadData
