import React from 'react'

interface IAddUserProps {
    exitFunc: () => void;
}

const AuthorsBlock = ({ exitFunc }: IAddUserProps) => {
    return (
        <div className="add-user__authors-block">
            <h2 className='add-user__title'>Добавленные пользователи</h2>
            <ul className="add-user__list">
                {['MAtrix', 'Yota', "Andry", 'Alahan'].map((user, index) =>
                    <li className="add-user__user" key={index}>
                        <div className="add-user__user-infa">
                            <img src="*" alt="user image" />
                            <h4>{user}</h4>
                        </div>
                        <button className="add-user__user-btn">
                            -
                        </button>
                    </li>
                )}
            </ul>
            <div className="add-user__btns">
                <button className="add-user__btn exit" onClick={exitFunc}>
                    Выйти
                </button>
            </div>
        </div>
    )
}

export default AuthorsBlock;
