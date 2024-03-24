import { NextPage } from 'next'
import UserSpace from '@/components/Users/UserSpace'
import '@/styles/account.scss'
import '@/styles/card.scss'

import Image from 'next/image'
import ai from './ai.jpg'

const Page: NextPage = () => {
    return (
        <div className="main__account">
            <div className="user-data">
                <Image className='user-data__ava' width={256} height={256} alt='аватарка' src={ai.src} />
                <h4 className='user-data__nick'>Logan123</h4>
            </div>
            <UserSpace />
        </div>
    )
}

export default Page