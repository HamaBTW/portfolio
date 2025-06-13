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
      // Tache-Lik
      {
        id: 'tache-lik',
        title: 'Tache-Lik',
        description: 'Educational platform dedicated to guiding and mentoring students.',
        longDescription: 'Tache-Lik is an innovative educational platform that I founded to guide and mentor students in their academic journey. The platform provides personalized learning paths, mentorship programs, and educational resources with real-time features, AI integration, and comprehensive video learning capabilities.',
        image: '/images/portfolio/tache-lik.png',
        coverImage: '/images/portfolio/tache-lik-cover.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: ['Education Technology', 'Full-Stack Development', 'Real-time Applications'],
        technologies: ['React 18', 'TypeScript', 'Node.js', 'MySQL', 'Socket.io', 'Express.js', 'JWT', 'Docker'],
        skills: [
          { name: 'React', imageType: 'fontawesome', image: 'fab fa-react' },
          { name: 'TypeScript', imageType: 'path', image: '/images/icons/ts.svg' },
          { name: 'Node.js', imageType: 'fontawesome', image: 'fab fa-node-js' },
          { name: 'MySQL', imageType: 'path', image: '/images/icons/mySql.svg' },
          { name: 'Socket.io', imageType: 'path', image: '/images/icons/Socket.io.svg' },
          { name: 'Express.js', imageType: 'path', image: '/images/icons/Express.js.svg' },
          { name: 'JWT', imageType: 'path', image: '/images/icons/jwt.svg' },
          { name: 'Docker', imageType: 'fontawesome', image: 'fab fa-docker' },
          { name: 'Bootstrap', imageType: 'fontawesome', image: 'fab fa-bootstrap' },
          { name: 'SASS', imageType: 'fontawesome', image: 'fab fa-sass' },
          { name: 'Video.js', imageType: 'path', image: '/images/icons/video.js.svg' },
          { name: 'Google AI', imageType: 'path', image: '/images/icons/google-ai.svg' },
          { name: 'i18next', imageType: 'path', image: '/images/icons/i18next.svg' },
          { name: 'Webpack', imageType: 'path', image: '/images/icons/jsWebpack.svg' },
          { name: 'Jest', imageType: 'path', image: '/images/icons/jest.svg' },
          { name: 'GitHub Actions', imageType: 'fontawesome', image: 'fab fa-github' }
        ],
        liveUrl: 'https://www.tache-lik.tn',
        featured: true
      },
      // HireUp
      {
        id: 'hireup',
        title: 'HireUp',
        description: 'AI-powered recruitment platform connecting employers with candidates.',
        longDescription: 'HireUp is an innovative recruitment platform that leverages artificial intelligence to streamline the hiring process. Features advanced job matching algorithms, AI chatbot assistance, face recognition authentication, voice navigation, real-time messaging, comprehensive analytics, and secure payment processing for both employers and job seekers.',
        image: '/images/portfolio/hu.png',
        coverImage: '/images/portfolio/hireup_cover.png',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: ['AI/ML Platform', 'Recruitment Technology', 'Full-Stack Development'],
        technologies: ['PHP', 'MySQL', 'Python', 'AI/ML', 'Bootstrap', 'OpenCV', 'Ollama', 'Stripe'],
        skills: [
          { name: 'PHP', imageType: 'fontawesome', image: 'fab fa-php' },
          { name: 'MySQL', imageType: 'path', image: '/images/icons/mysql.svg' },
          { name: 'Python', imageType: 'fontawesome', image: 'fab fa-python' },
          { name: 'JavaScript', imageType: 'fontawesome', image: 'fab fa-js-square' },
          { name: 'Bootstrap', imageType: 'fontawesome', image: 'fab fa-bootstrap' },
          { name: 'jQuery', imageType: 'path', image: '/images/icons/jquery.svg' },
          { name: 'OpenCV', imageType: 'path', image: '/images/icons/OpenCV.svg' },
          { name: 'Ollama', imageType: 'path', image: '/images/icons/ollama.svg' },
          { name: 'Google APIs', imageType: 'fontawesome', image: 'fab fa-google' },
          { name: 'Stripe', imageType: 'fontawesome', image: 'fab fa-stripe' },
          { name: 'Firebase', imageType: 'path', image: '/images/icons/firebase.svg' },
          { name: 'Font Awesome', imageType: 'fontawesome', image: 'fab fa-font-awesome' },
          { name: 'AI/ML', imageType: 'fontawesome', image: 'fas fa-robot' },
          { name: 'Face Recognition', imageType: 'fontawesome', image: 'fas fa-user-check' },
          { name: 'Voice Recognition', imageType: 'fontawesome', image: 'fas fa-microphone' },
          { name: 'PDF Generation', imageType: 'fontawesome', image: 'fas fa-file-pdf' }
        ],
        githubUrl: 'https://github.com/HamaBTW/web-project-hireup-hama-git/tree/hama',
        featured: true
      },
      // Clothify
      {
        id: 'clothify',
        title: 'Clothify',
        description: 'Comprehensive waste management system with Arduino integration and real-time analytics.',
        longDescription: 'Clothify is a comprehensive waste management system built with Qt C++ that provides end-to-end solutions for waste collection, employee management, client relations, and fleet operations. Features Arduino-based RFID access control, real-time notifications, mapping services, advanced analytics, and automated reporting to streamline waste management operations.',
        image: '/images/portfolio/clothify.png',
        coverImage: '/images/portfolio/clothify_cover.png',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        category: ['Desktop Application', 'IoT Integration', 'Waste Management'],
        technologies: ['Qt C++', 'Arduino', 'SQL', 'RFID', 'QML', 'ODBC'],
        skills: [
          { name: 'Qt Framework', imageType: 'path', image: '/images/icons/Qt.svg' },
          { name: 'C++', imageType: 'path', image: '/images/icons/C++.svg' },
          { name: 'Arduino', imageType: 'path', image: '/images/icons/Arduino.svg' },
          { name: 'SQL', imageType: 'path', image: '/images/icons/SQL.svg' },
          { name: 'RFID', imageType: 'fontawesome', image: 'fas fa-wifi' },
          { name: 'QML', imageType: 'path', image: '/images/icons/QML.svg' },
          { name: 'Charts & Analytics', imageType: 'fontawesome', image: 'fas fa-chart-bar' },
          { name: 'QR Code/Barcode', imageType: 'fontawesome', image: 'fas fa-qrcode' },
          { name: 'Mapping Services', imageType: 'fontawesome', image: 'fas fa-map-marked-alt' },
          { name: 'Serial Communication', imageType: 'fontawesome', image: 'fas fa-plug' },
          { name: 'PDF/Excel Export', imageType: 'fontawesome', image: 'fas fa-file-export' },
          { name: 'Email/SMS', imageType: 'fontawesome', image: 'fas fa-envelope' },
          { name: 'Fleet Management', imageType: 'fontawesome', image: 'fas fa-truck' },
          { name: 'IoT Integration', imageType: 'fontawesome', image: 'fas fa-microchip' }
        ],
        liveUrl: 'https://clothify-app.netlify.app',
        featured: true
      },
      // The World Within
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
      // Spotipy
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
      // Explore My Work
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
