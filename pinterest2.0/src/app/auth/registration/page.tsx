'use client'
import { NextPage } from 'next'
import type { Metadata } from 'next'
import Link from 'next/link'
import '@/styles/auth.scss'

import AuthImage from '@/components/AuthImage'
import NewFileForm from '@/components/AddNewFileForm/NewFileForm'
import { useState } from 'react'

// export const metadata: Metadata = {
//     title: 'Регистрация'
// }

const Page: NextPage = () => {
    const [newImage, useNewImage] = useState<boolean>(false);

    return (
        <>
            {newImage && <NewFileForm />}
            <form className="auth__field" method='POST' action={'http://localhost:3000/albums/'}>
                <h1 className="auth__app-logo">
                    Pinterest 2.0<br />
                    <span>Регистрация</span>
                </h1>
                <div className="auth__input-fields reg">
                    <button onClick={() => useNewImage(true)}>
                        <img src="*" alt="avatar" />
                    </button>
                    <input name='username' type="text" required className="auth__input login" placeholder='Логин' />
                    <input name='email' type="email" required className="auth__input email" placeholder='Почта' />
                    <input name='password' type="password" required className="auth__input password" placeholder='Пароль' />
                    <input type="password" required className="auth__input password" placeholder='Подтверждение пароля' />
                </div>
                <div className="auth__btns">
                    <Link className="auth__bt create" href='/auth/entrance'>
                        Уже есть учетная запись
                    </Link>
                    <button type='submit' className="auth__bt enter">
                        Создать
                    </button>
                </div>
            </form>
        </>
    )
}

export default Page