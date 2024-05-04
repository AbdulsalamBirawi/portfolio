import React, { useState } from "react";
import "./qualification.css";

const Qualification = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <section className="qual section">
      <h2 className="section__title">Qualification</h2>
      <span className="section__subtitle">My personel journey</span>
      <div className="qual__container container">
        <div className="qual__tabs">
          <div
            className={
              toggleState === 1
                ? "qual__button qual__active button--flex"
                : "qual__button  button--flex"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qual__icon"></i>
            Education
          </div>
          <div
            className={
              toggleState === 2
                ? "qual__button qual__active button--flex"
                : "qual__button  button--flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qual__icon"></i>
            Experience
          </div>
        </div>
        <div className="qual__sections">
          <div
            className={
              toggleState === 1
                ? "qual__content qual__content-active"
                : "qual__content "
            }
          >
            <div className="qual__data">
              <div>
                <h3 className="qual__title">
                  Bachelor in Computer Engineering.
                </h3>
                <span className="qual__subtitle">Aleppo University</span>
                <div className="qual__calender">
                  <i className="uil uil-calendar-alt"></i>2017 - 2022
                </div>
              </div>
              <div>
                <span className="qual__rounder"></span>
                <span className="qual__line"></span>
              </div>
            </div>
            <div className="qual__data">
              <div></div>
              <div>
                <span className="qual__rounder"></span>
                <span className="qual__line"></span>
              </div>
              <div>
                <h3 className="qual__title">Frontend Course</h3>
                <span className="qual__subtitle">Udemy</span>
                <div className="qual__calender">
                  <i className="uil uil-calendar-alt"></i>2018 - 2019
                </div>
              </div>
            </div>

            <div className="qual__data">
              <div>
                <h3 className="qual__title">React Advanced Course</h3>
                <span className="qual__subtitle">coursera</span>
                <div className="qual__calender">
                  <i className="uil uil-calendar-alt"></i>2019 - 2020
                </div>
              </div>
              <div>
                <span className="qual__rounder"></span>
                <span className="qual__line"></span>
              </div>
            </div>
          </div>

          <div
            className={
              toggleState === 2
                ? "qual__content qual__content-active"
                : "qual__content "
            }
          >
            <div className="qual__data">
              <div>
                <h3 className="qual__title">Craft Code</h3>
                <span className="qual__subtitle">Syria</span>
                <div className="qual__calender">
                  <i className="uil uil-calendar-alt"></i>2020 - 2021
                </div>
              </div>
              <div>
                <span className="qual__rounder"></span>
                <span className="qual__line"></span>
              </div>
            </div>
            <div className="qual__data">
              <div></div>
              <div>
                <span className="qual__rounder"></span>
                <span className="qual__line"></span>
              </div>
              <div>
                <h3 className="qual__title">Uplink</h3>
                <span className="qual__subtitle">Remote Egypt</span>
                <div className="qual__calender">
                  <i className="uil uil-calendar-alt"></i>2021 - 2023
                </div>
              </div>
            </div>

            <div className="qual__data">
              <div>
                <h3 className="qual__title">Growth Hacker</h3>
                <span className="qual__subtitle">Montreal, Canada</span>
                <div className="qual__calender">
                  <i className="uil uil-calendar-alt"></i>2023 - present
                </div>
              </div>
              <div>
                <span className="qual__rounder"></span>
                <span className="qual__line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
