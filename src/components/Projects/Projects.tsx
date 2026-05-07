import React, { useState, useEffect } from 'react';
import { projectsManager, Project } from '../../data/ProjectsManager';
import ProjectModal from './ProjectModal';
import Testimonials from '../Testimonials/Testimonials';

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [totalProjects, setTotalProjects] = useState<number>(0);

  useEffect(() => {
    const allProjects = projectsManager.getAllProjects();
    setDisplayedProjects(allProjects);
    setTotalProjects(allProjects.length);
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // const loadMoreProjects = () => {
  //   setCurrentPage(prevPage => prevPage + 1);
  // };

  // const showLessProjects = () => {
  //   setCurrentPage(1);
  // };

  return (
    <section id="works" className="s-works target-section">
      <div className="row works-portfolio">
        <div className="column lg-12" data-animate-block>
          <h2 className="text-pretitle" data-animate-el>
            Recent Works
          </h2>
          <p className="h1" data-animate-el>
            Here are some of my favorite projects I have done lately. Feel free to check them out.
          </p>

          <ul className="folio-list row block-lg-one-half block-stack-on-1000">
            {displayedProjects.map((project, index) => (
              <li key={project.id} className="folio-list__item column" data-animate-el>
                <a
                  className="folio-list__item-link"
                  href={`#modal-${index + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(project);
                  }}
                >
                  <div className="folio-list__item-pic">
                    <img
                      src={project.image}
                      srcSet={`${project.image} 1x, ${project.image} 2x`}
                      alt={project.title}
                    />
                  </div>

                  <div className="folio-list__item-text">
                    <div className="folio-list__item-cat">
                      {project.category.join(', ')}
                    </div>
                    <div className="folio-list__item-title">
                      {project.title}
                    </div>
                  </div>
                </a>
                <a
                  className="folio-list__proj-link"
                  href={`#modal-${index + 1}`}
                  title="project link"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(project);
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                </a>
              </li>
            ))}

            {/* Show More Button as 6th Grid Item - Commented out to show all projects */}
            {/* {hasMore && (
              <li className="folio-list__item column folio-list__item--more" data-animate-el>
                <button
                  className="folio-list__more-btn"
                  onClick={loadMoreProjects}
                >
                  <div className="folio-list__more-content">
                    <div className="folio-list__more-icon">+</div>
                    <div className="folio-list__more-title">More Projects</div>
                    <div className="folio-list__more-count">{totalProjects - displayedProjects.length} remaining</div>
                  </div>
                </button>
              </li>
            )} */}
          </ul>

          {/* Projects counter */}
          <div className="row" data-animate-el>
            <div className="column">
              <div className="projects-counter">
                Showing {displayedProjects.length} of {totalProjects} projects
              </div>
            </div>
          </div>
        </div>
      </div>

      <Testimonials />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default Projects;
