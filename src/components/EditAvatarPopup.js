import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditAvatarPopup() {

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            saveButton='Сохранить'
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}>
            <input id='avatar-url' type='url' name='link' className='popup__field' placeholder='Ссылка на картинку' required />
            <span id='avatar-url-error' className='popup__error'></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;