import React, { useEffect, useState } from 'react';
import { Project } from '../../data/ProjectsManager';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Trigger opening animation
    const timer = setTimeout(() => setIsVisible(true), 10);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('basicLightbox')) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setIsVisible(false);

    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`basicLightbox ${isVisible ? 'basicLightbox--visible' : ''} ${isClosing ? 'basicLightbox--closing' : ''}`}
      onClick={handleClose}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        transform: isVisible ? 'scale(1)' : 'scale(0.9)',
      }}
    >
      <div
        className="modal-popup"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-50px) scale(0.95)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transitionDelay: isVisible ? '0.1s' : '0s',
        }}
      >
        <img
          src={project.coverImage}
          alt={`${project.title} Project Image`}
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(1.1)',
            transition: 'transform 0.4s ease-out',
            transitionDelay: isVisible ? '0.2s' : '0s',
          }}
        />

        <div
          className="modal-popup__desc"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.3s ease-out',
            transitionDelay: isVisible ? '0.3s' : '0s',
          }}
        >
          <h5>{project.title}</h5>
          <p>{project.longDescription}</p>
          <ul className="modal-popup__cat">
            {project.category.map((cat, index) => (
              <li
                key={index}
                style={{
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 0.3s ease-out',
                  transitionDelay: isVisible ? `${0.4 + index * 0.1}s` : '0s',
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <a
          className="modal-popup__details"
          href={project.liveUrl || project.githubUrl || '#0'}
          target={project.liveUrl || project.githubUrl ? '_blank' : '_self'}
          rel={project.liveUrl || project.githubUrl ? 'noopener noreferrer' : undefined}
          onClick={(e) => {
            if (!project.liveUrl && !project.githubUrl) {
              e.preventDefault();
            }
          }}
          style={{
            transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: isVisible ? '0.5s' : '0s',
          }}
        >
          Project link
        </a>
      </div>
    </div>
  );
};

export default ProjectModal;
