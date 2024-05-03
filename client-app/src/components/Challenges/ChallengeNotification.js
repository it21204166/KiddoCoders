import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { api } from "../../Config";
import Header from "../common/header/Header";
import { RxLapTimer } from "react-icons/rx";

function ChallengeNotification() {
    const params = useParams();
    const history = useHistory();
    const [msg, setMsg] = useState([]);
    const [challenges, setChallenges] = useState([]);

    // Retrieve Msgs
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const result = await axios.get(
                    `${api}/send/getRecievedMsg/${params.id}`
                );
                setMsg(result.data);

                const challengeIds = result.data.map(
                    (item) => item.challengeId
                );
                console.log(challengeIds);

                // Fetch challenges for each challengeId
                const challenges = await Promise.all(
                    challengeIds.map(async (challengeId) => {
                        const result = await axios.get(
                            `${api}/challenge/getChallenge/${challengeId}`
                        );
                        return result.data.result;
                    })
                );
                setChallenges(challenges);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchItem();
    }, [params.id]);

    const handleViewAccept = (clickedItem) => {
        const id = clickedItem._id;
        history.push(`/challenge/details/${id}`);
    };

    const handleViewCancel = (clickedItem) => {
        const id = clickedItem._id;

        setChallenges(
            challenges.filter((item) => {
                if (item._id === id) {
                    return false;
                } else {
                    return true;
                }
            })
        );
    };

    return (
        <div>
            <div className="challenge-header">
                <Header />
            </div>

            <h3
                style={{
                    textAlign: "center",
                    fontSize: "32px",
                    fontWeight: "500",
                    paddingTop: "5vh",
                }}
            >
                Your Invititations
            </h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "5%",
                    padding: "4%",
                }}
            >
                {challenges.map((item, index) => {
                    return (
                        <div
                            className="card text-center"
                            key={index}
                            id="small-box"
                            style={{
                                width: "25vw",
                                height: "30vh",
                                cursor: "pointer",
                            }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <div className="time">
                                    <RxLapTimer style={{ fontSize: "20px" }} />
                                    {item.timeDuration}
                                    <span>min</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => handleViewAccept(item)}
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleViewCancel(item)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ChallengeNotification;
