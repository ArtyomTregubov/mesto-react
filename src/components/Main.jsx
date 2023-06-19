import React from "react";

import API from "../utils/api";
import Card from "./Card";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { name, about, avatar } = await API.getUserInfo();
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      } catch (err) {
        console.log(err);
      }
      try {
        const initialCards = await API.getInitialCards();
        setCards(initialCards);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="pen-overlay" onClick={onEditAvatar}>
          <div className="pen"></div>
          <img alt="аватар" className="profile__avatar" src={userAvatar} />
        </div>

        <div className="profile__info">
          <h1 className="profile__info-name">{userName}</h1>
          <p className="profile__info-description">{userDescription}</p>
          <button
            className="profile__info-button-edit"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        {cards.map((card) => {
          return <Card card={card} onCardClick={onCardClick} key={card._id} />;
        })}
      </section>
    </main>
  );
}
