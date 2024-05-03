import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../Config";
import Swal from "sweetalert2";

function ChallengeEdit() {
    const params = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [scorePoints, setScorePoints] = useState([]);
    const [timeDuration, setTimeDuration] = useState(0);
    const [answer, setAnswer] = useState("")

    useEffect(() => {
        const fetchItem = async () => {
            const result = await axios.get(
                `${api}/challenge/getChallenge/${params.id}`
            );

            const item = result.data.result;
            setTitle(item.title);
            setDescription(item.description);
            setScorePoints(item.scorePoints);
            setTimeDuration(item.timeDuration);
            setAnswer(item.answer)
        };

        fetchItem();
    }, [params.id]);


    const handleUpdate = (e) => {
        e.preventDefault();

        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, update it!",
            }).then( async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Challenge has been updated.",
                        icon: "success",
                    });

                    const updatedChallenge = {title, description, scorePoints, timeDuration, answer}

                    await axios.put(`${api}/challenge/editChallenge/${params.id}`, updatedChallenge)
                    navigate("/challenge/read")

                }
            });
            
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    }

    return (
        <div className="challenge-add-container">
            <h3 className="challenge-add-subtitle">Edit Challenge</h3>

            <div className="inner-container">
                <form>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter challenege title..."
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
                            placeholder="Enter description..."
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
                            placeholder="Point 1 | Point 2 | Point 3..."
                            value={scorePoints.join("|")}
                            onChange={(e) =>
                                setScorePoints(e.target.value.split("|"))
                            }
                        ></textarea>
                        <div id="emailHelp" class="form-text">
                            You can add more score points using "|" symbol.
                        </div>
                    </div>

                    <div class="mb-3">
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
                        <label className="form-label">Answer</label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            placeholder="Answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        ></textarea>
                        <div id="emailHelp" class="form-text">
                            You can add answer for relevant challenge.
                        </div>
                    </div>

                    <div className="button-container">
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChallengeEdit;
