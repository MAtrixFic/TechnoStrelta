import React from 'react'
import { OperationTypes } from '@/types/newfileform.type';

interface ICreateDataButtonProps {
    newData: (state: boolean) => void;
    changeOperation: (operation: OperationTypes) => void;
}

const CreateDataButton = ({ newData }: ICreateDataButtonProps) => {

    return (
        <button onClick={() => newData(true)} className='user-album__create'>
            <svg viewBox="0 0 21 21" fill="#D7DBDF" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.69238 11.3077C9.24467 11.3077 9.69238 11.7554 9.69238 12.3077V20C9.69238 20.5523 10.1401 21 10.6924 21V21C11.2447 21 11.6924 20.5523 11.6924 20V12.3077C11.6924 11.7554 12.1401 11.3077 12.6924 11.3077H20C20.5523 11.3077 21 10.86 21 10.3077V10.3077C21 9.75539 20.5523 9.30768 20 9.30768H12.6924C12.1401 9.30768 11.6924 8.85996 11.6924 8.30768V1C11.6924 0.447715 11.2447 0 10.6924 0V0C10.1401 0 9.69238 0.447716 9.69238 1V8.30768C9.69238 8.85996 9.24467 9.30768 8.69238 9.30768H1C0.447715 9.30768 0 9.75539 0 10.3077V10.3077C0 10.86 0.447715 11.3077 1 11.3077H8.69238Z" />
            </svg>
        </button>
    )
}

export default CreateDataButton
