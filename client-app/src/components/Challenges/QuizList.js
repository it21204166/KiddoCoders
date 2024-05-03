import React, { useEffect, useState } from "react";
import "./QuizList.css";
import axios from "axios";
import { api } from "../../Config";
import QuizItem from "./QuizItem";
import { useHistory } from "react-router-dom";

function QuizList() {
    const [challenges, setChallenges] = useState([]);
    const history = useHistory();

    useEffect(() => {
        try {
            const fetchItem = async () => {
                const result = await axios.get(
                    `${api}/challenge/getChallenges`
                );
                setChallenges(result.data.result);
            };

            fetchItem();
        } catch (err) {
            console.log(err);
        }
    }, [])


    const handleClick = (clickedItem) => {
        const id = clickedItem._id
        history.push(`/challenge/details/${id}`);
    }

    return (
        <div className="quiz-list-container">
            <section className="quiz-list-head">
                <h3>Journey Through Challenges</h3>
            </section>

            <section className="quiz-list-body">
                {challenges.map((item, index) => {
                    return <QuizItem key={index} item={item} onClick={() => handleClick(item)} />;
                })}
            </section>
        </div>
    );
}

export default QuizList;
