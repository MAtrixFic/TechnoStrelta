import React, { useState } from 'react'
import { IPhotoCardProps } from '@/types/newfileform.type'
import Image from 'next/image'
import '@/styles/datacard.scss'


const ImageEditCard = ({ setData, openEditor, data, title, tags, meta, location }: IPhotoCardProps) => {
    console.log(typeof data, data)

    return (
        <article className='data-card'>
            <Image quality={1} height={256} width={256 / (data.default.height / data.default.width)} loading='lazy' placeholder='blur' src={data} alt="photo" />
            <div className="data-card__data">
                <div className="data-card__manager">
                    <button className="data-card__btn">
                        <svg viewBox="0 0 30 29" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1424 8.22708L20.0634 2.30604C20.4539 1.91552 21.0871 1.91552 21.4776 2.30604L26.8769 7.70528C27.2674 8.09581 27.2674 8.72898 26.8769 9.1195L20.9558 15.0405L14.1424 8.22708ZM12.9619 9.40751L2.53594 19.8335C2.14542 20.224 2.14542 20.8572 2.53595 21.2477L7.93519 26.647C8.32571 27.0375 8.95888 27.0375 9.3494 26.647L19.7754 16.221L12.9619 9.40751ZM1.12173 22.6619C-0.049841 21.4904 -0.0498418 19.5909 1.12173 18.4193L18.6492 0.891827C19.8208 -0.279746 21.7203 -0.279744 22.8918 0.891829L28.2911 6.29107C29.4626 7.46264 29.4626 9.36214 28.2911 10.5337L10.7636 28.0612C9.59204 29.2327 7.69255 29.2327 6.52098 28.0612L1.12173 22.6619Z" />
                        </svg>
                    </button>
                    <button className="data-card__btn" onClick={() => { setData({ title: title, tags: tags, meta: meta, location: location, data: data.default.src }); openEditor(true) }}>
                        <svg viewBox="0 0 30 31" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5332 2.82843L27.483 7.77817L23.9474 11.3137L18.9977 6.36396L22.5332 2.82843ZM17.5835 7.77817L3.95746 21.4042L2.30313 28.0082L8.90721 26.3539L22.5332 12.7279L17.5835 7.77817ZM21.119 1.41421C21.9 0.633165 23.1664 0.633165 23.9474 1.41421L28.8972 6.36396C29.6782 7.14501 29.6782 8.41134 28.8972 9.19239L10.3214 27.7681C10.0653 28.0242 9.74451 28.206 9.39319 28.294L2.78912 29.9483C1.32372 30.3154 -0.00400777 28.9877 0.363075 27.5223L2.0174 20.9182C2.10541 20.5669 2.28715 20.246 2.54325 19.99L21.119 1.41421Z" />
                        </svg>
                    </button>
                </div>
                <h4 className='data-card__title'>{title}</h4>
            </div>
        </article>
    )
}

export default ImageEditCard