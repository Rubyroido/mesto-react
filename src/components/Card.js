import React from 'react';
import App from './App.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `table__button-delete ${isOwn ? '' : 'button-delete_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `table__button-like ${isLiked ? 'button-like_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className='table__cell'>
            <img src={props.card.link} alt='фотография' className='table__photo' onClick={handleClick} />
            <div className='table__photo-description'>
                <h2 className='table__photo-name'>{props.card.name}</h2>
                <div className='table__like-container'>
                    <button type='button' className={cardLikeButtonClassName} />
                    <p className='table__like-counter'>{props.card.likes.length}</p>
                </div>
            </div>
            <button type='button' className={cardDeleteButtonClassName} />
        </li>
    )
}

export default Card;