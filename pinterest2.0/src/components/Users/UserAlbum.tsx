'use client'
import React, { useState } from 'react'

import { ContentType } from '@/types/card.type'
import { IVideoProps, IImageProps } from '@/types/newfileform.type'
import { OperationTypes } from '@/types/newfileform.type'
import CreateAlbumLink from '../AddNewFileForm/CreateDataButton'
import NewFileForm from '../AddNewFileForm/NewFileForm'
import ImageEditCard from '../ContentCards/EditCards/ImageEditCard'

const UserAlbum = () => {
    const [newData, useNewData] = useState<boolean>(false);
    const [operationType, useOperationType] = useState<OperationTypes>(OperationTypes.CREATE)
    const [contentType, useContentType] = useState<ContentType>(ContentType.PHOTO);

    const [videoData, useVideoData] = useState<IVideoProps | undefined>(undefined);
    const [imageData, useImageData] = useState<IImageProps | undefined>(undefined);

    function CheckActive(_contentType: ContentType) {
        return contentType === _contentType ? 'active' : ''
    }

    return (
        <div className="user-album">
            <div className="user-album__panel">
                <button className={`user-album__link ${CheckActive(ContentType.PHOTO)}`} onClick={() => useContentType(ContentType.PHOTO)}>Фото</button>
                <button className={`user-album__link ${CheckActive(ContentType.ALBUM)} album`} onClick={() => useContentType(ContentType.ALBUM)}>Альбомы</button>
                <button className={`user-album__link ${CheckActive(ContentType.VIDEO)}`} onClick={() => useContentType(ContentType.VIDEO)}>Видео</button>
            </div>
            {newData && <NewFileForm setImage={useImageData} setVideo={useVideoData} operationType={OperationTypes.CREATE} setLoadData={useNewData} Video={videoData} Image={imageData} albumFlug imageFlug videoFlug />}
            <div className="user-album__data">
                <div className="user-album__add-block">
                    <CreateAlbumLink changeOperation={useOperationType} newData={useNewData} />
                </div>
                <div className="user-album__list">
                    <ImageEditCard setData={useImageData} openEditor={useNewData} title='Vertical Rem' meta={undefined} location={undefined} tags={['beauty', 'sister']} data={require('../../images/remVertical.jpg')} />
                    <ImageEditCard setData={useImageData} openEditor={useNewData} title='Ayanami Rey' meta={undefined} location={undefined} tags={['']} data={require('../../images/ai.jpg')} />
                    <ImageEditCard setData={useImageData} openEditor={useNewData} title='Void Image' meta={undefined} location={undefined} tags={['']} data={require('../../images/void.png')} />
                    <ImageEditCard setData={useImageData} openEditor={useNewData} title='Emiliya' meta={undefined} location={undefined} tags={['']} data={require("../../images/emiliya.jpg")} />
                </div>
            </div>
        </div>
    )
}

export default UserAlbum
