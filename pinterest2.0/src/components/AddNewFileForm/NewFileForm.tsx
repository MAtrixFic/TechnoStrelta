'use client'
import React, { useState } from 'react'

import '@/styles/newfile.scss'

import download from '@/images/download.png'

import ImageEditor from '../ImageEditor/ImageEditor'

interface NewFileProps {
    imageFlug: boolean;
    videoFlug: boolean;
    albumFlug: boolean;
    setLoadData: (state: boolean) => void;
    setData: (data: string | undefined) => void;
    defaulImage: string | null;
}

const NewFileForm = ({ defaulImage, setLoadData, setData, imageFlug, videoFlug, albumFlug }: NewFileProps) => {
    const [image, useImage] = useState<string | null>(defaulImage)

    function ConverImageToBase64(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.currentTarget.files !== null) {
            const file = event.currentTarget.files[0];
            const reader = new FileReader();

            reader.onloadend = function () {
                const base64 = reader.result;
                useImage(base64 as string)
            };

            reader.readAsDataURL(file);
        }
    }

    function ResetData() {
        setData(undefined)
        useImage(null)
    }

    return (
        <div className="black-window">
            <div className="new-file-form">
                <div className="new-file-form__downloader" >
                    {image && <ImageEditor aspect={1} setData={setData} setLoadData={setLoadData} width={600} image={image as string} />}
                    {!image && <label className="new-file-form__load-img">
                        <img src={download.src} width={200} alt="Загрузка файла" />
                        <input name='avatar' type="file" accept=".jpg, .jpeg, .png" onChange={ConverImageToBase64} required />
                    </label>}
                </div>
                <div className="new-file-form__manager">
                    <div className="new-file-form__file-types">
                        {imageFlug && <button className="new-file-form__file-type">Фото</button>}
                        {videoFlug && <button className="new-file-form__file-type">Видео</button>}
                        {albumFlug && <button className="new-file-form__file-type">Альбом</button>}
                    </div>
                    <button className="new-file-form__btn reset" onClick={ResetData}>Сбросить</button>
                    <button className="new-file-form__btn cancel" onClick={() => setLoadData(false)}>Отмена</button>
                </div>
            </div>
        </div>
    )
}

export default NewFileForm;
