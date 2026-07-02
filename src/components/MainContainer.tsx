import { lazy, PropsWithChildren, Suspense, useEffect, useState, useRef } from "react";
import { useLoading } from "../context/LoadingProvider";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import Certificates from "./Certificates";
import setSplitText from "./utils/splitText";
import CaseStudies from "./CaseStudies";

import TechStack from "./TechStack";
// import Testimonials from "./Testimonials";
import HireMeCTA from "./HireMeCTA";
const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);
  const { isSoundEnabled, setIsSoundEnabled } = useLoading();
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    ambientAudioRef.current = new Audio("/images/samuelfjohanns-calm-ambient-7540.mp3");
    ambientAudioRef.current.loop = true;

    // Wait until loading finishes, then attempt autoplay or respect the global state.
    // If the user already enabled sound on the loading page, play immediately.
    // Otherwise, we still attempt autoplay just in case the browser allows it.
    if (isSoundEnabled) {
      ambientAudioRef.current.play().catch(console.error);
    } else {
      ambientAudioRef.current.play().then(() => {
        setIsSoundEnabled(true);
      }).catch(() => {
        console.log("Audio autoplay blocked by browser");
      });
    }

    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
      }
    };
  }, []); // Only run once on mount

  // Watch for changes to the global sound state from elsewhere
  useEffect(() => {
    if (isSoundEnabled) {
      ambientAudioRef.current?.play().catch(console.error);
    } else {
      ambientAudioRef.current?.pause();
    }
  }, [isSoundEnabled]);

  const toggleSound = () => {
    if (isSoundEnabled) {
      setIsSoundEnabled(false);
    } else {
      setIsSoundEnabled(true);
    }
  };

  return (
    <div className="container-main">
      <button
        onClick={toggleSound}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '12px',
          zIndex: 9999999999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease'
        }}
        title={isSoundEnabled ? "Mute Sound" : "Play Sound"}
      >
        {isSoundEnabled ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        )}
      </button>
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Certificates />
            <CaseStudies />
            <Work />
            {isDesktopView && (
              <TechStack />
            )}
            {/* <Testimonials /> */}
            <HireMeCTA />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
