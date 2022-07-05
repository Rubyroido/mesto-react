import '../pages/index.css';
import React, { useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, openProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, openPlacePopup] = React.useState(false);
  const [isEditAvatarPopupOpen, openAvatarPopup] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState(null);
  const [currentUser, getUser] = React.useState({});
  const [cards, getCardsList] = React.useState([]);

  // React.useEffect(() => {
  //   Promise.all([api.getUserInfo(), api.getInitialCards()])
  //     .then(([data, items]) => {
  //       getUser(data);
  //       getCardsList([...items]);
  //     })
  //     .catch((err) => {
  //       (console.log(err));
  //     });
  // }, [])

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        getUser(data);
      })
      .catch((err) => {
        (console.log(err));
      });
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((items) => {
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

  function handleUpdateUser(user) {
    api.updateProfile(user)
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

  function handleAddPlaceSubmit(card) {
    api.createNewCard(card)
      .then((data) => {
        getCardsList([data, ...cards]);
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
      const newCards = cards.filter((c) => c._id !== card._id);
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
            onCardDelete={handleCardDelete} />
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        </CurrentUserContext.Provider>

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
