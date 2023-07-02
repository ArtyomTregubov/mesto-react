import React from "react";

import PopupWithForm from "./PopupWithForm";
import AvatarPopup from "./AvatarPopup";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      children={<AvatarPopup avatarRef={avatarRef} />}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    />
  );
}
