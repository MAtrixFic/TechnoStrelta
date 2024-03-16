import React, { useContext, useRef, useState, useEffect } from 'react'
import LoadData from './LoadData'
import '@/styles/newdata.scss'
import { ImageContext } from './NewFileForm'
import { DataTypes } from '@/types/newfileform.type'
import EditImageBt from './EditImageBt'
import ImageEditor from '../ImageEditor/ImageEditor'

const NewData = () => {
    const imageContext = useContext(ImageContext)
    const [showEditor, useShowEditor] = useState<boolean>(false)

    return (
        <>
            {(showEditor && imageContext) &&
                < ImageEditor
                    width={600}
                    aspect={undefined}
                    setData={imageContext?.setData as (data: string) => void}
                    setLoadData={useShowEditor}
                    image={imageContext?.data}
                />}
            {!showEditor && <div className="new-data">
                <div className="new-data__load-file">
                    {imageContext?.data &&
                        <div className="new-data__image">
                            <EditImageBt func={useShowEditor} />
                            <img className='new-data__photo' src={imageContext.data} alt='photo' />
                        </div>}
                    {imageContext?.data === null && <LoadData width={100} />}
                </div>
                <div className="new-data__inputs">
                    <input type="text" name='title' placeholder='Заголовок' />
                    <input type="text" name='tags' placeholder='Теги' />
                    <input type="text" name='meta' value={imageContext?.metaData?.date} readOnly placeholder='Мета' />
                    <input type="text" name='location' value={`${imageContext?.metaData?.latitude}  ${imageContext?.metaData?.longitude}`} readOnly placeholder='Локация' />
                </div>
                <div className="new-data__btns">
                    <button className="new-data__bt save">
                        Отправить
                    </button>
                </div>
            </div>}
        </>
    )
}

export default NewData
