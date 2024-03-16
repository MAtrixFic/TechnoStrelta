import React from 'react'

interface IEditImageBtProps {
    func: (data: any | never) => void;
}

const EditImageBt = ({ func }: IEditImageBtProps) => {

    return (
        <button className='new-data__edit-bt' onClick={() => func(true)}>
            <svg width="30" height="30" viewBox="0 0 30 31" fill="#006ADC" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5332 2.82843L27.483 7.77817L23.9474 11.3137L18.9977 6.36396L22.5332 2.82843ZM17.5835 7.77817L3.95746 21.4042L2.30313 28.0082L8.90721 26.3539L22.5332 12.7279L17.5835 7.77817ZM21.119 1.41421C21.9 0.633165 23.1664 0.633165 23.9474 1.41421L28.8972 6.36396C29.6782 7.14501 29.6782 8.41134 28.8972 9.19239L10.3214 27.7681C10.0653 28.0242 9.74451 28.206 9.39319 28.294L2.78912 29.9483C1.32372 30.3154 -0.00400777 28.9877 0.363075 27.5223L2.0174 20.9182C2.10541 20.5669 2.28715 20.246 2.54325 19.99L21.119 1.41421Z" />
            </svg>
        </button>
    )
}

export default EditImageBt
