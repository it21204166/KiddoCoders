import React, { Component } from "react";
import Back from "../common/back/Back";
import TeamCard from "./TeamCard";
import "./team.css";
import Awrapper from "../about/Awrapper";
import "../about/about.css";

class Team extends Component {
  render() {
    return (
      <>
        <Back title='Team' />
        <section className='team padding'>
          <div className='container grid'>
            <TeamCard />
          </div>
        </section>
        <Awrapper />
      </>
    );
  }
}

export default Team;
