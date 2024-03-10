import { NextPage } from 'next'

import '@/styles/card.scss'
import UserCard from '@/components/UserCard'

const Page: NextPage = () => {
    return (
        <div className='main__users'>
            {Array(13).fill(0).map((_, i) => <UserCard key={i} link='21412' title='NickName' src='*'/>)}
        </div>
    )
}

export default Page