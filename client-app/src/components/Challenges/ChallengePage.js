import React from "react";
import "./ChallengePage.css"
import Header from "../common/header/Header";
import QuizList from "./QuizList";
import UserList from "./UserList";

function ChallengePage() {
    return (
        <div>
            <div className="challenge-header">
                <Header />
            </div>

            <div className="challenge-body">
                <QuizList />
                <UserList />
            </div>
        </div>
    );
}

export default ChallengePage;
