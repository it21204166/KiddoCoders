import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./ChooseChallenge.css";
import axios from "axios";
import { api } from "../../Config";
import { RxLapTimer } from "react-icons/rx";
import Header from "../common/header/Header";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

function ChooseChallenge() {
    const params = useParams();
    const history = useHistory();

    const [user, setUser] = useState("");
    const [challenge, setChallenge] = useState([]);
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

    // Retrieve Friend's Details
    useEffect(() => {
        const fetchItem = async () => {
            const result = await axios.get(
                `${api}/admin/users/get-user-by-id/${params.id}`
            );
            setUser(result.data.data);
        };

        fetchItem();
    }, [params.id]);

    // Display Challenegs
    useEffect(() => {
        const fetchItem = async () => {
            const result = await axios.get(`${api}/challenge/getChallenges`);

            setChallenge(result.data.result);
        };

        fetchItem();
    }, []);

    const handleClick = async (clickedItem) => {
        const challengeId = clickedItem._id;
        const senderId = userId;
        const recieverId = params.id;

        try {
            Swal.fire({
                title: "Are you sure?",
                text: `Do you want to challenge ${user.kiddoName}!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#7066e0",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Challenge",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Sent!",
                        text: "Challenge has been sent.",
                        icon: "success",
                    });
                    await axios.post(`${api}/send/addMsg`, {
                        senderId,
                        recieverId,
                        challengeId,
                    });
                    history.push("/");
                }
            });
        } catch (err) {
            console.log(err);

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
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
                Pick Challenge
            </h3>
            <div className="choose-container">
                {challenge.map((item, index) => {
                    return (
                        <div
                            className="card text-center"
                            id="small-box"
                            onClick={() => handleClick(item)}
                            style={{
                                width: "20vw",
                                height: "20vh",
                                cursor: "pointer",
                            }}
                            key={index}
                        >
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <div className="time">
                                    <RxLapTimer style={{ fontSize: "20px" }} />
                                    {item.timeDuration}
                                    <span>min</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ChooseChallenge;
