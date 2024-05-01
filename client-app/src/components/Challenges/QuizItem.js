import React from "react";
import { RxLapTimer } from "react-icons/rx";

function QuizItem({ item, onClick }) {
    return (
        <div>
            <div
                className="card text-center"
                onClick={onClick}
                style={{ width: "20vw", height: "20vh", cursor: "pointer" }}
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
        </div>
    );
}

export default QuizItem;
