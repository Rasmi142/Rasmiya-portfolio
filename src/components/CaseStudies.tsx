import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./styles/CaseStudies.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const caseStudies = [
  {
    id: "01",
    title: "VACEI",
    subtitle: "Enterprise Audit & Accounting Collaboration Platform",
    challenge: "Traditional firms rely on disconnected spreadsheets and manual workflows, creating bottlenecks. The objective was to build a centralized platform for the entire service lifecycle.",
    solution: "Developed an enterprise-grade multi-portal SaaS platform connecting firms with clients, digitizing workflows with structured access control and compliance tracking.",
    features: ["Client Onboarding", "Audit Engagements", "Task Management", "AI-assisted Workflows"],
    techStack: ["React", "TypeScript", "Node.js", "Supabase"],
    impact: "Replaces disconnected tools with a centralized workspace, improving operational consistency."
  },
  {
    id: "02",
    title: "Sheetsway",
    subtitle: "Internal Operations & Business Workflow Platform",
    challenge: "Growing organizations struggle with manual tracking and scattered communication. The objective was to replace fragmented processes with a unified workspace.",
    solution: "Designed and developed a centralized business management platform streamlining internal operations and project coordination.",
    features: ["Project Tracking", "Workflow Automation", "Dashboard Analytics", "Document Management"],
    techStack: ["React", "Node.js", "PostgreSQL", "REST APIs"],
    impact: "Provides a single workspace enabling teams to manage workflows efficiently while improving transparency."
  },
  {
    id: "03",
    title: "FS AI Review",
    subtitle: "AI-Powered Financial Review Platform",
    challenge: "Manual financial review requires significant time. The goal was to leverage AI to accelerate document review while maintaining a user-friendly experience.",
    solution: "Built an AI-assisted financial review platform capable of processing uploaded content and generating intelligent recommendations.",
    features: ["AI-powered Analysis", "Secure Uploads", "Intelligent Review Generation"],
    techStack: ["React", "Node.js", "AI APIs", "Cloud Deployment"],
    impact: "Demonstrates how AI can augment professional workflows by reducing repetitive manual effort."
  },
  {
    id: "04",
    title: "Entrepreneurs of Madras",
    subtitle: "Community & Event Management Platform",
    challenge: "Needed to increase community engagement, simplify event discovery, and build a scalable online presence for a growing entrepreneurial community.",
    solution: "Created a digital platform to support the community by providing a central hub for networking, events, and member engagement.",
    features: ["Event Listings", "Community Information", "Member Registration", "Modern UI"],
    techStack: ["React", "Responsive Design", "REST APIs"],
    impact: "Delivered a modern digital experience helping entrepreneurs connect and access relevant information."
  },
  {
    id: "05",
    title: "Last Bite",
    subtitle: "Mobile Food Discovery Application",
    challenge: "Users needed a fast, intuitive way to browse restaurants, explore food options, and access information from a mobile device.",
    solution: "Developed a cross-platform mobile application with a streamlined interface designed for food discovery and user engagement.",
    features: ["User Authentication", "Restaurant Discovery", "Mobile Navigation"],
    techStack: ["React Native", "REST APIs", "Cloud Backend"],
    impact: "Provides an accessible mobile-first experience while demonstrating scalable application architecture."
  },
  {
    id: "06",
    title: "GQS Transport",
    subtitle: "Logistics & Transportation Digital Platform",
    challenge: "The client required a modern website that clearly communicated services, improved credibility, and generated business inquiries.",
    solution: "Designed and implemented a responsive corporate website focused on usability, performance, and lead generation.",
    features: ["Service Showcase", "Inquiry Forms", "SEO-friendly Structure"],
    techStack: ["React", "Modern Frontend Architecture", "Vercel Deployment"],
    impact: "Strengthens the company's digital presence and improves accessibility for prospective customers."
  }
];

const CaseStudies = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".case-card");
    
    cards.forEach((card, i) => {
      // For all cards except the last one, scale them down and fade them out 
      // as the NEXT card scrolls over them
      if (i < cards.length - 1) {
        gsap.to(card, {
          scale: 0.85,
          opacity: 0.3,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top center",
            scrub: true,
          }
        });
      }
    });
  }, { scope: containerRef });

  return (
    <div className="cases-section" id="case-studies" ref={containerRef}>
      <div className="section-container cases-header-container">
        <h2 className="cases-title">
          Case <span>Studies</span>
        </h2>
      </div>

      <div className="cases-cards-wrapper">
        {caseStudies.map((study, index) => (
          <div 
            key={study.id} 
            className="case-card"
            style={{ 
              top: `calc(10vh + ${index * 20}px)`, 
              zIndex: index 
            }}
          >
            <div className="case-card-inner">
              <div className="case-card-header">
                <div className="case-card-id">{study.id}</div>
                <div>
                  <h3>{study.title}</h3>
                  <h4>{study.subtitle}</h4>
                </div>
              </div>
              
              <div className="case-card-body">
                <div className="case-card-col">
                  <div className="case-text-block">
                    <h5>The Challenge</h5>
                    <p>{study.challenge}</p>
                  </div>
                  <div className="case-text-block">
                    <h5>The Solution</h5>
                    <p>{study.solution}</p>
                  </div>
                </div>

                <div className="case-card-col">
                  <div className="case-list-block">
                    <h5>Features & Stack</h5>
                    <div className="case-tags">
                      {study.features.map(f => <span key={f}>{f}</span>)}
                      {study.techStack.map(t => <span key={t} className="outline">{t}</span>)}
                    </div>
                  </div>
                  
                  <div className="case-impact">
                    <h5>Business Impact</h5>
                    <p>{study.impact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
