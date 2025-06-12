interface Skill {
  name: string;
  imageType?: 'link' | 'path' | 'fontawesome';
  image?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  coverImage: string;
  videoUrl?: string;
  category: string[];
  technologies: string[];
  skills: Skill[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export class ProjectsManager {
  private static instance: ProjectsManager;
  private projects: Project[] = [];

  private constructor() {
    this.initializeProjects();
  }

  public static getInstance(): ProjectsManager {
    if (!ProjectsManager.instance) {
      ProjectsManager.instance = new ProjectsManager();
    }
    return ProjectsManager.instance;
  }

  private initializeProjects(): void {
    this.projects = [
      {
        id: 'hireup',
        title: 'HireUp',
        description: 'A recruitment and employment website built with a focus on user experience and efficient workflows.',
        longDescription: 'HireUp is a recruitment and employment website built with a focus on user experience and efficient workflows. The platform facilitates both job seekers and recruiters to connect seamlessly. Features include advanced search functionality, user profiles, and job posting capabilities.',
        image: '/images/portfolio/hu.png',
        coverImage: '/images/portfolio/hireup_cover.png',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: ['Recruitment and Employment', 'Web Development'],
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        skills: [
          { name: 'React', imageType: 'fontawesome', image: 'fab fa-react' },
          { name: 'Node.js', imageType: 'fontawesome', image: 'fab fa-node-js' },
          { name: 'MongoDB', imageType: 'path', image: '/images/skills/mongodb.png' },
          { name: 'Express.js', imageType: 'path', image: '/images/skills/express.png' },
          { name: 'JavaScript', imageType: 'fontawesome', image: 'fab fa-js-square' },
          { name: 'HTML5', imageType: 'fontawesome', image: 'fab fa-html5' },
          { name: 'CSS3', imageType: 'fontawesome', image: 'fab fa-css3-alt' }
        ],
        githubUrl: 'https://github.com/HamaBTW/web-project-hireup-hama-git/tree/hama',
        featured: true
      },
      {
        id: 'tww',
        title: 'The World Within',
        description: 'An engaging game developed using SDL and C language.',
        longDescription: 'The World Within is an engaging game developed using SDL and C language. The game features an immersive storyline where players explore different worlds filled with puzzles and challenges. This project showcases expertise in game mechanics, design, and optimization using the SDL framework and C language.',
        image: '/images/portfolio/tww_logo.png',
        coverImage: '/images/portfolio/tww_cover.png',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: ['Game Development', 'SDL', 'C Language'],
        technologies: ['SDL', 'C Language', 'Game Development'],
        skills: [
          { name: 'C Language', imageType: 'path', image: '/images/skills/c.png' },
          { name: 'SDL', imageType: 'path', image: '/images/skills/sdl.png' },
          { name: 'Game Development', imageType: 'fontawesome', image: 'fas fa-gamepad' },
          { name: 'Graphics Programming', imageType: 'fontawesome', image: 'fas fa-paint-brush' }
        ],
        liveUrl: 'https://kanm.netlify.app',
        featured: true
      },
      {
        id: 'spotipy',
        title: 'Spotipy',
        description: 'A powerful music tool that allows you to discover, download, and enjoy your favorite songs from Spotify.',
        longDescription: 'Spotipy is a powerful music tool that allows you to discover, download, and enjoy your favorite songs from Spotify. With an intuitive interface, Spotipy simplifies music collection management, letting users access their Spotify library offline.',
        image: '/images/portfolio/spotipy.png',
        coverImage: '/images/portfolio/spotipy_cover.png',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: ['Desktop Application Development'],
        technologies: ['Desktop Application', 'Spotify API', 'Music Streaming'],
        skills: [
          { name: 'Python', imageType: 'fontawesome', image: 'fab fa-python' },
          { name: 'Spotify API', imageType: 'fontawesome', image: 'fab fa-spotify' },
          { name: 'Desktop Development', imageType: 'fontawesome', image: 'fas fa-desktop' },
          { name: 'API Integration', imageType: 'fontawesome', image: 'fas fa-plug' }
        ],
        liveUrl: 'https://spotipy-app.netlify.app',
        featured: true
      },
      {
        id: 'clothify',
        title: 'Clothify',
        description: 'Simplifies the recycling process by connecting users with local recycling partners.',
        longDescription: 'Clothify simplifies the recycling process by connecting users with local recycling partners and providing valuable tips on extending the life of clothing. This desktop application promotes a sustainable future by fostering a community committed to reducing textile waste.',
        image: '/images/portfolio/clothify.png',
        coverImage: '/images/portfolio/clothify_cover.png',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: ['Desktop Application Development'],
        technologies: ['Desktop Application', 'Sustainability', 'Recycling'],
        skills: [
          { name: 'Java', imageType: 'fontawesome', image: 'fab fa-java' },
          { name: 'Desktop Development', imageType: 'fontawesome', image: 'fas fa-desktop' },
          { name: 'UI/UX Design', imageType: 'fontawesome', image: 'fas fa-palette' },
          { name: 'Sustainability', imageType: 'fontawesome', image: 'fas fa-leaf' }
        ],
        liveUrl: 'https://clothify-app.netlify.app',
        featured: true
      },
      {
        id: 'tache-lik',
        title: 'Tache-Lik',
        description: 'Educational platform dedicated to guiding and mentoring students.',
        longDescription: 'Tache-Lik is an innovative educational platform that I founded to guide and mentor students in their academic journey. The platform provides personalized learning paths, mentorship programs, and educational resources to help students achieve their goals.',
        image: '/images/portfolio/tache-lik.png',
        coverImage: '/images/portfolio/tache-lik.png',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: ['Education', 'Mentorship'],
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        skills: [
          { name: 'React', imageType: 'fontawesome', image: 'fab fa-react' },
          { name: 'Node.js', imageType: 'fontawesome', image: 'fab fa-node-js' },
          { name: 'MongoDB', imageType: 'path', image: '/images/skills/mongodb.png' },
          { name: 'Socket.io', imageType: 'path', image: '/images/skills/socketio.png' },
          { name: 'JavaScript', imageType: 'fontawesome', image: 'fab fa-js-square' },
          { name: 'Education Technology', imageType: 'fontawesome', image: 'fas fa-graduation-cap' }
        ],
        liveUrl: 'https://www.tache-lik.tn',
        featured: true
      },
      {
        id: 'explore',
        title: 'Explore My Work',
        description: 'Take a deeper dive into a collection of my latest and most innovative projects.',
        longDescription: 'Take a deeper dive into a collection of my latest and most innovative projects. Explore the full range of my work to see how I am pushing the boundaries of technology and creativity. Every project is crafted with a commitment to excellence and a passion for solving real-world challenges.',
        image: '/images/portfolio/explore.png',
        coverImage: '/images/portfolio/more_cover.png',
        category: ['GitHub Portfolio'],
        technologies: ['Various Technologies', 'Open Source', 'Innovation'],
        skills: [
          { name: 'GitHub', imageType: 'fontawesome', image: 'fab fa-github' },
          { name: 'Open Source', imageType: 'fontawesome', image: 'fas fa-code-branch' },
          { name: 'Innovation', imageType: 'fontawesome', image: 'fas fa-lightbulb' }
        ],
        githubUrl: 'https://github.com/HamaBTW',
        featured: false
      }
    ];
  }

  // Get all projects
  public getAllProjects(): Project[] {
    return [...this.projects];
  }

  // Get projects with pagination
  public getProjectsPaginated(page: number = 1, limit: number = 6): {
    projects: Project[];
    hasMore: boolean;
    total: number;
  } {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = this.projects.slice(0, endIndex);

    return {
      projects: paginatedProjects,
      hasMore: endIndex < this.projects.length,
      total: this.projects.length
    };
  }

  // Get featured projects
  public getFeaturedProjects(): Project[] {
    return this.projects.filter(project => project.featured);
  }

  // Get project by ID
  public getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  // Get projects by category
  public getProjectsByCategory(category: string): Project[] {
    return this.projects.filter(project =>
      project.category.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
    );
  }

  // Search projects
  public searchProjects(query: string): Project[] {
    const lowercaseQuery = query.toLowerCase();
    return this.projects.filter(project =>
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.category.some(cat => cat.toLowerCase().includes(lowercaseQuery)) ||
      project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Get total projects count
  public getTotalCount(): number {
    return this.projects.length;
  }

  // Get featured projects count
  public getFeaturedCount(): number {
    return this.projects.filter(project => project.featured).length;
  }
}

// Export singleton instance
export const projectsManager = ProjectsManager.getInstance();

// Export the interfaces as types
export type { Project, Skill };
