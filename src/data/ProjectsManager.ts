interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  coverImage: string;
  category: string[];
  technologies: string[];
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
        category: ['Recruitment and Employment', 'Web Development'],
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        featured: true
      },
      {
        id: 'clothify',
        title: 'Clothify',
        description: 'Modern e-commerce platform for fashion and clothing with advanced filtering and user experience.',
        longDescription: 'Clothify is a modern e-commerce platform designed specifically for fashion and clothing retailers. It features advanced product filtering, wishlist functionality, secure payment processing, and an intuitive admin dashboard for inventory management.',
        image: '/images/portfolio/clothify.png',
        coverImage: '/images/portfolio/clothify_cover.png',
        category: ['E-commerce', 'Fashion'],
        technologies: ['React', 'TypeScript', 'Stripe', 'Firebase'],
        featured: true
      },
      {
        id: 'spotipy',
        title: 'Spotipy',
        description: 'Music streaming application with playlist management and social features.',
        longDescription: 'Spotipy is a music streaming application that allows users to discover new music, create playlists, and share their favorite tracks with friends. Built with modern web technologies and integrated with music APIs.',
        image: '/images/portfolio/spotipy.png',
        coverImage: '/images/portfolio/spotipy_cover.png',
        category: ['Music', 'Entertainment'],
        technologies: ['React', 'Spotify API', 'Node.js', 'PostgreSQL'],
        featured: true
      },
      {
        id: 'tww',
        title: 'The Wellness Way',
        description: 'Health and wellness platform promoting holistic lifestyle approaches.',
        longDescription: 'The Wellness Way is a comprehensive health and wellness platform that promotes holistic lifestyle approaches. It includes features for tracking wellness goals, accessing educational content, and connecting with wellness professionals.',
        image: '/images/portfolio/tww_logo.png',
        coverImage: '/images/portfolio/tww_cover.png',
        category: ['Health', 'Wellness'],
        technologies: ['React', 'Redux', 'Express', 'MongoDB'],
        featured: true
      },
      {
        id: 'tache-lik',
        title: 'Tache-Lik',
        description: 'Educational platform dedicated to guiding and mentoring students.',
        longDescription: 'Tache-Lik is an innovative educational platform that I founded to guide and mentor students in their academic journey. The platform provides personalized learning paths, mentorship programs, and educational resources to help students achieve their goals.',
        image: '/images/portfolio/tache-lik.png',
        coverImage: '/images/portfolio/tache-lik.png',
        category: ['Education', 'Mentorship'],
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        liveUrl: 'https://www.tache-lik.tn',
        featured: true
      },
      {
        id: 'explore',
        title: 'Explore',
        description: 'Travel and exploration platform for discovering new destinations.',
        longDescription: 'Explore is a travel and exploration platform designed to help users discover new destinations, plan trips, and share travel experiences. It features interactive maps, travel guides, and community-driven content.',
        image: '/images/portfolio/explore.png',
        coverImage: '/images/portfolio/more_cover.png',
        category: ['Travel', 'Exploration'],
        technologies: ['React', 'Maps API', 'Firebase', 'PWA'],
        featured: false
      },
      {
        id: 'portfolio-website',
        title: 'Portfolio Website',
        description: 'Personal portfolio website showcasing my projects and skills.',
        longDescription: 'A modern, responsive portfolio website built with React and TypeScript. Features smooth animations, project showcases, and an elegant design that reflects my development skills and aesthetic sense.',
        image: '/images/portfolio/portfolio.png',
        coverImage: '/images/portfolio/portfolio_cover.png',
        category: ['Web Development', 'Portfolio'],
        technologies: ['React', 'TypeScript', 'CSS3', 'Framer Motion'],
        featured: false
      },
      {
        id: 'task-manager',
        title: 'Task Manager Pro',
        description: 'Advanced task management application with team collaboration features.',
        longDescription: 'Task Manager Pro is a comprehensive project management tool designed for teams and individuals. It features real-time collaboration, advanced filtering, deadline tracking, and productivity analytics.',
        image: '/images/portfolio/taskmanager.png',
        coverImage: '/images/portfolio/taskmanager_cover.png',
        category: ['Productivity', 'Team Collaboration'],
        technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        featured: false
      },
      {
        id: 'weather-app',
        title: 'Weather Dashboard',
        description: 'Real-time weather application with detailed forecasts and location tracking.',
        longDescription: 'A comprehensive weather dashboard that provides real-time weather data, 7-day forecasts, weather maps, and location-based alerts. Built with modern APIs and responsive design.',
        image: '/images/portfolio/weather.png',
        coverImage: '/images/portfolio/weather_cover.png',
        category: ['Weather', 'API Integration'],
        technologies: ['React', 'Weather API', 'Geolocation', 'Charts.js'],
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

// Export the Project interface as a type
export type { Project };
