import React, { useState } from "react";
import "./ChallengeAdd.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../Config";

function ChallengeAdd() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [scorePoints, setScorePoints] = useState([]);
    const [timeDuration, setTimeDuration] = useState(0);
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate();

    const handleAdd = (e) => {
        e.preventDefault();

        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, add it!",
            }).then( async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Added!",
                        text: "Challenge has been added.",
                        icon: "success",
                    });
                    await axios.post(`${api}/challenge/addChallenge`, {
                        title,
                        description,
                        scorePoints,
                        timeDuration,
                        answer
                    });
                    navigate("/challenge/read");
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
        <div className="challenge-add-container">
            <h3 className="challenge-add-subtitle">Add New Challenge</h3>

            <div className="inner-container">
                <form>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Question Title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Score Points</label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Point 1 | Point 2 | Point 3"
                            value={scorePoints.join("|")}
                            onChange={(e) =>
                                setScorePoints(e.target.value.split("|"))
                            }
                        ></textarea>
                        <div id="emailHelp" className="form-text">
                            You can add more score points using "|" symbol.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Time Duration</label>
                        <input
                            type="number"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Set time duration..."
                            value={timeDuration}
                            onChange={(e) => {
                                setTimeDuration(e.target.value);
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Expected Answer</label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Answer"
                            value={answer}
                            onChange={(e) =>
                                setAnswer(e.target.value)
                            }
                        ></textarea>
                        <div id="emailHelp" className="form-text">
                            You can add answer for relevant challenge.
                        </div>
                    </div>

                    <div className="button-container">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAdd}
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChallengeAdd;
