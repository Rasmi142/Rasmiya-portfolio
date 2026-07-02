import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Developer Intern</h4>
                <h5>Primesite Innovation</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Completed a three-month internship focused on frontend web development, contributing to responsive user interfaces and learning modern development workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack MERN Developer (Freelance)</h4>
                <h5>Nous Infotech</h5>
              </div>
              <h3>2024 - 2025</h3>
            </div>
            <p>
              Worked as a freelance Full Stack MERN Developer in a collaborative development team, delivering modern web applications and digital solutions for multiple clients across different industries.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack MERN Developer</h4>
                <h5>A4 Services</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Working as a full-time Full Stack MERN Developer, building enterprise-grade web applications for the audit, accounting, and financial services industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
