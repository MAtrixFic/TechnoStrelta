import { NextPage } from 'next'
import Link from 'next/link'
import '@/styles/auth.scss'

interface Props { }



const Page: NextPage<Props> = ({ }) => {
    return (
        <form className="auth__field" method='POST'>
            <h1 className="auth__app-logo">
                Pinterest 2.0<br />
                <span>Авторизация</span>
            </h1>
            <div className="auth__input-fields ent">
                <input name='login' type="text" required className="auth__input login" placeholder='Логин' />
                <input name='password' type="password" required className="auth__input password" placeholder='Пароль' />
            </div>
            <div className="auth__btns">
                <Link className="auth__bt create" href='/auth/registration'>
                    Создать учетную запись
                </Link>
                <button type='submit' className="auth__bt enter">
                    Войти
                </button>
            </div>
        </form>
    )
}

export default Page