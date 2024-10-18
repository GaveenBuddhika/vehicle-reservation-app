import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="welcome-container">
  <div className="welcome-box">
    Welcome to Infosec Vehicle Reservation System
  </div>
</div>
</div>
  );
};

export default Home;
