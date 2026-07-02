import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Project = {
  name: string;
  category: string;
  tools: string;
  link?: string;
  links?: { name: string, url: string }[];
  image: string;
};

const projects: Project[] = [
  { name: "Vaazhga Valamudan", category: "Website | Development", tools: "Web Development", link: "https://vaazhgavalamudan.com/", image: "/project-images/vvm.png" },
  { name: "GQS Transport", category: "Website | Development", tools: "Web Development", link: "https://www.gqstransport.com/en", image: "/project-images/gqs.png" },
  { name: "VACEI", category: "Platform | Web Development", tools: "Javascript, React", link: "https://vacei.com/", image: "/project-images/vacei.png" },
  { name: "A4 Services", category: "Platform | Web Development", tools: "Javascript, React", link: "https://a4-website-kappa.vercel.app/en", image: "/project-images/a4-services.png" },
  { name: "Sheetsway", category: "Platform | Web Development", tools: "Javascript, React", link: "https://www.sheetsway.com/", image: "/project-images/sheetway.jpeg" },
  { name: "FS AI Review", category: "Platform | Web Development", tools: "Web Development", link: "https://fs-ai-review.vercel.app/", image: "/project-images/fs-ai-review.jpeg" },
  { name: "EOM", category: "Website | Development", tools: "Web Development", link: "https://www.entrepreneursofmadras.com/", image: "/project-images/eom.png" },
  { name: "SunnySide Up", category: "Website | Development", tools: "Web Development", link: "https://sunnysidecafe.vercel.app/", image: "/project-images/sunny-side.png" },
  { name: "Zarak Media", category: "Website | Development", tools: "Web Development", link: "https://codeerr-sid.github.io/Zarak_Media/", image: "/project-images/zarak.png" },
  { name: "Braai Shack", category: "Website | Development", tools: "Web Development", link: "https://braaishack.vercel.app/", image: "/project-images/braai.png" },
  { name: "Prepco Healthcare", category: "Website | Development", tools: "Web Development", link: "https://prepcohealthcare.com/", image: "/project-images/prepco.png" },
  { name: "Last Bite", category: "App | Development", tools: "Mobile App Development", links: [{ name: "Android App", url: "https://play.google.com/store/apps/details?id=com.nous.lastbite" }, { name: "iOS App", url: "https://apps.apple.com/us/app/lastbite-rescue-surplus-food/id6768276826" }], image: "/project-images/lastbite-app.png" },
  { name: "TickTick", category: "App | Development", tools: "Web Development", link: "https://ticktick.vercel.app/login", image: "/project-images/ticktick.png" },
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{(index + 1).toString().padStart(2, '0')}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="work-link-button"
                      style={{
                        display: "inline-block",
                        marginTop: "20px",
                        padding: "10px 20px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "30px",
                        color: "white",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        fontSize: "12px",
                        letterSpacing: "1px"
                      }}
                    >
                      View Project
                    </a>
                  )}
                  {project.links && project.links.map((l, i) => (
                    <a 
                      key={i}
                      href={l.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="work-link-button"
                      style={{
                        display: "inline-block",
                        marginTop: "20px",
                        padding: "10px 20px",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "30px",
                        color: "white",
                        textDecoration: "none",
                        textTransform: "uppercase",
                        fontSize: "12px",
                        letterSpacing: "1px"
                      }}
                    >
                      {l.name}
                    </a>
                  ))}
                </div>
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
