import React from "react";

const RecommendationItems = ({ item }) => {
  return (
    <div className="work__card" key={item.id}>
      <img src={item.image} className="work__img" alt="" />
      <h3 className="work__title">{item.title}</h3>
      <a href={item.url} className="work__button">
        See what Imagine foundation say{" "}
        <i className="bx bx-right-arrow-alt work__button-icon"></i>
      </a>
    </div>
  );
};

export default RecommendationItems;
