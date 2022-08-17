import React from 'react';
import './LogoSearch.css';
import logo from '../../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const LogoSearch = () => {
    return (
        <div className='logoSearch d-flex'>
            <img src={logo} alt="" />
            <div className="search">
                <input type="text" placeholder='#Explore' />
                <div className="s-icon">
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
        </div>
    );
};

export default LogoSearch;