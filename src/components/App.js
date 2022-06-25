import '../pages/index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, openProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, openPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, openAvatarPopup] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState(null);

  function openEditProfile() {
    openProfilePopup(true);
  }
  
  function openAddPlace() {
    openPlacePopup(true);
  }
  
  function openEditAvatar() {
    openAvatarPopup(true);
  }

  function closeAllPopups() {
    openProfilePopup(false);
    openPlacePopup(false);
    openAvatarPopup(false);
    handleCardClick(null);
  }

  function setSelectedCard(card) {
    handleCardClick(card);
  }

  return (
    <div className='body'>
      <div className='page'>
        <Header />
        <Main 
        onEditProfile={openEditProfile} 
        onAddPlace={openAddPlace} 
        onEditAvatar={openEditAvatar} 
        onCardClick={setSelectedCard}/>
        <Footer />

        <PopupWithForm 
        name='form-user' 
        title='Редактировать профиль' 
        saveButton='Сохранить' 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}>
          <input id='user-name' type='text' name='name' className='popup__field popup__field_type_name' placeholder='Имя'
            required minLength='2' maxLength='40' />
          <span id='user-name-error' className='popup__error'></span>
          <input id='user-description' type='text' name='description' className='popup__field popup__field_type_description'
            placeholder='О себе' required minLength='2' maxLength='200' />
          <span id='user-description-error' className='popup__error'></span>
        </PopupWithForm>

        <PopupWithForm 
        name='form-photo' 
        title='Новое место' 
        saveButton='Создать' 
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}>
          <input id='photo-name' type='text' name='name' className='popup__field' placeholder='Название' required
            minLength='2' maxLength='30' />
          <span id='photo-name-error' className='popup__error'></span>
          <input id='photo-url' type='url' name='link' className='popup__field' placeholder='Ссылка на картинку' required />
          <span id='photo-url-error' className='popup__error'></span>
        </PopupWithForm>

        <PopupWithForm 
        name='avatar' 
        title='Обновить аватар' 
        saveButton='Сохранить' 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}>
          <input id='avatar-url' type='url' name='link' className='popup__field' placeholder='Ссылка на картинку' required />
          <span id='avatar-url-error' className='popup__error'></span>
        </PopupWithForm>

        <PopupWithForm 
        ame='delete' 
        title='Вы уверены?' 
        saveButton='Да' />

        <ImagePopup 
        onClose={closeAllPopups} 
        card={selectedCard} />
        
      </div>
    </div>
  );
}

export default App;
