import React from 'react';
import { personalInfo } from '../../data/personal';

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  return (
    <section id="intro" className="s-intro target-section">
      <div className="row intro-content wide" data-animate-block>
        <div className="column">
          <div className="text-pretitle with-line" data-animate-el>
            Hello, I'm {personalInfo.name}
          </div>

          <h1 className="text-huge-title" data-animate-el>
            {personalInfo.title.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < personalInfo.title.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
            <br />
            {personalInfo.subtitle.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < personalInfo.subtitle.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1>
        </div>

        <ul className="intro-social">
          {personalInfo.socialLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a href="#about" className="intro-scrolldown smoothscroll" data-animate-el>
        <span className="scroll-text">Scroll Down</span>
        <span className="scroll-icon"></span>
      </a>
    </section>
  );
};

export default Hero;
