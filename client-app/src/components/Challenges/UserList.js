import axios from "axios";
import "./UserList.css";
import React, { useEffect, useState } from "react";
import { api } from "../../Config";
import UserItem from "./UserItem";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UserList() {
    const history = useHistory();
    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("AuthToken");
                if (token) {
                    const jwtToken = jwtDecode(token);
                    if (jwtToken.userId) {
                        setUserId(jwtToken.userId);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    console.log(userId);

    // get users from database
    useEffect(() => {
        try {
            const fetchItem = async () => {
                const result = await axios.get(
                    `${api}/admin/users/getRestUsers/${userId}`
                );

                setUser(result.data.result);
            };

            fetchItem();
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleChallenge = (clickedItem) => {
        const id = clickedItem._id;
        history.push(`/challenge/choose/${id}`);
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
