import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
import '@/styles/header.scss'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <header className="header">
                    <div className="header__left-block">
                        <h1 className="header__logo">P 2.0</h1>
                        <nav className="header__albums-nav">
                            <Link href='/albums' className="header__link" >Альбомы</Link>
                            <Link href='/account' className="header__link"  >Создать</Link>
                        </nav>
                    </div>
                    <div className="header__search-block">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4531 9.16403C12.9186 10.6986 10.4306 10.6986 8.89605 9.16403C7.36151 7.62949 7.36151 5.14151 8.89605 3.60696C10.4306 2.07242 12.9186 2.07242 14.4531 3.60696C15.9877 5.1415 15.9877 7.62949 14.4531 9.16403ZM8.23864 11.2191C10.5543 12.8694 13.7898 12.6557 15.8673 10.5782C18.1829 8.26266 18.1829 4.50834 15.8673 2.19275C13.5517 -0.122842 9.79743 -0.122842 7.48183 2.19275C5.40432 4.27026 5.19072 7.50587 6.84104 9.82152L1.19278 15.4698C0.806852 15.8557 0.806851 16.4814 1.19278 16.8674C1.57871 17.2533 2.20443 17.2533 2.59037 16.8674L8.23864 11.2191Z" fill="#11181C" />
                        </svg>
                        <input placeholder="#(tag):(name)" type="text" className="header__search" name='search' />
                    </div>
                    <nav className="header__users-nav">
                        <Link href='/users' className="header__link"  >Пользователи</Link>
                        <Link className="header__accout-auth" href='/auth/entrance'>
                            Вход
                        </Link>
                    </nav>
                </header>
                <main className="main">
                    {children}
                </main>
            </body>
        </html>
    );
}
