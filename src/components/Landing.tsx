import { PropsWithChildren, useEffect, useRef } from "react";
import "./styles/Landing.css";
import { useLoading } from "../context/LoadingProvider";

const Landing = ({ children }: PropsWithChildren) => {
  const { isLoading } = useLoading();
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!isLoading && !hasPlayed.current) {
      const welcomeAudio = new Audio("/images/sandritschka123-female-voice-welcome-498462.mp3");
      welcomeAudio.loop = false;
      welcomeAudio.play().catch((err) => console.log("Welcome audio blocked by browser:", err));
      hasPlayed.current = true;
    }
  }, [isLoading]);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              RASMIYA
              <br />
              <span>AYOUB</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>A Passionate</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Full Stack </div>
              <div className="landing-h2-2">Developer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Developer</div>
              <div className="landing-h2-info-1">Full Stack </div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
