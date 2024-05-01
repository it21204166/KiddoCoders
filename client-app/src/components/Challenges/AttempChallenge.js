import React, { useEffect, useState } from "react";
import "./AttempChallenge.css";
import { useParams, useHistory } from "react-router-dom";
import { api } from "../../Config";
import axios from "axios";

function AttempChallenge() {
    const params = useParams();
    const history = useHistory();
    const [challenge, setChallenge] = useState({ scorePoints: [] });
    const [remainTime, setRemainTime] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            const result = await axios.get(
                `${api}/challenge/getChallenge/${params.id}`
            );
            setChallenge(result.data.result);
            setRemainTime(result.data.result.timeDuration * 60);

            const timer = setInterval(() => {
                setRemainTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        history.push("/challenge");
                        return 0;
                    }
                    return prevTime - 0.5;
                });
            }, 1000);

            return () => clearInterval(timer);
        };

        fetchItem();
    }, [params.id, history]);

    const formatTime = (value) => {
        return value < 10 ? `0${value}` : value.toString();
    };

    const minutes = formatTime(Math.floor(remainTime / 60));
    const seconds = formatTime(Math.floor(remainTime % 60));

    return (
        <div>
            <div id="text-editor"></div>
            <div id="timer">
                <h3>Challenge Timer</h3>
                {remainTime !== null && (
                    <p>
                        Time Remaining: {minutes}:{seconds}
                    </p>
                )}
                <button className="btn btn-success">Finish</button>
            </div>
        </div>
    );
}

export default AttempChallenge;
