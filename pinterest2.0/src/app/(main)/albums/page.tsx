import { NextPage } from 'next'
import { Metadata } from 'next'
import '@/styles/card.scss'
import Card from '@/components/Albums/AlbumCard'

export const metadata: Metadata = {
    title: 'Библиотека ресурсов'
}

const Page: NextPage = () => {
    return (
        <div className='main__albums'>
            {Array(13).fill(0).map((_, i) => <Card tags={['']} key={i} title='Название альбомя' link='anime' src={require('@/images/emiliya.jpg')} />)}
        </div>
    )
}

export default Page;