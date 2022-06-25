import React from 'react';
import App from './App.js';

function ImagePopup() {
    return (
        <div className='popup popup_type_photo'>
            <div className='popup__photo-container'>
                <img src='#' alt='фотография' className='popup__photo' />
                <p className='popup__photo-name'></p>
                <button type='button' className='popup__button-close popup__button-close_type-photo-card'></button>
            </div>
        </div>
    )
}

export default ImagePopup;
