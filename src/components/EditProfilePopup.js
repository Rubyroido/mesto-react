import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, changeName] = React.useState('');
    const [description, changeDescription] = React.useState('');

    React.useEffect(() => {
        changeName(currentUser.name);
        changeDescription(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        changeName(e.target.value);
    }

    function handleDescriptionChange(e) {
        changeDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='form-user'
            title='Редактировать профиль'
            saveButton='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} >
            <input id='user-name' type='text' name='name' className='popup__field popup__field_type_name' placeholder='Имя'
                required minLength='2' maxLength='40' value={name || ''} onChange={handleNameChange} />
            <span id='user-name-error' className='popup__error'></span>
            <input id='user-description' type='text' name='description' className='popup__field popup__field_type_description'
                placeholder='О себе' required minLength='2' maxLength='200' value={description || ''} onChange={handleDescriptionChange} />
            <span id='user-description-error' className='popup__error'></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;