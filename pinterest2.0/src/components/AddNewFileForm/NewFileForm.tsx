'use client'
import React, { useState, createContext } from 'react'

import '@/styles/newfile.scss'

import ImageEditor from '../ImageEditor/ImageEditor'
import NewData from './NewData'
import LoadData from './LoadData'
import { IAvaContextProps, IImageContextProps, IVideoContextProps, INewFileProps, IMetaData, DataTypes, DEFAULT_META_DATA } from '@/types/newfileform.type'

export const AvaContext = createContext<IAvaContextProps | null>(null)
export const ImageContext = createContext<IImageContextProps | null>(null)
export const IVideoContext = createContext<IVideoContextProps | null>(null)

const NewFileForm = ({ defaulImage, avaFlug, setLoadData, setData, imageFlug, videoFlug, albumFlug }: INewFileProps) => {
    const [loadedData, useLoadedData] = useState<string | ArrayBuffer | null>(defaulImage)
    const [dataType, useDataType] = useState<DataTypes>(DataTypes.PHOTO);

    const [metaData, useMetaData] = useState<IMetaData>(DEFAULT_META_DATA);

    function ResetData() {
        setData(null)
        useLoadedData(null)
        useMetaData(DEFAULT_META_DATA);
    }

    function CheckActiveType(type: DataTypes) {
        return dataType === type ? 'active' : ''
    }

    return (
        <div className="black-window">
            <div className="new-file-form">
                <div className="new-file-form__downloader" >
                    {avaFlug && <AvaContext.Provider value={{ setData: useLoadedData, setLoadData: setLoadData }}>
                        {loadedData && <ImageEditor aspect={1} setData={setData} setLoadData={setLoadData} width={600} image={loadedData as string} />}
                        {!loadedData && <LoadData width={200} />}
                    </AvaContext.Provider>}
                    {!avaFlug && <ImageContext.Provider value={{ metaData: metaData, updateMetaData: useMetaData, data: loadedData as string, setData: useLoadedData, setLoadData: setLoadData, dataType: dataType }}>
                        {(dataType === DataTypes.PHOTO) && <NewData />}
                    </ImageContext.Provider>}
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
