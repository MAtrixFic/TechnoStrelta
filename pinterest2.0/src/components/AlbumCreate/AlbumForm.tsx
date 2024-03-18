import React, { useRef, useState } from 'react'
import '@/styles/newdata.scss'

const AlbumForm = () => {
    const [privateState, usePrivateState] = useState<boolean>(false);
    let titleRef = useRef<HTMLInputElement>(null)

    function CheckInput() {
        if (titleRef.current) {
            if (titleRef.current.value.length === 0) {
                alert("Некоторые поля не заполнены")
            }
            else{
                console.log(`${titleRef.current.value} ${privateState}`)
            }
        }
    }

    return (
        <div className="new-data album">
            <div className="new-data__inputs">
                <input ref={titleRef} type="text" name='title' placeholder='Заголовок' />
                <input type="text" name='tags'  placeholder='теги'/>
                <label className={`new-data__radio ${privateState ? 'active' : ''}`}>
                    Приватный
                    <input type="radio" onClick={() => usePrivateState(prev => !prev)} />
                </label>
            </div>
            <div className="new-data__btns">
                <button className="new-data__bt save" onClick={CheckInput}>
                    Отправить
                </button>
            </div>
        </div >
    )
}

export default AlbumForm;
