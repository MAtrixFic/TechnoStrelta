import { NextPage } from 'next'
import type { Metadata } from 'next'
import '@/styles/auth.scss'

import FormBlock from '@/components/Registration/FormBlock'

export const metadata: Metadata = {
    title: 'Регистрация'
}

const Page: NextPage = () => {
    return (
        <FormBlock />
    )
}

export default Page