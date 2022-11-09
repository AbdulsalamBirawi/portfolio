import React from "react";
import "./skills.css";

const Backend = () => {
  return (
    <div className="skills__content">
      <h3 className="skills__title">Backend Devloper</h3>
      <div className="skills__box">
        <div className="skills__group">
          <div className="skills__data">
            <i class="bx bx-badge-check"></i>
            <div>
              <h3 className="skills__name">Firebase</h3>
              <span className="skills__level">Intermediate</span>
            </div>
          </div>
          <div className="skills__data">
            <i class="bx bx-badge-check"></i>
            <div>
              <h3 className="skills__name">Strapi</h3>
              <span className="skills__level">Advanced</span>
            </div>
          </div>
        </div>
        <div className="skills__group">
          <div className="skills__data">
            <i class="bx bx-badge-check"></i>
            <div>
              <h3 className="skills__name">sanity</h3>
              <span className="skills__level">basic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backend;
