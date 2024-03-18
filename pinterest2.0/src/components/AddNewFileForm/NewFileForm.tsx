'use client'
import React, { useState, createContext } from 'react'

import '@/styles/newfile.scss'

import ImageEditor from '../ImageEditor/ImageEditor'
import ImageForm from './ImageForm'
import VideoForm from '../LoadVideo/VideoForm'
import LoadData from './LoadData'
import AlbumForm from '../AlbumCreate/AlbumForm'
import { IAvaContextProps, IImageContextProps, IVideoContextProps, INewFileProps, IMetaData, DataTypes, DEFAULT_META_DATA } from '@/types/newfileform.type'

export const AvaContext = createContext<IAvaContextProps | null>(null)
export const ImageContext = createContext<IImageContextProps | null>(null)
export const VideoContext = createContext<IVideoContextProps | null>(null)

const NewFileForm = ({ defaulVideo, defaulImage, avaFlug, setLoadData, setData, imageFlug, videoFlug, albumFlug }: INewFileProps) => {
    const [loadedData, useLoadedData] = useState<string | null>(defaulImage)
    const [loadedVideo, useLoadedVideo] = useState<string | null>(defaulVideo)
    const [dataType, useDataType] = useState<DataTypes>(DataTypes.PHOTO);
    const [metaData, useMetaData] = useState<IMetaData>(DEFAULT_META_DATA);

    function ResetData() {
        if (dataType === DataTypes.PHOTO) {
            useLoadedData(null)
            setData(null)
            useMetaData(DEFAULT_META_DATA);
        }
        else if (dataType === DataTypes.VIDEO)
            useLoadedVideo(null)

    }

    function CheckActiveType(type: DataTypes) {
        return dataType === type ? 'active' : ''
    }

    return (
        <div className="black-window">
            <div className="new-file-form">
                <div className="new-file-form__downloader" >
                    {avaFlug &&
                        <AvaContext.Provider value={{ setData: useLoadedData, setLoadData: setLoadData }}>
                            {loadedData && <ImageEditor aspect={1} setData={setData} setLoadData={setLoadData} width={600} image={loadedData as string} />}
                            {!loadedData && <LoadData width={200} />}
                        </AvaContext.Provider>}
                    {!avaFlug &&
                        <>
                            <ImageContext.Provider value={{ metaData: metaData, updateMetaData: useMetaData, data: loadedData as string, setData: useLoadedData, setLoadData: setLoadData }}>
                                {(dataType === DataTypes.PHOTO) && <ImageForm />}
                            </ImageContext.Provider>
                            <VideoContext.Provider value={{ setData: useLoadedVideo, setLoadData: setLoadData, data: undefined, src: loadedVideo as string }}>
                                {(dataType === DataTypes.VIDEO) && <VideoForm />}
                            </VideoContext.Provider>
                            {(dataType === DataTypes.ALBUM) && <AlbumForm />}
                        </>
                    }
                </div>
                <div className="new-file-form__manager">
                    <div className="new-file-form__file-types">
                        {!avaFlug &&
                            <>
                                {imageFlug && <button className={`new-file-form__file-type ${CheckActiveType(DataTypes.PHOTO)}`} onClick={() => useDataType(DataTypes.PHOTO)}>Фото</button>}
                                {videoFlug && <button className={`new-file-form__file-type ${CheckActiveType(DataTypes.VIDEO)}`} onClick={() => useDataType(DataTypes.VIDEO)}>Видео</button>}
                                {albumFlug && <button className={`new-file-form__file-type ${CheckActiveType(DataTypes.ALBUM)}`} onClick={() => useDataType(DataTypes.ALBUM)}>Альбом</button>}
                            </>
                        }
                    </div>
                    <button className="new-file-form__btn reset" onClick={ResetData}>Сбросить</button>
                    <button className="new-file-form__btn cancel" onClick={() => setLoadData(false)}>Отмена</button>
                </div>
            </div>
        </div >
    )
}

export default NewFileForm;
