import React, { Component } from "react";
import { awrapper } from "../../dummydata";

class Awrapper extends Component {
  render() {
    return (
      <>
        <section className='awrapper'>
          <div className='container grid'>
            {awrapper.map((val, index) => (
              <div key={index} className='box flex'>
                <div className='img'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <h1>{val.data}</h1>
                  <h3>{val.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }
}

export default Awrapper;
