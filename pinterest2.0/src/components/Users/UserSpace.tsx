'use client'
import React, { useEffect, useState } from 'react'

import { ContentType } from '@/types/card.type'
import { IVideoProps, IImageProps, OperationTypes, newFileRequest } from '@/types/newfileform.type'
import CreateAlbumLink from '../AddNewFileForm/CreateDataButton'
import NewFileForm from '../AddNewFileForm/NewFileForm'
import ImageEditCard from '../ContentCards/EditCards/ImageEditCard'
import VideoEditCard from '../ContentCards/EditCards/VideoEditCard'
import ContentViewer from '../ContentViewer/ContentViewer'
import Card from '../Albums/AlbumCard'
import { IImageEditorProps } from '@/types/imageeditor.type'
import { createContext } from 'react'

interface Id {
    setData: (data: any) => void;
    data: any[]
}

export const imgContext = createContext<Id | null>(null)

const ImageDatas = [
    {
        title: 'Vertical Rem',
        location: { latitude: '26.41241', longitude: '52.212' },
        tags: ['beauty', 'sister', 'anime'],
        data:
            require('@/images/remVertical.jpg')
    },
    {
        title: 'Rmiliya',
        location: { latitude: '26.41241', longitude: '52.212' },
        tags: ['beauty'],
        data:
            require('@/images/emiliya.jpg')
    },
]

export default function UserSpace() {
    const [newData, useNewData] = useState<boolean>(false);
    const [openViewer, useOpenViewer] = useState<boolean>(false);
    const [users, setUsers] = useState<any[]>(() => ImageDatas)

    const [videoData, useVideoData] = useState<IVideoProps | undefined>(undefined);
    const [imageData, useImageData] = useState<IImageProps | undefined>(undefined);

    const [newFileReq, useNewFileReq] = useState<newFileRequest>({
        video: true,
        image: true,
        album: true,
        contentType: ContentType.PHOTO,
        reqType: OperationTypes.CREATE
    })

    function CheckActive(_contentType: ContentType) {
        return newFileReq.contentType === _contentType ? 'active' : ''
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
                <button className={`user-space__link ${CheckActive(ContentType.PHOTO)}`} onClick={() => useNewFileReq({ ...newFileReq, contentType: ContentType.PHOTO })}>Фото</button>
                <button className={`user-space__link ${CheckActive(ContentType.ALBUM)} album`} onClick={() => useNewFileReq({ ...newFileReq, contentType: ContentType.ALBUM })}>Альбомы</button>
                <button className={`user-space__link ${CheckActive(ContentType.VIDEO)}`} onClick={() => useNewFileReq({ ...newFileReq, contentType: ContentType.VIDEO })}>Видео</button>
            </div>
            {openViewer && <ContentViewer imageData={imageData} videoData={videoData} setOpenViewer={useOpenViewer} />}
            <imgContext.Provider value={{setData: setUsers, data: users}}>
                {newData && <NewFileForm setImage={useImageData} setVideo={useVideoData} operationType={newFileReq.reqType} setLoadData={useNewData} Video={videoData} Image={imageData} albumFlug={newFileReq.album} imageFlug={newFileReq.image} videoFlug={newFileReq.video} contentType={newFileReq.contentType} />}
            </imgContext.Provider>
            <div className="user-space__data">
                <div className="user-space__add-block">
                    <CreateAlbumLink setNewFileRequest={useNewFileReq} newData={useNewData} />
                </div>
                <div className="user-space__list">
                    {newFileReq.contentType === ContentType.PHOTO ?
                        <>
                            {users.map((el, index) =>
                                <ImageEditCard userData={users} setUserData={setUsers} key={index} id={index} canEdit setNewFileRequest={useNewFileReq} openViewer={useOpenViewer} setData={useImageData} openEditor={useNewData} title={el.title} meta={undefined} location={el.location} tags={el.tags} data={el.data} />
                            )}
                        </>
                        :
                        newFileReq.contentType === ContentType.VIDEO ?
                            <>
                                <VideoEditCard canEdit id={0} setNewFileRequest={useNewFileReq} openViewer={useOpenViewer} setData={useVideoData} openEditor={useNewData} title='AK' tags={['home', 'pc']} data={require("@/videos/am.mp4")} />
                                <VideoEditCard canEdit id={0} setNewFileRequest={useNewFileReq} openViewer={useOpenViewer} setData={useVideoData} openEditor={useNewData} title='Yao Miko' tags={['pinterest']} data={require("@/videos/yao.mp4")} />
                            </>
                            :
                            <>
                                <Card title={'main'} link='anime' src={require('@/images/emiliya.jpg')} />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

