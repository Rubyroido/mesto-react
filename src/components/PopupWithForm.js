import React from 'react';
import App from './App.js';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name}`}>
            <form className='popup__container'>
                <h2 className='popup__container-name'>{props.title}</h2>
                <button type='button' className='popup__button-close'></button>
                {props.children}
                <button type='submit' className='popup__button-save'>{props.saveButton}</button>
            </form>
        </div>
    )
}

export default PopupWithForm;