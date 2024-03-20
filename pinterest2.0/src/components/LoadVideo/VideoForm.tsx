'use client'
import React, { useState, useRef } from 'react'
import '@/styles/newdata.scss'
import LoadVideo from './LoadVideo'
import { type IVideoFormProps } from '@/types/newfileform.type'
import FormButton from '../AddNewFileForm/FormButton'
import { buttonOperations } from '@/services/dataForm.services'

const VideoForm = ({ data, setData, setLoadData }: IVideoFormProps) => {
    const [file, useFile] = useState<File>();
    let inputsRef = useRef<HTMLInputElement[]>(new Array(2).fill(null))

    function UploadVideo(file: File, urlFile: string) {
        useFile(file);
        setData({ data: urlFile, title: data?.title, tags: data?.tags })
    }

    return (
        <div className="new-data">
            <div className="new-data__load-file">
                {data === undefined && <LoadVideo uploadFile={UploadVideo} width={100} />}
                {data && <video className='new-data__video' height={400} controls src={data.data}></video>}
            </div>
            <div className="new-data__inputs">
                <input type="text" ref={cur => inputsRef.current[0] = cur as HTMLInputElement} defaultValue={data?.title} name='title' placeholder='Заголовок' />
                <input type="text" ref={cur => inputsRef.current[1] = cur as HTMLInputElement} defaultValue={data?.tags} name='tags' placeholder='Теги' />
            </div>
            <div className="new-data__btns">
                <FormButton title='Отмена' operation={() => buttonOperations.cancel({ resetData: buttonOperations.resetData, setLoadData: setLoadData, data: { inputs: inputsRef, resetLocalData: useFile, resetGlobalData: setData } })} />
                <FormButton title='Сбросить' operation={() => buttonOperations.resetData({inputs: inputsRef, resetLocalData: useFile, resetGlobalData: setData})} />
                <FormButton title='Отправить' operation={() => ''} />
            </div>
        </div >
    )
}

export default VideoForm
