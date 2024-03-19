import React from 'react';
import Header from "../common/header/HeaderToPage";
import "../Exersice/exersice.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons'

export default function Exersice1() {
  return (
    <div >
      <div className='bg'>
      <Header />
      </div>
      <div className='main-container'>
        {/* beginners */}
        <div className='container-beg'>
          <div >
            <div>
              <FontAwesomeIcon icon={faBookOpenReader} className='smile-icon' />
            </div>
            <div className='title'>
              <h2>Exercises For Beginners</h2>

            </div>
            <div className='paragraph'>
              <p>This beginner exercise will give every beginner a full C program idea. It will be very successful if you study the tutorial before doing this</p>
            </div>
            <div>
            <a href='/beginners'><button className='button-start'>Start Now</button></a>
            </div>
          </div>
        </div>
        {/* intermediate */}
        <div className='container-inter'>
          <div>
            <div>
              <FontAwesomeIcon icon={faBookOpenReader} className='smile-icon' />
            </div>
            <div className='title-int'>
              <h2>Exercises For Intermediate</h2>

            </div>
            <div className='paragraph'>
              <p>This intermediate exercise will give every intermediate a complete C programming idea. If you study the tutorial before doing this, it will be very successful</p>
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
