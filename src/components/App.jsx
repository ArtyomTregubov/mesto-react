import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import PopupProfile from "./PopupProfile";
import PopupAvatar from "./PopupAvatar";
import PopupCard from "./PopupCard";
import PopupImage from "./PopupImage";

function App() {
  const [isEditProfilePopupOpen, editProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, addPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, editAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

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

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name={"avatar"}
        title={"Обновить аватар"}
        children={<PopupAvatar />}
        isOpen={isEditAvatarPopupOpen}
        onClose={handleCloseAllPopups}
      />
      <PopupWithForm
        name={"profile"}
        title={"Редактировать профиль"}
        children={<PopupProfile />}
        isOpen={isEditProfilePopupOpen}
        onClose={handleCloseAllPopups}
      />
      <PopupWithForm
        name={"card"}
        title={"Новое место"}
        children={<PopupCard />}
        isOpen={isAddPlacePopupOpen}
        onClose={handleCloseAllPopups}
      />
      <PopupImage
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={handleCloseAllPopups}
      />
    </div>
  );
}

export default App;
