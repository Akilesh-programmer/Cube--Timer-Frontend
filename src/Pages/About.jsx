import { NavLink } from "react-router-dom";
import "./../Styles/about.css";

const About = () => {
  return (
    <div className="about">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Cube Timer</h1>
          <p className="sub-heading">Your Ultimate Speedcubing Companion</p>
          <NavLink to="/" className="cta-button">
            Use Our Product
          </NavLink>
        </div>
        <div className="hero-image">
          <img src="/Cube.jpg" alt="Rubik's Cube" />
        </div>
      </div>

      <div className="intro-section">
        <h2>About Our Product</h2>
        <p>
          Cube Timer is a modern web-based timer designed specifically for
          speedcubing enthusiasts. Whether you're a beginner learning your first
          algorithms or an experienced solver competing for world records, our
          platform provides everything you need to track and improve your
          solving times.
        </p>
        <p>
          With a clean interface and powerful features, you can focus on what
          matters most - solving cubes and beating your personal bests. Track
          your progress with detailed statistics, analyze your performance with
          comprehensive averages, and stay motivated with intuitive scramble
          generation.
        </p>
        <p>
          Start timing your solves today and join the community of cubers
          dedicated to improving their skills one solve at a time.
        </p>
      </div>
    </div>
  );
};

export default About;
