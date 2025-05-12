import React from 'react';
import './web.css';
import AppLogo from '../assets/AppLogo.jpg';

import Google from "../assets/Google.png"
import Amazon from "../assets/Amazon.png"
import meta from "../assets/meta.png"
import tcs from "../assets/tcs.png"
import micro from "../assets/microsoft.png"
import airtel from "../assets/airtel.png"
const WebPortal = () => {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar" button="navbar">
        <div className="nav-links">
          <a href="/students/login">Login</a>          
          <a href="#home">Home</a>          

          <a href="#about">About</a>
          <a href="#contact">Contact</a>

        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="home">
        <h1>Welcome to <h1 id='header'>GTBIT TalentConnect</h1></h1>
        <img src = {AppLogo} alt="AppLogo"/>
        <p>Your one-stop solution for evolving trade in India. Join us to explore new opportunities.</p>
      </section>

      {/* Carousel Section (Instead of Form) */}
      <section className="carousel-section">
        <h2>Our Recruiters</h2>
        <div className="carousel">
          <div className="carousel-track">
            <img src={Google} alt="Google" />
            <img src={micro} alt="Microsoft" />
            <img src={Amazon} alt="Amazon" />
            <img src={meta} alt="Meta" />
            <img src={tcs} alt="TCS" />
            <img src={airtel}alt="airtel" />
            {/* Repeat to make infinite effect */}
            <img src={Google} alt="Google" />
            <img src={micro} alt="Microsoft" />
            <img src={Amazon} alt="Amazon" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>
          Welcome to Career Connect, where your job search journey meets opportunity. 
          Our mission is to connect talented students with top employers, making the job search process seamless and straightforward. 
          Whether you're looking to apply for jobs or post openings, we are here to support you every step of the way.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Facing any issue? Email us at:</p>
        <p className="email">support@gtbittalentconnect.com</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Career Connect. All Rights Reserved.
      </footer>
    </div>
  );
};

export default WebPortal;
