import { NextPage } from 'next'

import '@/styles/card.scss'
import Card from '@/components/Albums/Card'
import { AlbumTypes } from '@/types/card.type'

const Page: NextPage = () => {
    return (
        <div className='main__albums'>
            {Array(13).fill(0).map((_, i) => <Card tags={['']} type={AlbumTypes.PUBLIC}  key={i} title='Название альбомя' src='*'/>)}
        </div>
    )
}

export default Page