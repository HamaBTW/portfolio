import React from 'react';
import { personalInfo } from '../../data/personal';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="s-footer">
      <div className="row">
        <div className="column ss-copyright">
          <span>© Copyright Mohamed Abidi 2025</span>
          <span>Portfolio designed and developed by <a href="https://www.linkedin.com/in/med-abidi/">Mohamed Abidi</a>. Check out my work on <a href="https://github.com/HamaBTW">GitHub</a>.</span>
        </div>

        <div className="ss-go-top">
          <a
            className="smoothscroll"
            title="Back to Top"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
              <path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
