import React from 'react';
import App from './App.js';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className='table__cell'>
            <img src={props.card.link} alt='фотография' className='table__photo' onClick={handleClick} />
            <div className='table__photo-description'>
                <h2 className='table__photo-name'>{props.card.name}</h2>
                <div className='table__like-container'>
                    <button type='button' className='table__button-like'></button>
                    <p className='table__like-counter'>{props.card.likes.length}</p>
                </div>
            </div>
            <button type='button' className='table__button-delete'></button>
        </li>
    )
}

export default Card;