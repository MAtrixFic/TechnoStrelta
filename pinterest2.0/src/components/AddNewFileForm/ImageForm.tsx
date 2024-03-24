import React, { useState, useRef, useEffect } from 'react'

import '@/styles/newdata.scss'

import EditImageBt from './EditImageBt'
import ImageEditor from '../ImageEditor/ImageEditor'
import LoadData from './LoadData'
import FormButton from './FormButton'

import { IImageFormProps } from '@/types/newfileform.type'
import { buttonOperations } from '@/services/dataForm.services'

const ImageForm = ({ setLoadData, setData, data }: IImageFormProps) => {
    const [showEditor, useShowEditor] = useState<boolean>(false)
    const [prepImage, usePrepImage] = useState<string | undefined>(() => {
        if (data) {
            return data.data
        }
        else {
            return undefined
        }
    });

    let inputsRef = useRef<HTMLInputElement[]>(new Array(4).fill(null));


    function DeployDatas(data: any, key: string) {
        if (data !== undefined) {
            if (data[key] !== undefined)
                return data[key]
            else
                return ''
        }
        else
            return ''
    }

    function DeployMeta(data: any, key: string) {
        if (data !== undefined) {
            if (data.meta !== undefined) {
                if (key === 'meta') {
                    return `${data[key].date} ${data[key].city}`
                }
            }
            else
                return undefined
            if (data.location !== undefined) {
                if (key === 'location') {
                    return `${data[key].latitude} ${data[key].longitude}`
                }
            }
            else
                return undefined
        }
        else
            return undefined
    }

    function UpdateMeta(date: string, latitude: string, longitude: string) {
        inputsRef.current[2].value = date;
        ((latitude === longitude) && latitude === '') ?
            inputsRef.current[3].value = ''
            :
            inputsRef.current[3].value = `${latitude} ${longitude}`
    }

    useEffect(() => {
        if (prepImage === undefined) {
            usePrepImage(data?.data);
        }
    }, [data])

    useEffect(() => {
        UpdateMeta(`${data?.meta?.date} ${data?.meta?.city}`, data?.location?.latitude as string, data?.location?.longitude as string);
    }, [prepImage])

    return (
        <>
            {/* редактор фото */}
            {(showEditor && prepImage) &&
                < ImageEditor
                    width={600}
                    aspect={undefined}
                    setData={usePrepImage}
                    setLoadData={useShowEditor}
                    image={prepImage}
                />}
            {/* форма отправки data */}
            {!showEditor && <div className="new-data">
                <div className="new-data__load-file">
                    {prepImage !== undefined ?
                        <div className="new-data__image">
                            <EditImageBt func={useShowEditor} />
                            <img className='new-data__photo' src={prepImage} alt='photo' />
                        </div>
                        :
                        <>
                            {<LoadData uploadMeta={setData} width={100} dataInp={[
                                inputsRef.current[0] !== null ? inputsRef.current[0].value : '',
                                inputsRef.current[1] !== null ? inputsRef.current[1].value : '',
                                inputsRef.current[2] !== null ? inputsRef.current[2].value : '',
                                inputsRef.current[3] !== null ? inputsRef.current[3].value : '']} />}
                        </>
                    }
                </div>
                <div className="new-data__inputs">
                    <input type="text" name='title' defaultValue={DeployDatas(data, 'title')} placeholder='Заголовок' ref={cur => inputsRef.current[0] = cur as HTMLInputElement} onChange={event => setData({ ...data, title: event.target.value })} />
                    <input type="text" name='tags' defaultValue={DeployDatas(data, 'tags')} placeholder='Теги' ref={cur => inputsRef.current[1] = cur as HTMLInputElement} onChange={event => setData({ ...data, tags: event.target.value.split(' ') })} />
                    <input type="text" id='not-allowed' name='meta' defaultValue={DeployMeta(data, 'meta')} readOnly placeholder='Мета' ref={cur => inputsRef.current[2] = cur as HTMLInputElement} />
                    <input type="text" id='not-allowed' name='location' defaultValue={DeployMeta(data, 'location')} readOnly placeholder='Локация' ref={cur => inputsRef.current[3] = cur as HTMLInputElement} />
                </div>
                <div className="new-data__btns">
                    <FormButton title='Отмена' operation={() => buttonOperations.cancel({ resetData: buttonOperations.resetData, setLoadData: setLoadData, data: { inputs: inputsRef, resetLocalData: usePrepImage, resetGlobalData: setData } })} />
                    <FormButton title='Сбросить' operation={() => buttonOperations.resetData({ inputs: inputsRef, resetLocalData: usePrepImage, resetGlobalData: setData })} />
                    <FormButton title='Отправить' operation={() => ''} />
                </div>
            </div>}
        </>
    )
}

export default ImageForm
