import React from "react";

import PopupWithForm from "./PopupWithForm";
import CardPopup from "./CardPopup";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const cardNameRef = React.useRef();
  const cardLinkRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name={"card"}
      title={"Новое место"}
      children={
        <CardPopup cardNameRef={cardNameRef} cardLinkRef={cardLinkRef} />
      }
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    />
  );
}
