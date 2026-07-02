import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { FiAward, FiX } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./styles/Certificates.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const certificates = [
  {
    id: 1,
    title: "Training Completion",
    file: "/certificates/Training completion.pdf",
    date: "2023"
  },
  {
    id: 2,
    title: "Course Completion",
    file: "/certificates/course-completion.pdf",
    date: "2023"
  },
  {
    id: 3,
    title: "Deloitte Internship",
    file: "/certificates/deloitte-internship completion.pdf",
    date: "2023"
  },
  {
    id: 4,
    title: "Internship Completion",
    file: "/certificates/internship completion.pdf",
    date: "2023"
  }
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".certificates-container h2", 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(".certificate-card", 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".certificates-grid",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div className="certificates-section section-container" ref={containerRef}>
      <div className="certificates-container">
        <h2>
          My <span>Certificates</span>
        </h2>
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div 
              key={cert.id} 
              className="certificate-card"
              onClick={() => setSelectedCert(cert.file)}
            >
              <div className="certificate-icon">
                <FiAward />
              </div>
              <div className="certificate-info">
                <h3>{cert.title}</h3>
                <p>View Certificate</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCert && createPortal(
        <div className="certificate-modal" onClick={() => setSelectedCert(null)}>
          <div className="certificate-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="certificate-modal-header">
              <h3>Certificate</h3>
              <button className="close-modal" onClick={() => setSelectedCert(null)}>
                <FiX />
              </button>
            </div>
            <div className="certificate-modal-body">
              <iframe 
                src={`${selectedCert}#view=FitH`} 
                title="Certificate"
                className="certificate-iframe"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Certificates;
