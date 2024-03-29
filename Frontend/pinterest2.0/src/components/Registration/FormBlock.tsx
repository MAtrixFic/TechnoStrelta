'use client'
import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import SetJWT from '../ServerComponents/Cookie'
import Link from 'next/link'
import voidImage from '@/images/void.png'
import { FromBase64ToFile } from '@/types/imageeditor.type'
import ImageButton from '@/components/Registration/ImageButton'
import AvatarkaConstructor from './AvatarkaConstructor'
import { regSchema } from '@/types/input.types'
import AuthReg from '../ServerComponents/AuthReg'

function FormBlock() {
    const [avatarka, useAvatarka] = useState<string | undefined>(undefined)
    const [loadData, useLoadData] = useState<boolean>(false)
    const inputRefs = useRef<HTMLInputElement[]>(new Array<HTMLInputElement>(3))
    const router = useRouter()

    async function CheckReg() {
        let data = {
            login: inputRefs.current[0].value,
            email: inputRefs.current[1].value,
            password: inputRefs.current[2].value
        }
        let result = regSchema.safeParse(data)
        if (result.success) {
            let sentAvatarka = avatarka !== undefined ? avatarka : voidImage.src;
            let getData;
            try {
                getData = await AuthReg(
                    data.login, data.email, data.password, await FromBase64ToFile(sentAvatarka, 'test.png'))
                SetJWT(getData.token)
                router.push('/account')
            }
            catch (ex) {
                alert(ex)
            }

        }
        else {
            let errorText = ''
            for (let i of result.error.errors) {
                errorText += `${i.path} ${i.message}\n`
            }
            alert(errorText)
        }
    }

    return (
        <>
            {loadData && <AvatarkaConstructor avatarka={avatarka} setAvatarka={useAvatarka} setLoadDate={useLoadData} />}
            <div className="auth__field">
                <h1 className="auth__app-logo">
                    Pinterest 2.0<br />
                    <span>Регистрация</span>
                </h1>
                <div className="auth__input-fields reg">
                    <ImageButton setloadData={useLoadData} avatarka={avatarka !== undefined ? avatarka : voidImage.src} />
                    <input ref={cur => cur !== null ? inputRefs.current[0] = cur : undefined} type="text" required className="auth__input login" placeholder='Логин' />
                    <input ref={cur => cur !== null ? inputRefs.current[1] = cur : undefined} type="email" required className="auth__input email" placeholder='Почта' />
                    <input ref={cur => cur !== null ? inputRefs.current[2] = cur : undefined} type="password" required className="auth__input password" placeholder='Пароль' />
                </div>
                <div className="auth__btns">
                    <Link className="auth__bt create" href='/auth/entrance'>
                        Уже есть учетная запись
                    </Link>
                    <button className="auth__bt" onClick={CheckReg}>
                        Создать
                    </button>
                </div>
            </div>
        </>
    )
}

export default FormBlock
