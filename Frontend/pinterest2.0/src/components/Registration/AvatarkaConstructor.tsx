import React, { useEffect, useState } from 'react'
import ImageEditor from '../ImageEditor/ImageEditor'
import LoadData from '../AddNewFileForm/LoadData'
import '@/styles/avatarkaconstruktor.scss'
import Image from 'next/image'
import { ILoadDataProps } from '@/types/newfileform.type'

interface IAvatarkaConstructor {
    setAvatarka(data: string | undefined): void;
    setLoadDate(state: boolean): void
    avatarka: string | undefined;
}

const AvatarkaConstructor = ({ setAvatarka, setLoadDate, avatarka }: IAvatarkaConstructor) => {
    const [prepAvatarka, usePrepAvatarka] = useState<string | undefined>(avatarka);

    function ResetAvatrka() {
        setAvatarka(undefined);
        usePrepAvatarka(undefined)
    }

    function CheckActiveReset() {
        return prepAvatarka ? false : true;
    }

    function Exit() {
        setLoadDate(false);
    }

    return (
        <div className="avatarka-constructor">
            {!prepAvatarka && <LoadData width={200} uploadMeta={undefined} uploadImage={usePrepAvatarka} dataInp={['']} />}
            {prepAvatarka && <ImageEditor aspect={1} width={600} image={prepAvatarka} setData={setAvatarka} setLoadData={setLoadDate} />}
            <div className="avatarka-constructor__btns">
                <button disabled={CheckActiveReset()} className='avatarka-constructor__btn' onClick={ResetAvatrka}>
                    Удалить
                </button>
                <button className='avatarka-constructor__btn' onClick={Exit}>
                    Выйти
                </button>
            </div>
        </div >
    )
}

export default AvatarkaConstructor
