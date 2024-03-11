'use client'
import React, { useEffect, useState } from 'react'
import '@/styles/newfile.scss'

import { PinturaEditor } from '@pqina/react-pintura'
import { getEditorDefaults } from '@pqina/pintura'
import ai from './ai.jpg'

const NewFileForm = () => {
    const [image, useImage] = useState<string>()
    const [inlineResult, useInlineReult] = useState<string>();


    useEffect(() => {
        console.log(inlineResult)
    }, [inlineResult])
    return (
        <div className="black-window">
            <div className="new-file-form">
                <div className="new-file-form__downloader">
                    {image &&
                        <PinturaEditor
                            src={image}
                            {...getEditorDefaults()}
                            imageCropAspectRatio={1}
                            onProcess={(res) => {
                                useInlineReult(URL.createObjectURL(res.dest))
                            }
                            }
                        />}
                    {inlineResult && <img src={inlineResult} />}
                    {!image && <label className="new-file-form__load-img">
                        <input name='avatar' type="file" accept=".jpg, .jpeg, .png" onChange={event => {
                            if (event.currentTarget.files !== null) {
                                const file = event.currentTarget.files[0];
                                const reader = new FileReader();

                                reader.onloadend = function () {
                                    const base64 = reader.result;
                                    useImage(base64 as string)
                                };

                                reader.readAsDataURL(file);
                            }
                        }}
                            required />
                    </label>}
                </div>
                <div className="new-file-form__manager">
                    <div className="new-file-form__file-types">
                        <button className="new-file-form__file-type">
                            Фото
                        </button>
                        <button className="new-file-form__file-type">
                            Видео
                        </button>
                        <button className="new-file-form__file-type">
                            Альбом
                        </button>
                    </div>
                    <button className="new-file-form__btn download">
                        Загрузить
                    </button>
                    <button className="new-file-form__btn cancel">
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewFileForm;
