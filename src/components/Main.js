import React from 'react';
import App from './App.js';

function Main() {
    function handleEditAvatarClick() {
        document.querySelector('.popup_type_avatar').classList.add('popup_opened');
    }
    
    function handleEditProfileClick() {
        document.querySelector('.popup_type_form-user').classList.add('popup_opened');
    }

    function handleAddPlaceClick() {
        document.querySelector('.popup_type_form-photo').classList.add('popup_opened');
    }
    
    return (
        <div className="main">
            <section className="profile">
                <div className="profile__card">
                    <div className="profile__avatar-container">
                        <button type="button" className="profile__avatar-change" onClick={handleEditAvatarClick}></button>
                        <img src="" className="profile__avatar" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">Жак-Ив Кусто</h1>
                        <button type="button" className="profile__button-edit" onClick={handleEditProfileClick}></button>
                        <p className="profile__description">Исследователь океана</p>
                    </div>
                </div>
                <button type="button" className="profile__button-add" onClick={handleAddPlaceClick}></button>
            </section>

            <section className="places">
                <ul className="table"></ul>
            </section>
        </div>
    )
}

export default Main;