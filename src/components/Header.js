import React from 'react';
import App from './App.js';
import headerLogo from '../images/logo.svg';

function Header() {
    return (
        <div className="header">
            <img src={headerLogo} alt="логотип, место" className="header__logo" />
        </div>
    )
}

export default Header;