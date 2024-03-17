'use client'
import React, { useContext, useState, useRef } from 'react'
import '@/styles/newdata.scss'
import LoadVideo from './LoadVideo'
import { VideoContext } from '../AddNewFileForm/NewFileForm'
import { type ILoadVideoFormProps } from '@/types/newfileform.type'

const VideoForm = () => {
    const videoContext = useContext(VideoContext)
    const [file, useFile] = useState<File>();

    return (
        <div className="new-data">
            <div className="new-data__load-file">
                {videoContext?.src === null && <LoadVideo updateFile={useFile} width={100} />}
                {videoContext?.src && <video className='new-data__video' height={400} controls src={videoContext.src}></video>}
            </div>
            <div className="new-data__inputs">
                <input type="text" name='title' placeholder='Заголовок' />
                <input type="text" name='tags' placeholder='Теги' />
            </div>
            <div className="new-data__btns">
                <button className="new-data__bt save">
                    Отправить
                </button>
            </div>
        </div >
    )
}

export default VideoForm
