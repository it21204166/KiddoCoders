import React from "react";

function UserItem({ item, onClick }) {
    return (
        <div className="user-item-container">
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    {item.kiddoName}
                    <button className="btn btn-outline-primary btn-sm" onClick={onClick}>
                        Challenge
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default UserItem;
