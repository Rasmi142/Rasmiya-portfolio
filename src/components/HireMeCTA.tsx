import Marquee from "react-fast-marquee";
import "./styles/HireMeCTA.css";

const HireMeCTA = () => {
  return (
    <div className="cta-section">
      <div className="marquee-wrapper">
        <Marquee speed={80} autoFill={true} gradient={false} className="cta-marquee">
          <span>MERN STACK DEVELOPER</span>
          <span className="marquee-dot">•</span>
          <span>AVAILABLE FOR CONTRACT</span>
          <span className="marquee-dot">•</span>
          <span>FULL STACK ENGINEER</span>
          <span className="marquee-dot">•</span>
        </Marquee>
        <Marquee speed={60} autoFill={true} gradient={false} direction="right" className="cta-marquee outline-marquee">
          <span>CREATIVE DEVELOPER</span>
          <span className="marquee-dot">•</span>
          <span>WEB3 ENTHUSIAST</span>
          <span className="marquee-dot">•</span>
          <span>UI/UX IMPLEMENTATION</span>
          <span className="marquee-dot">•</span>
        </Marquee>
      </div>

      <div className="cta-content">
        <h2>Ready to build something amazing?</h2>
        <p>Let's turn your vision into a scalable, high-performance web application.</p>
        
        <a href="#contact" className="cta-button-container">
          <div className="cta-button">
            <span className="cta-button-text">HIRE ME</span>
            <div className="cta-button-hover"></div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default HireMeCTA;
