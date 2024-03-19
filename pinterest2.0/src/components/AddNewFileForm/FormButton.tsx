import React from 'react'
import { type IFormButtonProps } from '@/types/newfileform.type'

const FormButton = ({ title, operation }: IFormButtonProps) => {

    return (
        <button onClick={operation} className="new-data__bt">
            {title}
        </button>
    )
}

export default FormButton
