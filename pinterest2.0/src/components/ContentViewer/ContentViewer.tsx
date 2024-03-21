import React from 'react';

import '@/styles/contentviewer.scss';
import Image from 'next/image';
import { IImageProps, IVideoProps } from '@/types/newfileform.type';

interface IContentViewerProps {
    imageData: IImageProps | undefined;
    videoData: IVideoProps | undefined;
    setOpenViewer: (state: boolean) => void;

}

const ContentViewer = ({ imageData, videoData, setOpenViewer }: IContentViewerProps) => {

    function Exit() {
        setOpenViewer(false);
    }

    return (
        <div className="dark-place">
            <div className="content-viewer">
                <div className="content-viewer__data">
                    {imageData !== undefined && <img alt='Photo' src={imageData?.data} />}
                    {videoData !== undefined && <video controls src={videoData.data} />}
                </div>
                <div className="content-viewer__mind">
                    <h2 className="content-viewer__title">{imageData?.title}{videoData?.title}</h2>
                    <button className="content-viewer__btn" onClick={Exit}>
                        Выход
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContentViewer
