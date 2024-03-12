import React from 'react'

interface IButtonFuncLinkProps {
    updateFunc: () => void;
    title: string
}

const ButtonFuncLink = ({ title, updateFunc }: IButtonFuncLinkProps) => {

    return (
        <button className="image-editor__btn" onClick={() => {  updateFunc()}}>
            {title}
        </button>
    )
}

export default ButtonFuncLink
