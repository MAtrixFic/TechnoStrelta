'use client'
import React, { useEffect, useState, createContext } from 'react'

import '@/styles/newfile.scss'

import { IVideoProps, IImageProps, OperationTypes } from '@/types/newfileform.type'

import ImageForm from './ImageForm'
import VideoForm from '../LoadVideo/VideoForm'
import AlbumForm from '../AlbumCreate/AlbumForm'

import { INewFileProps } from '@/types/newfileform.type'
import { ContentType } from '@/types/card.type'

const NewFileForm = ({ contentType, setImage, setVideo, Video, Image, setLoadData, imageFlug, videoFlug, albumFlug, operationType }: INewFileProps) => {
    const [dataType, useDataType] = useState<ContentType>(contentType);

    function CheckActiveType(type: ContentType) {
        return dataType === type ? 'active' : ''
    }

    return (
        <div className="black-window">
            <div className="new-file-form">
                <div className="new-file-form__downloader" >
                    {(dataType === ContentType.PHOTO) && <ImageForm actionType={operationType} setData={setImage} setLoadData={setLoadData} data={Image} />}
                    {(dataType === ContentType.VIDEO) && <VideoForm actionType={operationType} setData={setVideo} setLoadData={setLoadData} data={Video} />}
                    {(dataType === ContentType.ALBUM && operationType !== OperationTypes.UPDATE) && <AlbumForm />}
                </div>
                <div className="new-file-form__manager">
                    <div className="new-file-form__file-types">
                        {imageFlug && <button className={`new-file-form__file-type ${CheckActiveType(ContentType.PHOTO)}`} onClick={() => useDataType(ContentType.PHOTO)}>Фото</button>}
                        {videoFlug && <button className={`new-file-form__file-type ${CheckActiveType(ContentType.VIDEO)}`} onClick={() => useDataType(ContentType.VIDEO)}>Видео</button>}
                        {albumFlug && <button className={`new-file-form__file-type ${CheckActiveType(ContentType.ALBUM)}`} onClick={() => useDataType(ContentType.ALBUM)}>Альбом</button>}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NewFileForm;
