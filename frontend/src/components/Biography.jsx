import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Know Us</p>
          <h3>Who We Are</h3>
          <p>
          Modern technology and web apps revolutionize healthcare by enhancing accessibility and improving patient care. They enable remote consultations, real-time health monitoring, and personalized treatment plans. Through these innovations, patients can manage their health more effectively, and medical professionals can deliver more accurate diagnoses and efficient treatments.
          </p>
          <p>We are all in 2024!</p>
          <p>We are working on a MERN STACK PROJECT.</p>
          <p>
          Technology in the medical field, through web applications, is transforming patient care. These platforms facilitate efficient data management, telemedicine services, and personalized healthcare. They bridge the gap between patients and providers, ensuring timely intervention and continuous care, ultimately leading to better health outcomes and enhanced patient experiences.
          </p>
          <p>In the way of changing life.</p>
          <p>Coding is fun!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;