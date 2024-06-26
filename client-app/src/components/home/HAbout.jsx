import React, { Component } from "react";
import OnlineCourses from "../allcourses/OnlineCourses";
import Heading from "../common/heading/Heading";
import "../allcourses/courses.css";
import { coursesCard } from "../../dummydata";

class HAbout extends Component {
    render() {
        return (
            <>
                <section className="homeAbout">
                    <div className="container">
                        <Heading
                            subtitle="our courses"
                            title="explore our popular online courses"
                        />

                        <div className="coursesCard">
                            <div className="grid2">
                                {coursesCard.slice(0, 3).map((val, index) => (
                                    <div className="items" key={index}>
                                        <div className="content flex">
                                            <div className="left">
                                                <div className="img">
                                                    <img
                                                        src={val.cover}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="text">
                                                <h1>{val.coursesName}</h1>
                                                <div className="rate">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <label htmlFor="">
                                                        (5.0)
                                                    </label>
                                                </div>
                                                <div className="details">
                                                    {val.courTeacher.map(
                                                        (details, index) => (
                                                            <React.Fragment
                                                                key={index}
                                                            >
                                                                <div className="box">
                                                                    <div className="dimg">
                                                                        <img
                                                                            src={
                                                                                details.dcover
                                                                            }
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                    <div className="para">
                                                                        <h4>
                                                                            {
                                                                                details.name
                                                                            }
                                                                        </h4>
                                                                    </div>
                                                                </div>
                                                                <span>
                                                                    {
                                                                        details.totalTime
                                                                    }
                                                                </span>
                                                            </React.Fragment>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="price">
                                            <h3>
                                                {val.priceAll} / {val.pricePer}
                                            </h3>
                                        </div>
                                        <button className="btn btn-primary">
                                            ENROLL NOW !
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <OnlineCourses />
                </section>
            </>
        );
    }
}

export default HAbout;
