import React from 'react';
import Header from "../common/header/HeaderToPage";
import "../Tutorial/tutorial.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons'

export default function Exersice1() {
  return (
    <div >
      <div className='bg'>
      <Header />
      </div>
      <div className='main-container1'>
        
        <div className='container-beg1'>
          <div >
            <div>
              <FontAwesomeIcon icon={faBookOpenReader} className='smile-icon' />
            </div>
            <div className='title'>
              <h2>Tutorials For Beginners</h2>

            </div>
            <div className='paragraph'>
              <p>Dive into the basics with our step by step tutorial designed to introduce newcommers to coding world</p>
            </div>
            <div>
            <a href='/beginners'><button className='button-start'>Start Now</button></a>
            </div>
          </div>
        </div>
        <div className='container-inter1'>
          <div >
            <div>
              <FontAwesomeIcon icon={faBookOpenReader} className='smile-icon' />
            </div>
            <div className='title'>
              <h2>Tutorials For Intermediate</h2>

            </div>
            <div className='paragraph'>
              <p>Elavate your understanding with our intermediate-level tutorial, tailored withcoding experience.</p>
            </div>
            <div>
            <a href='/beginners'><button className='button-start'>Start Now</button></a>
            </div>
          </div>
        </div>
        
        <div className='container-comp'>
          <div>
            <div>
              <FontAwesomeIcon icon={faBookOpenReader} className='smile-icon' />
            </div>
            <div className='title-int'>
              <h2>Online Compiler</h2>

            </div>
            <div className='paragraph'>
              <p>Access our user friendly online compiler, enabling to execute coding</p>
            </div>
            <div>
              <a href='/intermediate'><button className='button-start'>Start Now</button></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}