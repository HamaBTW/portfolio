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
              {personalInfo.description}
            </p>
            <a
              href={`${process.env.PUBLIC_URL}/Mohamed Abidi Resume.pdf`}
              className="btn btn--medium u-fullwidth"
              data-animate-el
              download="Mohamed_Abidi_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      <div className="row about-expertise" data-animate-block>
        <div className="column lg-12">
          <h2 className="text-pretitle" data-animate-el>Expertise</h2>
          <ul className="skills-list h1" data-animate-el>
            {personalInfo.skills
              .slice(0, 6) // Limit to 6 skills for display
              .map((skill, index) => (
                <li key={index}>{skill.name}</li>
              ))}
          </ul>
        </div>
      </div>

      <div className="row about-timelines" data-animate-block>
        <div className="column lg-6 tab-12">
          <h2 className="text-pretitle" data-animate-el>
            Experience
          </h2>

          {personalInfo.experience.map((exp, index) => (
            <div key={index} className="timeline__block" data-animate-el>
              <div className="timeline__bullet"></div>
              <div className="timeline__header">
                <h4 className="timeline__title">{exp.company}</h4>
                <h5 className="timeline__meta">{exp.title}</h5>
                <p className="timeline__timeframe">{exp.startDate} - {exp.endDate}</p>
              </div>
              <div className="timeline__desc">
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="column lg-6 tab-12">
          <h2 className="text-pretitle" data-animate-el>
            Education
          </h2>

          {personalInfo.education.map((edu, index) => (
            <div key={index} className="timeline__block" data-animate-el>
              <div className="timeline__bullet"></div>
              <div className="timeline__header">
                <h4 className="timeline__title">{edu.institution}</h4>
                <h5 className="timeline__meta">{edu.degree}</h5>
                <p className="timeline__timeframe">{edu.startDate} - {edu.endDate}</p>
              </div>
              <div className="timeline__desc">
                <p>{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
