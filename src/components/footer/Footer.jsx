import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <h1 className="footer__title">Birawi</h1>
        <ul className="footer__list">
          <li>
            <a href="#about" className="footer__link">
              About
            </a>
          </li>
          <li>
            <a href="#portfolio" className="footer__link">
              Projects
            </a>
          </li>
        </ul>
        <div className="footer__social">
          <a
            className="footer__social-link"
            href="http://www.linkedin.com/in/abdalsalam-albirawi"
          >
            <i class="bx bxl-linkedin"></i>
          </a>
          <a
            className="footer__social-link"
            href="https://www.facebook.com/abdsalam.birawi.3"
          >
            <i class="bx bxl-facebook"></i>
          </a>
          <a
            className="footer__social-link"
            href="https://instagram.com/abdsalam_birawi?r=nametag"
          >
            <i class="bx bxl-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
