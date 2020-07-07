import React from 'react';
import logo from './bc_logo.png'
import './Header.css';

const Header = () =>{
    return(
        <div className  = 'header'>
            <img style = {{width: 40, height: 40}} className = 'header-logo' 
            src = {logo} alt = 'reat-coin'/>
        </div>
    )
}

export default Header;
