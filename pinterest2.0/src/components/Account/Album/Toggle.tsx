'use client'
import React, { useState, useEffect } from 'react'

interface IToggle {
    title: string
}

const Toggle = ({ title }: IToggle) => {
    const [toggle, useToggle] = useState<boolean>(false);

    useEffect(() => {
        console.log(toggle)
    }, [toggle])

    return (
        <label className={`toggle ${toggle ? 'active' : ''}`}>
            {title}
            <input type="checkbox" onClick={() => useToggle(prev => !prev)} />
        </label>
    )
}

export default Toggle;