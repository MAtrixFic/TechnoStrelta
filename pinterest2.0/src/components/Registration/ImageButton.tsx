'use client'
import React from 'react'

interface ImageButtonProps {
    avatarka: string;
    setloadData: (state: boolean) => void; 
}

const ImageButton = ({ avatarka, setloadData }: ImageButtonProps) => {

    return (
        <button onClick={() => setloadData(true)}>
            <img className='auth__img ' src={avatarka} alt="avatar" />
        </button>
    )
}

export default ImageButton
