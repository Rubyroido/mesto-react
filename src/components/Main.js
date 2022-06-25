import React from 'react';
import App from './App.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
    
    return (
        <div className="main">
            <section className="profile">
                <div className="profile__card">
                    <div className="profile__avatar-container">
                        <button type="button" className="profile__avatar-change" onClick={onEditAvatar}></button>
                        <img src="" className="profile__avatar" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">Жак-Ив Кусто</h1>
                        <button type="button" className="profile__button-edit" onClick={onEditProfile}></button>
                        <p className="profile__description">Исследователь океана</p>
                    </div>
                </div>
                <button type="button" className="profile__button-add" onClick={onAddPlace}></button>
            </section>

            <section className="places">
                <ul className="table"></ul>
            </section>
        </div>
    )
}

export default Main;