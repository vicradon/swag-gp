import React from "react";
import "../../css/about.css";

const About = () => {
  return (
    <div className="about">
      <h1>About SwagGP</h1>
      <p className="about-paragraph">
        SwagGP is a solution to personalize storage of grades.
      </p>
      <p className="about-paragraph">
        With SwagGP, all your grades can be stored forever and you can make
        references anytime
      </p>
      <p className="about-paragraph">The best part is that it works offline!</p>

      <div href="/pages/contact" className="about-contact">
        <p>Wanna chat, talk or give me a job? </p>
        <button className="about-contact-button">
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="mailto:vicraph7@gmail.com"
          >
            Email Me
          </a>
        </button>
      </div>
    </div>
  );
};
export default About;