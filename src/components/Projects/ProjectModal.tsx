import React, { useEffect } from 'react';
import { Project } from '../../data/ProjectsManager';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-popup">
        <img src={project.coverImage} alt={`${project.title} Project Image`} />

        <div className="modal-popup__desc">
          <h5>{project.title}</h5>
          <p>{project.longDescription}</p>
          <ul className="modal-popup__cat">
            {project.category.map((cat, index) => (
              <li key={index}>{cat}</li>
            ))}
          </ul>
        </div>

        <a
          className="modal-popup__details"
          href="#0"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <i className="icon-close"></i>
        </a>
      </div>
    </div>
  );
};

export default ProjectModal;
