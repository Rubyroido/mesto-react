import '../pages/index.css';
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';

function App() {
  const [isEditProfilePopupOpen, openProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, openPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, openAvatarPopup] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState(null);
  const [currentUser, getUser] = React.useState({});
  const [cards, getCardsList] = React.useState([]);

  // React.useEffect(() => {
  //   api.getUserInfo()
  //     .then((data) => {
  //       getUser(data)
  //     })
  //     .catch((err) => {
  //       (console.log(err));
  //     });
  // }, []);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, items]) => {
        getUser(data);
        getCardsList([...items]);
      })
      .catch((err) => {
        (console.log(err));
      });
  }, [])

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

  function handleUpdateUser(item) {
    api.updateProfile(item)
      .then((data) => {
        getUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data.avatar)
      .then((data) => {
        getUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      getCardsList((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      (console.log(err));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      let newCards = cards.filter((c) => c._id === card._id);
      getCardsList(newCards);
    }).catch((err) => {
      (console.log(err));
    });
  }

  return (
    <div className='body'>
      <div className='page'>
        <CurrentUserContext.Provider value={currentUser}>

          <Header />
          <Main
            onEditProfile={openEditProfile}
            onAddPlace={openAddPlace}
            onEditAvatar={openEditAvatar}
            onCardClick={setSelectedCard}
            cards={cards}
            onCardLike={handleCardLike}
            handleCardDelete={handleCardDelete} />
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        </CurrentUserContext.Provider>

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
          name='delete'
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
