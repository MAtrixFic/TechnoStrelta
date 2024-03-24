import React from 'react'
import { IPhotoCardProps, OperationTypes } from '@/types/newfileform.type'
import Image from 'next/image'
import '@/styles/datacard.scss'
import useDownloader from 'react-use-downloader'
import { ContentType } from '@/types/card.type'


const ImageEditCard = ({ setData, openEditor, openViewer, data, title, tags, meta, location, setNewFileRequest, canEdit, id }: IPhotoCardProps) => {
    console.log(typeof data, data)
    const { download } = useDownloader()

    function SetData() {
        setData({ title: title, tags: tags, meta: meta, location: location, data: data.default.src })
    }

    return (
        <article className='data-card'>
            <Image quality={1} height={256} width={256 / (data.default.height / data.default.width)} loading='lazy' placeholder='blur' src={data} alt="photo" />
            <div className="data-card__data">
                <div className="data-card__manager">
                    {canEdit &&
                        <>
                            <button className="data-card__btn">
                                <svg viewBox="0 0 30 29" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1424 8.22708L20.0634 2.30604C20.4539 1.91552 21.0871 1.91552 21.4776 2.30604L26.8769 7.70528C27.2674 8.09581 27.2674 8.72898 26.8769 9.1195L20.9558 15.0405L14.1424 8.22708ZM12.9619 9.40751L2.53594 19.8335C2.14542 20.224 2.14542 20.8572 2.53595 21.2477L7.93519 26.647C8.32571 27.0375 8.95888 27.0375 9.3494 26.647L19.7754 16.221L12.9619 9.40751ZM1.12173 22.6619C-0.049841 21.4904 -0.0498418 19.5909 1.12173 18.4193L18.6492 0.891827C19.8208 -0.279746 21.7203 -0.279744 22.8918 0.891829L28.2911 6.29107C29.4626 7.46264 29.4626 9.36214 28.2911 10.5337L10.7636 28.0612C9.59204 29.2327 7.69255 29.2327 6.52098 28.0612L1.12173 22.6619Z" />
                                </svg>
                            </button>
                            <button className="data-card__btn" onClick={() => { SetData(); setNewFileRequest({ video: false, image: false, album: false, contentType: ContentType.PHOTO, reqType: OperationTypes.UPDATE }); openEditor(true) }}>
                                <svg viewBox="0 0 30 31" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5332 2.82843L27.483 7.77817L23.9474 11.3137L18.9977 6.36396L22.5332 2.82843ZM17.5835 7.77817L3.95746 21.4042L2.30313 28.0082L8.90721 26.3539L22.5332 12.7279L17.5835 7.77817ZM21.119 1.41421C21.9 0.633165 23.1664 0.633165 23.9474 1.41421L28.8972 6.36396C29.6782 7.14501 29.6782 8.41134 28.8972 9.19239L10.3214 27.7681C10.0653 28.0242 9.74451 28.206 9.39319 28.294L2.78912 29.9483C1.32372 30.3154 -0.00400777 28.9877 0.363075 27.5223L2.0174 20.9182C2.10541 20.5669 2.28715 20.246 2.54325 19.99L21.119 1.41421Z" />
                                </svg>
                            </button>
                        </>}
                    <button onClick={() => download(data.default.src, `${title}.jpg`)} className="data-card__btn">
                        <svg viewBox="0 0 22 23" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2929 0.292902L3.92893 6.65686C3.53841 7.04739 3.53841 7.68055 3.92893 8.07108C4.31946 8.4616 4.95262 8.4616 5.34315 8.07108L10 3.41422V17C10 17.5523 10.4477 18 11 18C11.5523 18 12 17.5523 12 17V3.41422L16.6569 8.07108C17.0474 8.4616 17.6805 8.4616 18.0711 8.07108C18.4616 7.68055 18.4616 7.04739 18.0711 6.65686L11.7071 0.292902C11.3166 -0.0976219 10.6834 -0.0976219 10.2929 0.292902ZM2 14C2 13.4477 1.55228 13 1 13C0.447715 13 0 13.4477 0 14V19C0 21.2091 1.79086 23 4 23H18C20.2091 23 22 21.2091 22 19V14C22 13.4477 21.5523 13 21 13C20.4477 13 20 13.4477 20 14V19C20 20.1046 19.1046 21 18 21H4C2.89543 21 2 20.1046 2 19V14Z" />
                        </svg>
                    </button>
                    <button className="data-card__btn" onClick={() => { SetData(); openViewer(true) }}>
                        <svg viewBox="0 0 30 30" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M28.7803 1.00046L19.7844 0.727855C19.2324 0.711127 18.7713 1.14508 18.7546 1.69711C18.7379 2.24914 19.1718 2.71021 19.7238 2.72694L26.3066 2.92642L15.3146 13.2718C14.9125 13.6503 14.8933 14.2832 15.2718 14.6854C15.6503 15.0875 16.2832 15.1067 16.6854 14.7282L27.6773 4.38282L27.4779 10.9656C27.4611 11.5176 27.8951 11.9787 28.4471 11.9954C28.9991 12.0121 29.4602 11.5782 29.4769 11.0262L29.7495 2.03029C29.7663 1.47826 29.3323 1.01719 28.7803 1.00046ZM17 5.25C17.5523 5.25 18 5.69771 18 6.25C18 6.80228 17.5523 7.25 17 7.25H4C2.89543 7.25 2 8.14543 2 9.25V26C2 27.1046 2.89543 28 4 28H20.75C21.8546 28 22.75 27.1046 22.75 26V13.75C22.75 13.1977 23.1977 12.75 23.75 12.75C24.3023 12.75 24.75 13.1977 24.75 13.75V26C24.75 28.2091 22.9591 30 20.75 30H4C1.79086 30 0 28.2091 0 26V9.25C0 7.04086 1.79086 5.25 4 5.25H17Z" />
                        </svg>
                    </button>
                </div>
                <div className="data-card__infa">
                    {tags[0] !== '' && <span className='data-card__tags'>{...tags.map(tag => `#${tag} `)}</span>}
                    <h4 className='data-card__title'>{title}</h4>
                </div>
            </div>
        </article >
    )
}

export default ImageEditCard