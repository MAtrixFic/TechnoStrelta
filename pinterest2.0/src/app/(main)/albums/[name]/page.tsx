'use client'
import { NextPage } from 'next'
import { useState } from 'react'
import '@/styles/album.scss'

import MediaBlock from '@/components/Account/MediaBlock'
import Toggle from '@/components/Account/Album/Toggle'
import AddUserWindow from '@/components/AddUserWindow/AddUserWindow'
import Link from 'next/link'

interface IAlbumPageRoute {
    params: { name: string }
}

const Page: NextPage<IAlbumPageRoute> = ({ params }) => {
    const [addUser, useAddUser] = useState<boolean>(false);
    return (
        <div className="main__album">
            {addUser && <AddUserWindow exitFunc={() => useAddUser(false)}/>}
            <div className="album-manager">
                <Toggle title='Приватный' />
                <div className='album-manger__authors'>
                    {['MAtrix', 'IamTeslic'].map((author, index) => <Link href={`/users/${author}`} key={index} >{author}</Link>)}
                </div>
                <button className="album-manager__add-author" onClick={()=> useAddUser(prev => !prev)}>
                    Добавить пользователя
                </button>
            </div>
            <div className="album-manager__media">
                <MediaBlock />
            </div>
        </div >
    )
}

export default Page