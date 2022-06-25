import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';


function App() {
  return (
    <body className='body'>
      <div className='page'>
        <Header />
        <Main />
        <Footer />

        <PopupWithForm name='form-user' title='Редактировать профиль' saveButton='Сохранить'>
          <input id='user-name' type='text' name='name' className='popup__field popup__field_type_name' placeholder='Имя'
            value='Жак-Ив Кусто' required minlength='2' maxlength='40' />
          <span id='user-name-error' className='popup__error'></span>
          <input id='user-description' type='text' name='description' className='popup__field popup__field_type_description'
            placeholder='О себе' value='Исследователь океана' required minlength='2' maxlength='200' />
          <span id='user-description-error' className='popup__error'></span>
        </PopupWithForm>

        <PopupWithForm name='form-photo' title='Новое место' saveButton='Создать'>
          <input id='photo-name' type='text' name='name' className='popup__field' placeholder='Название' required
            minlength='2' maxlength='30' />
          <span id='photo-name-error' className='popup__error'></span>
          <input id='photo-url' type='url' name='link' className='popup__field' placeholder='Ссылка на картинку' required />
          <span id='photo-url-error' className='popup__error'></span>
        </PopupWithForm>

        <PopupWithForm name='avatar' title='Обновить аватар' saveButton='Сохранить'>
          <input id='avatar-url' type='url' name='link' className='popup__field' placeholder='Ссылка на картинку' required />
          <span id='avatar-url-error' className='popup__error'></span>
        </PopupWithForm>

        <PopupWithForm name='delete' title='Вы уверены?' saveButton='Да' />

        <ImagePopup />
        
        <template id='place-template'>
          <li className='table__cell'>
            <img src='#' alt='фотография' className='table__photo' />
            <div className='table__photo-description'>
              <h2 className='table__photo-name'></h2>
              <div className='table__like-container'>
                <button type='button' className='table__button-like'></button>
                <p className='table__like-counter'>0</p>
              </div>
            </div>
            <button type='button' className='table__button-delete'></button>
          </li>
        </template>
      </div>

    </body>
  );
}

export default App;
