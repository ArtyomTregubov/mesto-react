import React from "react";

export default function PopupAvatar() {
  return (
    <>
      <input
        type="url"
        name="avatar"
        className="popup__input popup__input_form_description"
        placeholder="Ссылка на картинку"
        required
        id="url"
      />
      <span className="popup__input-error" id="url-error"></span>
    </>
  );
}
