import React from "react";

export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <article className="gallery__element" onClick={handleClick}>
      <button className="gallery__trash" type="button"></button>
      <img className="gallery__picture" src={card.link} alt={card.name} />
      <div className="gallery__info">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__number">
          <button className="gallery__like" type="button"></button>
          <span className="gallery__like-count">6</span>
        </div>
      </div>
    </article>
  );
}
