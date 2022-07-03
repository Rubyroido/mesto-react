import React from 'react';
import App from './App.js';
import Card from './Card.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [initialCards, setinitialCards] = React.useState([]);

    React.useEffect(() => {
        api.getInitialCards()
            .then((items) => {
                setinitialCards([...items]);
            })
            .catch((err) => {
                (console.log(err));
            });
    }, [])

    return (
        <div className='main'>
            <section className='profile'>
                <div className='profile__card'>
                    <div className='profile__avatar-container'>
                        <button type='button' className='profile__avatar-change' onClick={onEditAvatar} />
                        <img src={currentUser.avatar} className='profile__avatar' />
                    </div>
                    <div className='profile__info'>
                        <h1 className='profile__name'>{currentUser.name}</h1>
                        <button type='button' className='profile__button-edit' onClick={onEditProfile} />
                        <p className='profile__description'>{currentUser.about}</p>
                    </div>
                </div>
                <button type='button' className='profile__button-add' onClick={onAddPlace} />
            </section>

            <section className='places'>
                <ul className='table'>
                    {initialCards.map((card) => <Card card={card} key={card._id} onCardClick={onCardClick} />)}
                </ul>
            </section>
        </div>
    )
}

export default Main;