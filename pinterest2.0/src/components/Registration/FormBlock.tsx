'use client'
import React, { useState, createContext, useEffect } from 'react'
import Link from 'next/link'

import voidImage from '@/images/void.png'

import ImageButton from '@/components/Registration/ImageButton'
import AvatarkaConstructor from './AvatarkaConstructor'


function FormBlock() {
    const [avatarka, useAvatarka] = useState<string | undefined>(undefined)
    const [loadData, useLoadData] = useState<boolean>(false)


    return (
        <>
            {loadData && <AvatarkaConstructor avatarka={avatarka} setAvatarka={useAvatarka} setLoadDate={useLoadData} />}
            <form className="auth__field" method='POST' action={'http://localhost:3001/'} encType="multipart/form-data">
                <h1 className="auth__app-logo">
                    Pinterest 2.0<br />
                    <span>Регистрация</span>
                </h1>
                <div className="auth__input-fields reg">
                    <ImageButton setloadData={useLoadData} avatarka={avatarka !== undefined ? avatarka : voidImage.src} />
                    <input name='username' type="text" required className="auth__input login" placeholder='Логин' />
                    <input name='email' type="email" required className="auth__input email" placeholder='Почта' />
                    <input name='password' type="password" required className="auth__input password" placeholder='Пароль' />
                    <input type="password" required className="auth__input password" placeholder='Подтверждение пароля' />
                </div>
                <div className="auth__btns">
                    <Link className="auth__bt create" href='/auth/entrance'>
                        Уже есть учетная запись
                    </Link>
                    <button type='submit' className="auth__bt">
                        Создать
                    </button>
                </div>
            </form>
        </>
    )
}

export default FormBlock
