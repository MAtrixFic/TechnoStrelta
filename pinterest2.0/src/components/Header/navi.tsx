'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'


const Navi = () => {
    const [auth, useAuth] = useState<string>(() => 'no')

    useEffect(() => {
        const _auth = localStorage.getItem('auth')
        if (_auth !== null && _auth !== undefined) {
            useAuth(_auth)
        }
    }, [])

    return (
        <>
            {auth !== 'no' ?
                <>
                    <Link className="header__accout-auth" href={`/account/${localStorage.getItem('user_id')}`}>
                        Вы
                    </Link>
                    <button className="header__btn exit">Выход</button>
                </>
                :
                <Link className="header__accout-auth" href='/auth/entrance'>
                    Вход
                </Link>
            }
        </>
    )
}

export default Navi
