import React from 'react'
import type { IChangeAlbumTypeButtonProps } from '@/types/account.type'

const ChangeAlbumTypeButton = ({ id, active, changeAlbumType, className, title }: IChangeAlbumTypeButtonProps) => {
    return (
        <button onClick={() => changeAlbumType(id)} className={`${className} ${active}`} id={id}>
            {title}
        </button>
    )
}

export default ChangeAlbumTypeButton
