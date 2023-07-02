import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import CardPopup from "./CardPopup";
import ImagePopup from "./ImagePopup";

import API from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, editProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, addPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, editAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  React.useEffect(() => {
    (async () => {
      try {
        const userInfo = await API.getUserInfo();
        setCurrentUser(userInfo);
      } catch (err) {
        console.log(err);
      }
    })();
    (async () => {
      try {
        const initialCards = await API.getInitialCards();
        setCards(initialCards);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function handleEditProfileClick() {
    editProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    addPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleEditAvatarClick() {
    editAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleCloseAllPopups() {
    editProfilePopupOpen(false);
    addPlacePopupOpen(false);
    editAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }
  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    try {
      API.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleCardDelete(card) {
    try {
      API.deleteCard(card._id).then(() => {
        const cardsAfterDelete = cards.filter((c) => c._id !== card._id);
        setCards([...cardsAfterDelete]);
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleUpdateUser({ name, about }) {
    try {
      API.updateUserInfo({ ...currentUser, name, about });
      setCurrentUser({ ...currentUser, name, about });
    } catch (err) {
      console.log(err);
    }
    handleCloseAllPopups();
  }

  function handleUpdateAvatar(avatar) {
    try {
      API.changeAvatar(avatar);
      setCurrentUser({ ...currentUser, ...avatar });
    } catch (err) {
      console.log(err);
    }
    handleCloseAllPopups();
  }

  function handleAddPlaceSubmit(data) {
    try {
      API.addNewCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
      });
    } catch (err) {
      console.log(err);
    }
    handleCloseAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={handleCloseAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
