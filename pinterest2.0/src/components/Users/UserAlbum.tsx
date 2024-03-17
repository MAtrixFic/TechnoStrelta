'use client'
import React, { useState } from 'react'
import { AlbumTypes } from '@/types/card.type'
import type { ICards } from '@/types/account.type'

import ChangeAlbumTypeButton from '../Account/ChangeAlbumTypeButton'
import Card from '../Albums/Card'
import CreateAlbumLink from '../AddNewFileForm/CreateDataButton'
import NewFileForm from '../AddNewFileForm/NewFileForm'

const CARDS: ICards = {
    public: [{
        title: 'Публичгый альбом',
        src: '*',
        tags: ['#date:'],
        type: AlbumTypes.PUBLIC,
        path: 'public'
    }],
    collaboration: [{
        title: 'Групповой альбом',
        src: '*',
        tags: ['#date:'],
        type: AlbumTypes.COLLABORATION,
        path: 'collaboration'
    }],
    private: [{
        title: 'Приватный альбом',
        src: '*',
        tags: ['#date:'],
        type: AlbumTypes.PRIVATE,
        path: 'private'
    }]
}

const UserAlbum = () => {
    const [albumType, useAlbumType] = useState<AlbumTypes>(AlbumTypes.ALL)
    const [newData, useNewData] = useState<boolean>(false);

    function ActiveCheck(type: AlbumTypes): string {
        return albumType === type ? 'active' : '';
    }

    function ChangeAlbumType(type: AlbumTypes) {
        useAlbumType(type);
    }

    function Plug(data: string){
        console.log(data);
    }

    return (
        <div className="user-album">
            <div className="user-album__panel">
                <ChangeAlbumTypeButton
                    className='user-album__main-link'
                    id={AlbumTypes.ALL}
                    active={ActiveCheck(AlbumTypes.ALL)}
                    title='Альбомы'
                    changeAlbumType={ChangeAlbumType}
                />
                <div className="user-album__manage-links">
                    <ChangeAlbumTypeButton
                        className='user-album__manage-link'
                        id={AlbumTypes.PUBLIC}
                        active={ActiveCheck(AlbumTypes.PUBLIC)}
                        title='Публичные'
                        changeAlbumType={ChangeAlbumType}
                    />
                    <ChangeAlbumTypeButton
                        className='user-album__manage-link'
                        id={AlbumTypes.COLLABORATION}
                        active={ActiveCheck(AlbumTypes.COLLABORATION)}
                        title='Совместные'
                        changeAlbumType={ChangeAlbumType}
                    />
                    <ChangeAlbumTypeButton
                        className='user-album__manage-link'
                        id={AlbumTypes.PRIVATE}
                        active={ActiveCheck(AlbumTypes.PRIVATE)}
                        title='Приватные'
                        changeAlbumType={ChangeAlbumType}
                    />
                </div>
            </div>
            {newData && <NewFileForm avaFlug={false} setData={Plug} setLoadData={useNewData} defaulVideo={null} defaulImage={null} albumFlug imageFlug videoFlug/>}
            <div className="user-album__list">
                <CreateAlbumLink newData={useNewData} />
                {albumType !== AlbumTypes.ALL ? CARDS[albumType].map((album, i) => <Card path={album.path} type={album.type} tags={album.tags} title={album.title} key={i} src={album.src} />)
                    :
                    new Array().concat(CARDS.public).concat(CARDS.private).concat(CARDS.collaboration)
                        .map((album, i) => <Card path={album.path} type={album.type} tags={album.tags} title={album.title} key={i} src={album.src} />)
                }
            </div>
        </div>
    )
}

export default UserAlbum
