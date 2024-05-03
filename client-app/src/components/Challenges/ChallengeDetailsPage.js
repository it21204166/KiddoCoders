import React, { useEffect, useState } from "react";
import "./ChallengeDetailsPage.css";
import { useParams, useHistory } from "react-router-dom";
import { api } from "../../Config";
import axios from "axios";
import Header from "../common/header/Header";

function ChallengeDetailsPage() {
    const params = useParams();
    const history = useHistory();
    const [challenge, setChallenge] = useState({ scorePoints: [] });

    useEffect(() => {
        const fetchItem = async () => {
            const result = await axios.get(
                `${api}/challenge/getChallenge/${params.id}`
            );
            setChallenge(result.data.result);
        };

        fetchItem();
    }, [params.id]);

    const handleAttemp = (clickekdItem) => {
        const id = clickekdItem._id;
        history.push(`/challenge/attemp/${id}`);
    };

    return (
        <div>
            <div className="challenge-header">
                <Header />
            </div>
            <div className="challenge-main-details-container">
                <h1>What you have to do?</h1>
                <div className="card challenge-details-container">
                    <div className="card-body">
                        <h3 className="card-title">{challenge.title}</h3>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                            {challenge.description}
                        </h6>
                        <hr />
                        <h3>Score Criteria</h3>
                        {challenge.scorePoints.map((item, index) => {
                            return (
                                <p className="card-text" key={index}>
                                    {index + 1}. {item}
                                </p>
                            );
                        })}
                        <hr />
                        <p className="card-text">
                            <h3>Time</h3>
                            {challenge.timeDuration} mins
                        </p>
                        <hr />
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => handleAttemp(challenge)}
                                style={{fontSize: "14px"}}
                            >
                                Attemp Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChallengeDetailsPage;
