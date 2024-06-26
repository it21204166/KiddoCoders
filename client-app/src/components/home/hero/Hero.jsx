import React, { Component } from "react";
import Heading from "../../common/heading/Heading";
import "./Hero.css";

class Hero extends Component {
  render() {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <Heading
                            subtitle="WELCOME TO KIDDOCODER"
                            title="Best Online Education Expertise"
                        />
                        <p>
                            Far far away, behind the word mountains, far from
                            the countries Vokalia and Consonantia, there live
                            the blind texts.
                        </p>
                        <div
                            className="button"
                            style={{ display: "flex", gap: "2vw" }}
                        >
                            <button className="btn btn-primary btn-sm">
                                GET STARTED NOW{" "}
                                <i className="fa fa-long-arrow-alt-right"></i>
                            </button>
                            <button className="btn btn-primary btn-sm">
                                VIEW COURSE{" "}
                                <i className="fa fa-long-arrow-alt-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="margin"></div>
        </>
    );
  }
}

export default Hero;
