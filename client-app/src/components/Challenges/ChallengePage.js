import React, { useEffect, useState } from "react";
import "./ChallengePage.css";
import Header from "../common/header/Header";
import QuizList from "./QuizList";
import UserList from "./UserList";
import { IoMdNotifications } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ChallengePage() {
    const history = useHistory();
    const [userId, setUserId] = useState(null);

    //Get logged user
    useEffect(() => {
        let userId = null;
        const token = localStorage.getItem("AuthToken");
        const jwtToken = jwtDecode(token); // Fix usage of jwtDecode

        console.log("tokentokentokentoken", jwtToken);

        if (jwtToken.userId) {
            userId = jwtToken.userId;
            setUserId(userId);
        }
    }, []);

    const handleNotification = () => {
        history.push(`/challenge/notification/${userId}`);
    };

    return (
        <div>
            <div className="challenge-header">
                <Header />
            </div>
            <IoMdNotifications
                onClick={handleNotification}
                style={{
                    fontSize: "30px",
                    color: "#48bec7",
                    float: "right",
                    marginTop: "3vh",
                    marginRight: "1vw",
                    cursor: "pointer",
                }}
            />
            <div className="challenge-body">
                <QuizList />
                <UserList />
            </div>
        </div>
    );
}

export default ChallengePage;
