import React from 'react';
import App from './App.js';
import Card from './Card.js';
import api from '../utils/Api.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar }) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [initialCards, setinitialCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([data, items]) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
                setinitialCards([...items]);
            })
            .catch((err) => {
                (console.log(err));
            });
    })

    return (
        <div className='main'>
            <section className='profile'>
                <div className='profile__card'>
                    <div className='profile__avatar-container'>
                        <button type='button' className='profile__avatar-change' onClick={onEditAvatar}></button>
                        <img src={userAvatar} className='profile__avatar' />
                    </div>
                    <div className='profile__info'>
                        <h1 className='profile__name'>{userName}</h1>
                        <button type='button' className='profile__button-edit' onClick={onEditProfile}></button>
                        <p className='profile__description'>{userDescription}</p>
                    </div>
                </div>
                <button type='button' className='profile__button-add' onClick={onAddPlace}></button>
            </section>

            <section className='places'>
                <ul className='table'>
                    {initialCards.map((card) => <Card card={card} key={card._id}></Card>)}
                </ul>
            </section>
        </div>
    )
}

export default Main;