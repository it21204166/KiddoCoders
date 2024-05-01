import axios from "axios";
import "./UserList.css";
import React, { useEffect, useState } from "react";
import { api } from "../../Config";
import UserItem from "./UserItem";
import { IoSearch } from "react-icons/io5";


function UserList() {
    const [user, setUser] = useState([]);
    const logUserId = "65fd823969d063e93b68f8f8";

    // get users from database
    useEffect(() => {
        try {
            const fetchItem = async () => {
                const result = await axios.get(
                    `${api}/admin/users/getRestUsers/${logUserId}`
                );

                setUser(result.data.result);
            };

            fetchItem();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleChallenge = (clickedItem) => {
        alert(clickedItem._id);
    };

    return (
        <div className="user-list-container">
            <section className="user-list-head">
                <h3>Freinds Squad</h3>
            </section>
            <section className="user-list-body">
                {user.map((item, index) => {
                    return (
                        <UserItem
                            key={index}
                            item={item}
                            onClick={() => {
                                handleChallenge(item);
                            }}
                        />
                    );
                })}
            </section>
        </div>
    );
}

export default UserList;
