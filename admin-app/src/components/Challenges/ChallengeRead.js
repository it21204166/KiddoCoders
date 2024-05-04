import React, { useEffect, useState } from "react";
import "./ChallengeRead.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../Config";
import axios from "axios";
import Swal from "sweetalert2";

function ChallengeRead() {
    const [challenge, setChallenge] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            const result = await axios.get(`${api}/challenge/getChallenges`);

            setChallenge(result.data.result);
        };

        fetchItem();
    }, []);

    const handleEdit = (clickedItem) => {
        const id = clickedItem._id;
        navigate(`/challenge/edit/${id}`);
    };

    const handleDelete = (clickedItem) => {
        try {
            const id = clickedItem._id;

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Challenge has been deleted.",
                        icon: "success",
                    });

                    await axios.delete(
                        `${api}/challenge/deleteChallenge/${id}`
                    );

                    setChallenge(
                        challenge.filter((item) => {
                            if (item._id === id) {
                                return false;
                            } else {
                                return true;
                            }
                        })
                    );
                }
            });
        } catch (err) {
            console.log(err).Swal.fire({
                title: "Error",
                text: "Failed to delete item.",
                icon: "error",
            });
        }
    };

    return (
        <main className="read_table">
            <section className="table_header">
                <h3>Challenges Catalogue</h3>
            </section>
            <section className="table_body">
                <table className="table align-middle">
                    <thead className="table-primary text-center">
                        <tr>
                            <th scope="col" style={{ width: "1%" }}>
                                Id
                            </th>
                            <th scope="col" style={{ width: "10%" }}>
                                Title
                            </th>
                            <th scope="col" style={{ width: "30%" }}>
                                Description
                            </th>
                            <th scope="col" style={{ width: "28%" }}>
                                Score Points
                            </th>
                            <th scope="col" style={{ width: "1%" }}>
                                Time
                            </th>
                            <th scope="col" style={{ width: "15%" }}>
                                Answer
                            </th>
                            <th scope="col" style={{ width: "15%" }}>
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {challenge.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        {item.scorePoints.map(
                                            (point, index) => {
                                                return (
                                                    <p key={index}>{point}</p>
                                                );
                                            }
                                        )}
                                    </td>

                                    <td>{item.timeDuration}</td>
                                    <td>{item.answer}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button
                                                className="btn btn-outline-success btn-sm"
                                                onClick={() => handleEdit(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default ChallengeRead;
