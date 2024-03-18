import React, { useState } from 'react'
import LoadData from './LoadData'
import '@/styles/newdata.scss'
import EditImageBt from './EditImageBt'
import ImageEditor from '../ImageEditor/ImageEditor'
import { IImageFormProps } from '@/types/newfileform.type'

const ImageForm = ({ setLoadData, setData, data, location, meta, tags, title }: IImageFormProps) => {
    const [showEditor, useShowEditor] = useState<boolean>(false)

    function DeployDatas(data: any) {
        if (data !== undefined)
            return data
        else
            return ''
    }

    return (
        <>
            {/* редактор фото */}
            {(showEditor && data) &&
                < ImageEditor
                    width={600}
                    aspect={undefined}
                    setData={setData}
                    setLoadData={useShowEditor}
                    image={data}
                />}
            {/* форма отправки data */}
            {!showEditor && <div className="new-data">
                <div className="new-data__load-file">
                    {data ?
                        <div className="new-data__image">
                            <EditImageBt func={useShowEditor} />
                            <img className='new-data__photo' src={data} alt='photo' />
                        </div>
                        :
                        <LoadData width={200} uploadData={setData}/>
                    }
                </div>
                <div className="new-data__inputs">
                    <input type="text" defaultValue={DeployDatas(title)} name='title' placeholder='Заголовок' />
                    <input type="text" defaultValue={DeployDatas(tags)} name='tags' placeholder='Теги' />
                    <input type="text" name='meta' defaultValue={DeployDatas(meta)} value={''} readOnly placeholder='Мета' />
                    <input type="text" name='location' defaultValue={DeployDatas(location)} value={''} readOnly placeholder='Локация' />
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

export default ImageForm
