import React, { useEffect, useState } from "react";
import "./AttempChallenge.css";
import { useParams, useHistory } from "react-router-dom";
import { api } from "../../Config";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../common/header/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AttempChallenge() {
    const params = useParams();
    const history = useHistory();
    const [challenge, setChallenge] = useState({ scorePoints: [] });
    const [ans, setAns] = useState("");
    const [remainTime, setRemainTime] = useState(null);

    const [text, setText] = useState("");

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
    ];

    const handleChange = (value) => {
        setText(value);
    };

    useEffect(() => {
        const fetchItem = async () => {
            const result = await axios.get(
                `${api}/challenge/getChallenge/${params.id}`
            );
            setChallenge(result.data.result);
            setAns(result.data.result.answer);
            setRemainTime(result.data.result.timeDuration * 60);

            const timer = setInterval(() => {
                setRemainTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        Swal.fire({
                            title: "Submit Successfully!",
                            text: `Your marks : ${accuracy}`,
                            icon: "success",
                        });
                        setTimeout(() => {
                            history.push("/challenge");
                        }, 2500);
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

    const handleFinish = () => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#7066e0",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, finish it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setText(text)
                    Swal.fire({
                        title: "Submit Successfully!",
                        text: `Your marks : ${accuracy} ${enteredCode} ${expectedCode} `,
                        icon: "success",
                    });
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

    function calculateAccuracy(enteredCode, expectedCode) {
        const enteredLines = enteredCode.split("\n");
        const expectedLines = expectedCode.split("\n");

        let matchingLines = 0;
        for (
            let i = 0;
            i < Math.min(enteredLines.length, expectedLines.length);
            i++
        ) {
            if (enteredLines[i].trim() === expectedLines[i].trim()) {
                matchingLines++;
            }
        }

        const totalLines = Math.max(enteredLines.length, expectedLines.length);
        const accuracyPercentage = (matchingLines / totalLines) * 100;

        return accuracyPercentage.toFixed(2); // Return accuracy percentage with two decimal places
    }

    // Example usage
    const value = text.replace(/<\/?p>/g, "");
    const enteredCode = value;
    const expectedCode = ans;

    const accuracy = calculateAccuracy(enteredCode, expectedCode);

    return (
        <div>
            <div className="challenge-header">
                <Header />
            </div>

            <div className="attemp-body">
                <div id="text-editor">
                    <ReactQuill
                        value={text}
                        onChange={handleChange}
                        modules={modules}
                        formats={formats}
                        style={{ height: "300px" }}
                    />
                </div>
                <div id="timer">
                    <h3>Challenge Timer</h3>
                    {remainTime !== null && (
                        <p>
                            Time Remaining: {minutes}:{seconds}
                        </p>
                    )}
                    <div>
                        <button
                            className="btn btn-primary"
                            style={{ width: "12vw", fontSize: "14px" }}
                            onClick={handleFinish}
                        >
                            Finish Attemp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttempChallenge;
