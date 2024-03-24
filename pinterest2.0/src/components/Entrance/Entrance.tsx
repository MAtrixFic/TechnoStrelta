'use client'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import '@/styles/auth.scss'
import Link from 'next/link'
import { authSchema } from '@/types/input.types'
import AuthEnter from '../ServerComponents/AuthEnter'
import Cookie from '@/components/ServerComponents/Cookie'

const Entrance = () => {
    let inputRefs = useRef<HTMLInputElement[]>(new Array<HTMLInputElement>(2))
    const router = useRouter()
    async function CheckAuth(){
        let data = {
            login: inputRefs.current[0].value,
            password: inputRefs.current[1].value,
        }
        let result = authSchema.safeParse(data)
        if (result.success) {
            try{
                const resData = await AuthEnter(data.login, data.password)
                console.log(resData)
                Cookie(resData.token)
                localStorage.setItem('auth', 'yes')
                localStorage.setItem('user_id', String(resData.id))
                router.push(`/account/${resData.id}`)
            }
            catch(ex){
                alert(ex)
            }
        }
        else {
            let errorText: string = ''
            for (let i of result.error.errors) {
                errorText += `${i.path} ${i.message}\n`
            }
            alert(errorText)
        }
    }

    return (
        <div className="auth__field">
            <h1 className="auth__app-logo">
                Pinterest 2.0<br />
                <span>Авторизация</span>
            </h1>
            <div className="auth__input-fields ent">
                <input ref={cur => cur !== null ? inputRefs.current[0] = cur : undefined} type="text" required className="auth__input login" placeholder='Логин' />
                <input ref={cur => cur !== null ? inputRefs.current[1] = cur : undefined} type="password" required className="auth__input password" placeholder='Пароль' />
            </div>
            <div className="auth__btns">
                <Link className="auth__bt create" href='/auth/registration'>
                    Создать учетную запись
                </Link>
                <button className="auth__bt enter" onClick={CheckAuth}>
                    Войти
                </button>
            </div>
        </div>
    )
}

export default Entrance
