import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Medicine is a crucial field focused on healing and wellness. It involves diagnosing, treating, and preventing diseases, with professionals ranging from physicians to researchers. The sector advances through innovative research, developing new treatments and technologies to enhance patient care. Medicines goal is to improve health outcomes, ensuring individuals lead healthier, longer lives.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;