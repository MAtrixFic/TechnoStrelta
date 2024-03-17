import React from 'react'
import Link from 'next/link';

interface Props {
    title: string;
    src: string;
    link: string;
}

const UserCard = ({ title, src, link }: Props) => {

    return (
        <Link href={link} className='user-card'>
            <img className='user-card__img' src={src} alt="Картинка альбома" />
            <h3 className='user-card__title'>{title}</h3>
        </Link>
    )
}

export default UserCard
