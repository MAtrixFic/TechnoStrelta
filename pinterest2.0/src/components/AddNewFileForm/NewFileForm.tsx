'use client'
import React, { useEffect, useState, createContext } from 'react'

import '@/styles/newfile.scss'

import { IVideoProps, IImageProps } from '@/types/newfileform.type'

import ImageForm from './ImageForm'
import VideoForm from '../LoadVideo/VideoForm'
import AlbumForm from '../AlbumCreate/AlbumForm'

import { INewFileProps, IMetaData, DataTypes } from '@/types/newfileform.type'


const NewFileForm = ({ setImage, setVideo, Video, Image, setLoadData, imageFlug, videoFlug, albumFlug }: INewFileProps) => {
    const [dataType, useDataType] = useState<DataTypes>(DataTypes.PHOTO);
    const [imagePath, useImagePath] = useState<string | undefined>(Image?.data);

    function CheckActiveType(type: DataTypes) {
        return dataType === type ? 'active' : ''
    }

    function Reset() {
        if(dataType === DataTypes.PHOTO){
            useImagePath(undefined)
            setImage({data: undefined, tags: undefined, location: undefined, meta: undefined, title: undefined})
        }
    }

    useEffect(()=>{
        console.log(Image)
    }, [Image])

    console.log(Image)

    return (
        <div className="black-window">
            <div className="new-file-form">
                <div className="new-file-form__downloader" >
                    {(dataType === DataTypes.PHOTO) && <ImageForm setData={useImagePath} setLoadData={setLoadData} location={Image?.location} data={imagePath} tags={Image?.tags} title={Image?.title} meta={Image?.meta} />}
                    {(dataType === DataTypes.VIDEO) && <VideoForm />}
                    {(dataType === DataTypes.ALBUM) && <AlbumForm />}
                </div>
                <div className="new-file-form__manager">
                    <div className="new-file-form__file-types">
                        {imageFlug && <button className={`new-file-form__file-type ${CheckActiveType(DataTypes.PHOTO)}`} onClick={() => useDataType(DataTypes.PHOTO)}>Фото</button>}
                        {videoFlug && <button className={`new-file-form__file-type ${CheckActiveType(DataTypes.VIDEO)}`} onClick={() => useDataType(DataTypes.VIDEO)}>Видео</button>}
                        {albumFlug && <button className={`new-file-form__file-type ${CheckActiveType(DataTypes.ALBUM)}`} onClick={() => useDataType(DataTypes.ALBUM)}>Альбом</button>}
                    </div>
                    <button className="new-file-form__btn reset" onClick={Reset} >Сбросить</button>
                    <button className="new-file-form__btn cancel" onClick={() => setLoadData(false)}>Отмена</button>
                </div>
            </div>
        </div >
    )
}

export default NewFileForm;
