'use client'
import React, { useEffect, useState } from 'react'
import dataJson from './tags.json'
type Props = {}
interface tag {
    id: number;
    name: string;
}
const page = (props: Props) => {
    const [search, setsearch] = useState('')
    const [debounce, setdebounce] = useState('')
    const [result, setresult] = useState<Array<tag>>([
        {
            id: 0,
            name: ''
        }
    ])
    useEffect(() => {
        const timeout = setTimeout(() => {
            setdebounce(search)
        }, 500)
        return () => {
            clearTimeout(timeout)
        }
    }, [search])

    useEffect(() => {
        const namesWithSearch = dataJson.filter(topic => topic.name.includes(search)).map(topic => topic);
        if (JSON.stringify(namesWithSearch) !== JSON.stringify(dataJson.map(topic => topic))) {
            console.log(namesWithSearch);
            setresult(namesWithSearch)
        }
    }, [debounce])
    return (
        <div>
            <input
                value={search}
                onChange={e => setsearch(e.target.value)} />

            {
                result!.map((tag) =>
                    <a key={tag.id}>{tag.name}</a>

                )}
        </div>
    )
}

export default page