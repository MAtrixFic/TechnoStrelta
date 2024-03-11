import React from 'react'

interface IUserCellProps {
    title: string;
    method: () => void;
    sign: string;
}

const UserCell = ({ title, method, sign }: IUserCellProps) => {
    return (
        <li className="add-user__user blue">
            <img src="*" alt="user image" />
            <h4>{title}</h4>
            <button className="add-user__user-btn" onClick={() => method()}>
                {sign}
            </button>
        </li>
    )
}

export default UserCell;
