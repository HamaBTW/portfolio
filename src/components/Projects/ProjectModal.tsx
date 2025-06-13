import React, { useEffect, useState } from 'react';
import { Project, Skill } from '../../data/ProjectsManager';
import './Modal.css';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const renderSkillIcon = (skill: Skill) => {
    if (!skill.image) {
      return <span className="skill-icon-placeholder">{skill.name.charAt(0)}</span>;
    }

    switch (skill.imageType) {
      case 'fontawesome':
        return <i className={skill.image} aria-hidden="true"></i>;
      case 'link':
      case 'path':
        return <img src={skill.image} alt={skill.name} className="skill-icon-img" />;
      default:
        return <span className="skill-icon-placeholder">{skill.name.charAt(0)}</span>;
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;

    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }

    return null;
  };

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
        <div className="modal-popup__image-container">
          <img
            src={project.coverImage}
            alt={`${project.title} Project Image`}
            style={{
              transform: isVisible ? 'scale(1)' : 'scale(1.1)',
              transition: 'transform 0.4s ease-out',
              transitionDelay: isVisible ? '0.2s' : '0s',
            }}
          />

          {/* Project Links Overlay on Image */}
          <div
            className="modal-popup__links modal-popup__links--overlay"
            style={{
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.9)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transitionDelay: isVisible ? '0.4s' : '0s',
            }}
          >
            {/* Live URL */}
            {project.liveUrl && (
              <a
                className="modal-popup__details"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.liveUrlText || 'Live Demo'}
              </a>
            )}

            {/* Single GitHub URL */}
            {project.githubUrl && !project.repositories && (
              <a
                className="modal-popup__details"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.githubUrlText || 'View Code'}
              </a>
            )}

            {/* Multiple Repositories */}
            {project.repositories && project.repositories.map((repo, index) => (
              <a
                key={index}
                className="modal-popup__details"
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                title={repo.description}
              >
                {repo.name}
              </a>
            ))}

            {/* Fallback if no links */}
            {!project.liveUrl && !project.githubUrl && !project.repositories && (
              <span
                className="modal-popup__details"
                style={{ opacity: 0.5, cursor: 'not-allowed' }}
              >
                No links available
              </span>
            )}
          </div>
        </div>

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



          {project.videoUrl && getYouTubeEmbedUrl(project.videoUrl) && (
            <div className="modal-popup__video">
              <h6>Project Demo</h6>
              <div
                className="video-container"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                  transition: 'all 0.3s ease-out',
                  transitionDelay: isVisible ? '0.35s' : '0s',
                }}
              >
                <iframe
                  src={getYouTubeEmbedUrl(project.videoUrl) || ''}
                  title={`${project.title} Demo Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className="modal-popup__categories">
            <h6>Categories</h6>
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

          {project.skills && project.skills.length > 0 && (
            <div className="modal-popup__skills">
              <h6>Skills & Technologies</h6>
              <div className="skills-grid">
                {project.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-item"
                    style={{
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      opacity: isVisible ? 1 : 0,
                      transition: 'all 0.3s ease-out',
                      transitionDelay: isVisible ? `${0.5 + index * 0.1}s` : '0s',
                    }}
                  >
                    <div className="skill-icon">
                      {renderSkillIcon(skill)}
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
