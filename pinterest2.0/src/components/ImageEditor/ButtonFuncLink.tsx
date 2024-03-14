import React from 'react'

interface IButtonFuncLinkProps {
    updateFunc: () => void;
    title: string
    modCluss: string
}

const ButtonFuncLink = ({ title, updateFunc,modCluss }: IButtonFuncLinkProps) => {

    return (
        <button className={`image-editor__btn ${modCluss}`} onClick={() => {  updateFunc()}}>
            {title}
        </button>
    )
}

export default ButtonFuncLink
