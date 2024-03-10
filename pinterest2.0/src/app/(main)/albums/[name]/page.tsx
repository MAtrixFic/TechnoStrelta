'use client'
import { NextPage } from 'next'
import '@/styles/album.scss'

import MediaBlock from '@/components/MediaBlock'

interface IAlbumPageRoute {
    params: { name: string }
}

const Page: NextPage<IAlbumPageRoute> = ({ params }) => {
    return (
        <div className="main__album">
            <div className="album-manager">
                <div className="album-manager__infa-block">
                    <h3 className='album-manager__name'>{params.name} <span>MAtrix</span></h3>
                </div>
                <div className="album-manager__controller">
                </div>
            </div>
            <div className="album-manager__media">
                <MediaBlock />
            </div>
        </div>
    )
}

export default Page