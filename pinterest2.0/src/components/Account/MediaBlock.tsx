'use client'
import React, { useState, useEffect } from 'react'
import NewFileForm from '../AddNewFileForm/NewFileForm'
import { IVideoProps, IImageProps, OperationTypes, IMediaBlockProps, newFileRequest } from '@/types/newfileform.type'
import ImageEditCard from '../ContentCards/EditCards/ImageEditCard'
import VideoEditCard from '../ContentCards/EditCards/VideoEditCard'
import ContentViewer from '../ContentViewer/ContentViewer'
import { ContentType } from '@/types/card.type'

const MediaBlock = ({ title }: IMediaBlockProps) => {
    const [openEditor, useOpenEditor] = useState<boolean>(false)
    const [openViewer, useOpenViewer] = useState<boolean>(false)

    const [videoData, useVideoData] = useState<IVideoProps | undefined>(undefined);
    const [imageData, useImageData] = useState<IImageProps | undefined>(undefined);

    const [newFileReq, useNewFileReq] = useState<newFileRequest>({
        video: true,
        image: true,
        album: false,
        contentType: ContentType.PHOTO,
        reqType: OperationTypes.CREATE
    })

    useEffect(() => {
        console.log(newFileReq)
    }, [newFileReq])

    return (
        <article className="album-manager__media-block">
            {openViewer && <ContentViewer imageData={imageData} videoData={videoData} setOpenViewer={useOpenViewer} />}
            {openEditor && <NewFileForm contentType={newFileReq.contentType} operationType={newFileReq.reqType} setLoadData={useOpenEditor} setImage={useImageData} setVideo={useVideoData} albumFlug={false} videoFlug={newFileReq.video} imageFlug={newFileReq.image} Image={imageData} Video={videoData} />}
            <div className="album-manager__media-manipulator">
                <h4 className="album-manager__title">{title}</h4>
                <button className="album-manager__add-media" onClick={() => { useNewFileReq({ video: true, image: true, album: true, contentType: ContentType.PHOTO, reqType: OperationTypes.UPDATE }); useOpenEditor(true) }}>
                    <svg viewBox="0 0 21 21" fill="#D7DBDF" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.69238 11.3077C9.24467 11.3077 9.69238 11.7554 9.69238 12.3077V20C9.69238 20.5523 10.1401 21 10.6924 21V21C11.2447 21 11.6924 20.5523 11.6924 20V12.3077C11.6924 11.7554 12.1401 11.3077 12.6924 11.3077H20C20.5523 11.3077 21 10.86 21 10.3077V10.3077C21 9.75539 20.5523 9.30768 20 9.30768H12.6924C12.1401 9.30768 11.6924 8.85996 11.6924 8.30768V1C11.6924 0.447715 11.2447 0 10.6924 0V0C10.1401 0 9.69238 0.447716 9.69238 1V8.30768C9.69238 8.85996 9.24467 9.30768 8.69238 9.30768H1C0.447715 9.30768 0 9.75539 0 10.3077V10.3077C0 10.86 0.447715 11.3077 1 11.3077H8.69238Z" />
                    </svg>
                </button>
            </div>
            <div className="album-manager__media-list">
                <ImageEditCard canEdit={false} id={0} setNewFileRequest={useNewFileReq} openViewer={useOpenViewer} setData={useImageData} meta={undefined} location={undefined} data={require('@/images/ai.jpg')} title={'Ayanami Rey'} tags={['anime', 'evangelion']} openEditor={useOpenEditor} />
                <VideoEditCard canEdit id={0} setNewFileRequest={useNewFileReq} openViewer={useOpenViewer} data={require('@/videos/yao.mp4')} setData={useVideoData} title={'Yao Miko'} tags={['geishinInfarct']} openEditor={useOpenEditor} />
            </div>
        </article>
    )
}

export default MediaBlock
