import React from 'react'

import UserCell from './UserCell';

const SearchAuthors = () => {
    return (
        <div className="add-user__search-authors-block">
            <input type="text" className="add-user__search" placeholder='имя пользователя' />
            <ul className="add-user__list">
                {['MAtrix', 'Yota', "Andry", 'Alahan'].map((user, index) =>
                    <UserCell sign='+' title={user} method={() => ''} key={index} />
                )}
            </ul>
        </div>
    )
}

export default SearchAuthors;