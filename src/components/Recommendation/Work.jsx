import React from "react";
import "./work.css";
import { projectsData } from "./Data";
import WorkItems from "./WorkItems";

const Work = () => {
  return (
    <section className="work section" id="portfolio">
      <h2 className="section__title">Portfolio</h2>
      <span className="section__subtitle">My Projects</span>
      <div className="work__container container grid">
        {projectsData.map((item) => {
          return <WorkItems item={item} key={item.id} />;
        })}
      </div>
    </section>
  );
};

export default Work;
