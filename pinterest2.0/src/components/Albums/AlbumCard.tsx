'use client'
import React from 'react'
import type { IAlbumCardProps } from '@/types/card.type';
import '@/styles/card.scss'
import Image from 'next/image';
import Link from 'next/link';

const AlbumCard = ({ title, src, link }: IAlbumCardProps) => {
    return (
        <Link href={`/albums/${link}`} className={`card`}>
            <Image className='card__img' quality={10} loading='lazy' width={200 / (src.default.height / src.default.width)} height={200} src={src.default.src} alt="Картинка" />
            <div className="card__infa">
                <h3 className='card__title'>{title}</h3>
            </div>
        </Link>
    )
}

export default AlbumCard
