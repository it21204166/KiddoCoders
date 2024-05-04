import React, { Component } from 'react'
import Header from '../../common/header/HeaderToPage'
import "../Beginners/beginner.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import EditorComponent from './EditorComponentIntermediate ';

export default class  extends Component {
  render() {
    return (
      <div>
                <div className='bg'>
                    <Header />
                </div>
                <div>
                    <div className='beg-container'>
                        <h1 className='beg'>Learn C Programming in Easy Way</h1>
                        <div className='search-container'>
                        <div className='search'>
                            <input className='search-input' type='search' placeholder='Search C programming exercises...'></input>
                            <FontAwesomeIcon className='search-icon'  icon={faSearch} />
                        </div>
                        <div className='ace-container'>
                            <EditorComponent />
                            <div>
                            <a href='/gridpageintermediate'><button className='beg-btn'>Start Exercises</button></a>
                        </div>
                        </div>
                        
                        </div>
                        
                    </div>
                </div>
            </div>
    )
  }
}
