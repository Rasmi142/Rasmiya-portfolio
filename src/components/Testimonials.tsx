import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./styles/Testimonials.css";

const testimonials = [
  {
    quote: "Exceptional MERN stack skills. Delivered our complex platform flawlessly.",
    author: "Jane Doe, CTO",
    speed: 1.1,
    align: "left",
  },
  {
    quote: "A true professional. Clean code, incredible animations, and great communication.",
    author: "John Smith, Founder",
    speed: 0.9,
    align: "right",
  },
  {
    quote: "Transformed our vision into a stunning web experience. Highly recommended!",
    author: "Alice Johnson, Design Lead",
    speed: 1.2,
    align: "center",
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".testimonial-item");
      
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0.1, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <div className="testimonials-section" ref={sectionRef}>
      <h2 className="testimonials-title">What Clients Say</h2>
      
      <div className="testimonials-container">
        {testimonials.map((test, index) => (
          <div
            key={index}
            className={`testimonial-item align-${test.align}`}
            data-speed={test.speed}
          >
            <span className="quote-mark">"</span>
            <h3>{test.quote}</h3>
            <p className="author">— {test.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
