import React, { Component } from "react";
import { faq } from "../../dummydata";
import Heading from "../common/heading/Heading";

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: null
    };
  }

  toggle = (index) => {
    if (this.state.click === index) {
      this.setState({ click: null });
    } else {
      this.setState({ click: index });
    }
  };

  render() {
    return (
      <>
        <Heading subtitle='FAQS' title='Frequently Asked Questions' />
        <section className='faq'>
          <div className='container'>
            {faq.map((val, index) => (
              <div className='box' key={index}>
                <button className='accordion' onClick={() => this.toggle(index)}>
                  <h2>{val.title}</h2>
                  <span>{this.state.click === index ? <i className='fa fa-chevron-down'></i> : <i className='fa fa-chevron-right'></i>}</span>
                </button>
                {this.state.click === index ? (
                  <div className='text'>
                    <p>{val.desc}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </>
    );
  }
}

export default Faq;
