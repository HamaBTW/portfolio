import React from 'react';
import { personalInfo } from '../../data/personal';

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <section id="about" className="s-about target-section">
      <div className="row about-info wide" data-animate-block>
        <div className="column lg-6 md-12 about-info__pic-block">
          <img
            src={personalInfo.aboutImage}
            srcSet={`${personalInfo.aboutImage} 1x, ${personalInfo.aboutImage} 2x`}
            alt=""
            className="about-info__pic"
            data-animate-el
          />
        </div>

        <div className="column lg-6 md-12">
          <div className="about-info__text">
            <h2 className="text-pretitle with-line" data-animate-el>
              About
            </h2>
            <p className="attention-getter" data-animate-el>
              I am Mohamed Abidi, a passionate mentor and founder of Tache-Lik. Currently, I am an engineering student with a strong interest in computer science, web development, and Arduino programming. I enjoy solving complex problems and helping others learn through my educational platform. I am committed to continuous growth and innovation in the tech field.
            </p>
            <a href="#0" className="btn btn--medium u-fullwidth" data-animate-el>Download CV</a>
          </div>
        </div>
      </div>

      <div className="row about-expertise" data-animate-block>
        <div className="column lg-12">
          <h2 className="text-pretitle" data-animate-el>Expertise</h2>
          <ul className="skills-list h1" data-animate-el>
            <li>Python</li>
            <li>Node.js</li>
            <li>React.js</li>
            <li>C++</li>
            <li>Arduino Programming</li>
            <li>Web Development</li>
          </ul>
        </div>
      </div>

      <div className="row about-timelines" data-animate-block>
        <div className="column lg-6 tab-12">
          <h2 className="text-pretitle" data-animate-el>
            Experience
          </h2>

          <div className="timeline__block" data-animate-el>
            <div className="timeline__bullet"></div>
            <div className="timeline__header">
              <h4 className="timeline__title">Tache-Lik</h4>
              <h5 className="timeline__meta">Founder</h5>
              <p className="timeline__timeframe">Sep 2024 - Present</p>
            </div>
            <div className="timeline__desc">
              <p>Founded Tache-Lik, an innovative educational platform empowering ESPRIT students by providing expert guidance, resources, and mentoring. Spearheading the development of tailored content and fostering student success in software development, web, and game development.</p>
            </div>
          </div>
        </div>

        <div className="column lg-6 tab-12">
          <h2 className="text-pretitle" data-animate-el>
            Education
          </h2>

          <div className="timeline__block" data-animate-el>
            <div className="timeline__bullet"></div>
            <div className="timeline__header">
              <h4 className="timeline__title">ESPRIT</h4>
              <h5 className="timeline__meta">Engineering Student</h5>
              <p className="timeline__timeframe">2021 - 2024</p>
            </div>
            <div className="timeline__desc">
              <p>Pursuing an engineering degree with a focus on computer science and software development. Actively engaged in various projects and learning opportunities that enhance my technical skills and knowledge in the field.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
