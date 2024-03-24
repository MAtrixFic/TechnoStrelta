import React from 'react'

import SearchAuthors from './SearchAuthors';
import AuthorsBlock from './AuthorsBlock';

interface IAddUserProps {
    exitFunc: () => void;
}

const AddUserWindow = ({ exitFunc }: IAddUserProps) => {
    return (
        <div className="add-user">
            <div className="add-user__window">
                <AuthorsBlock exitFunc={exitFunc}/>
                <SearchAuthors />
            </div>
        </div>
    )
}

export default AddUserWindow;
