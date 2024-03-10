'use client'
import React, { useState } from 'react'
import { AlbumTypes } from '@/types/card.type'
import type { ICards } from '@/types/account.type'
import ChangeAlbumTypeButton from './ChangeAlbumTypeButton'
import Card from './Card'
import CreateAlbumLink from './CreateAlbumLink'

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

    function ActiveCheck(type: AlbumTypes): string {
        return albumType === type ? 'active' : '';
    }

    function ChangeAlbumType(type: AlbumTypes) {
        useAlbumType(type);
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
            <div className="user-album__list">
                <CreateAlbumLink />
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
