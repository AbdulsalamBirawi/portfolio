import React from "react";
import "./Recommendation.css";
import { recommendation } from "./Data";
import RecommendationItems from "./RecommendationItems";

const Recommendation = () => {
  return (
    <section className="work section" id="portfolio">
      <h2 className="section__title">Recommendations</h2>
      <span className="section__subtitle">My Recommendations</span>
      <div className="work__container container grid">
        {recommendation.map((item) => {
          return <RecommendationItems item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
};

export default Recommendation;
