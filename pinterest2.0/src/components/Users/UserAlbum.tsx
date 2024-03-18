'use client'
import React, { useState } from 'react'

import { ContentType } from '@/types/card.type'
import CreateAlbumLink from '../AddNewFileForm/CreateDataButton'
import NewFileForm from '../AddNewFileForm/NewFileForm'

const UserAlbum = () => {
    const [newData, useNewData] = useState<boolean>(false);
    const [contentType, useContentType] = useState<ContentType>(ContentType.PHOTO);

    function Plug(data: string) {
        console.log(data);
    }

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
            {newData && <NewFileForm avaFlug={false} setData={Plug} setLoadData={useNewData} defaulVideo={null} defaulImage={null} albumFlug imageFlug videoFlug />}
            <div className="user-album__data">
                <div className="user-album__add-block">
                    <CreateAlbumLink newData={useNewData} />
                </div>
                <div className="user-album__list"></div>
            </div>
        </div>
    )
}

export default UserAlbum
