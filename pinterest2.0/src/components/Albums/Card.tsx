'use client'
import React from 'react'
import type { IAlbumCardProps } from '@/types/card.type';
import Link from 'next/link';

const Card = ({ title, src, type, path }: IAlbumCardProps) => {
    return (
        <Link href={`/albums/${path}`} className={`card ${type}`}>
            <img className='card__img' src={src} alt="Картинка" />
            <h3 className='card__title'>{title}</h3>
        </Link>
    )
}

export default Card
