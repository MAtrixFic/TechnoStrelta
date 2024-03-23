'use client'
import React, { useEffect, useState } from 'react'

import { ContentType } from '@/types/card.type'
import { IVideoProps, IImageProps } from '@/types/newfileform.type'
import { OperationTypes } from '@/types/newfileform.type'
import CreateAlbumLink from '../AddNewFileForm/CreateDataButton'
import NewFileForm from '../AddNewFileForm/NewFileForm'
import ImageEditCard from '../ContentCards/EditCards/ImageEditCard'
import VideoEditCard from '../ContentCards/EditCards/VideoEditCard'
import ContentViewer from '../ContentViewer/ContentViewer'
import Card from '../Albums/AlbumCard'

const UserSpace = () => {
    const [newData, useNewData] = useState<boolean>(false);
    const [openViewer, useOpenViewer] = useState<boolean>(false);

    const [operationType, useOperationType] = useState<OperationTypes>(OperationTypes.CREATE)
    const [contentType, useContentType] = useState<ContentType>(ContentType.PHOTO);

    const [videoData, useVideoData] = useState<IVideoProps | undefined>(undefined);
    const [imageData, useImageData] = useState<IImageProps | undefined>(undefined);

    function CheckActive(_contentType: ContentType) {
        return contentType === _contentType ? 'active' : ''
    }

    useEffect(() => {
        const body = document.querySelector('body')
        newData || openViewer ? body!.style.overflow = "hidden" : body!.style.overflow = "auto"
    }, [newData, openViewer])

    useEffect(() => {
        if (!newData) {
            useVideoData(undefined)
            useImageData(undefined)
        }
    }, [newData])

    useEffect(() => {
        if (!openViewer) {
            useVideoData(undefined)
            useImageData(undefined)
        }
    }, [openViewer])

    return (
        <div className="user-space">
            <div className="user-space__panel">
                <button className={`user-space__link ${CheckActive(ContentType.PHOTO)}`} onClick={() => useContentType(ContentType.PHOTO)}>Фото</button>
                <button className={`user-space__link ${CheckActive(ContentType.ALBUM)} album`} onClick={() => useContentType(ContentType.ALBUM)}>Альбомы</button>
                <button className={`user-space__link ${CheckActive(ContentType.VIDEO)}`} onClick={() => useContentType(ContentType.VIDEO)}>Видео</button>
            </div>
            {openViewer && <ContentViewer imageData={imageData} videoData={videoData} setOpenViewer={useOpenViewer} />}
            {newData && <NewFileForm setImage={useImageData} setVideo={useVideoData} operationType={operationType} setLoadData={useNewData} Video={videoData} Image={imageData} albumFlug imageFlug videoFlug />}
            <div className="user-space__data">
                <div className="user-space__add-block">
                    <CreateAlbumLink changeOperation={useOperationType} newData={useNewData} />
                </div>
                <div className="user-space__list">
                    {contentType === ContentType.PHOTO ?
                        <>
                            <ImageEditCard openViewer={useOpenViewer} setData={useImageData} openEditor={useNewData} title='Vertical Rem' meta={undefined} location={{ latitude: '26.41241', longitude: '52.212' }} tags={['beauty', 'sister', 'anime']} data={require('@/images/remVertical.jpg')} />
                            <ImageEditCard openViewer={useOpenViewer} setData={useImageData} openEditor={useNewData} title='Ayanami Rey' meta={undefined} location={{ latitude: '86.14241', longitude: '36.2' }} tags={['anime', 'blue haired']} data={require('@/images/ai.jpg')} />
                            <ImageEditCard openViewer={useOpenViewer} setData={useImageData} openEditor={useNewData} title='Void Image' meta={undefined} location={{ latitude: '58.411241', longitude: '40.262' }} tags={['anime', 'no image']} data={require('@/images/void.png')} />
                            <ImageEditCard openViewer={useOpenViewer} setData={useImageData} openEditor={useNewData} title='Emiliya' meta={undefined} location={{ latitude: '56.41241', longitude: '70.2142' }} tags={['anime', 're:Zero']} data={require("@/images/emiliya.jpg")} />
                        </>
                        :
                        contentType === ContentType.VIDEO ?
                            <>
                                <VideoEditCard openViewer={useOpenViewer} setData={useVideoData} openEditor={useNewData} title='AK' tags={['home', 'pc']} data={require("@/videos/am.mp4")} />
                                <VideoEditCard openViewer={useOpenViewer} setData={useVideoData} openEditor={useNewData} title='Yao Miko' tags={['pinterest']} data={require("@/videos/yao.mp4")} />
                            </>
                            :
                            <>
                                <Card title={'main'} tags={['main', 'anime']} link='anime' src={require('@/images/emiliya.jpg')} />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserSpace
