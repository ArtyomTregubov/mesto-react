import React from "react";

import PopupWithForm from "./PopupWithForm";
import ProfilePopup from "./ProfilePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  const currentUser = React.useContext(CurrentUserContext);

  function onChangeName(value) {
    setName(value);
  }

  function onChangeDescription(value) {
    setDescription(value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
    setName(name);
    setDescription(description);
  }

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      onSubmit={handleSubmit}
      children={
        <ProfilePopup
          name={name}
          description={description}
          onChangeName={onChangeName}
          onChangeDescription={onChangeDescription}
        />
      }
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
    />
  );
}
