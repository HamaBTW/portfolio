interface Skill {
  name: string;
  imageType?: 'link' | 'path' | 'fontawesome';
  image?: string;
}

interface Repository {
  name: string;
  url: string;
  description?: string;
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
  liveUrlText?: string; // Custom text for live URL button
  githubUrl?: string;
  githubUrlText?: string; // Custom text for GitHub URL button
  repositories?: Repository[];
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
        videoUrl: 'https://www.youtube.com/watch?v=24EC5hyswGw',
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
        liveUrlText: 'Visit Platform',
        featured: true
      },
      // EcoNet
      {
        id: 'econet',
        title: 'EcoNet',
        description: 'Comprehensive ecological platform with web and desktop applications for environmental management.',
        longDescription: 'EcoNet is a comprehensive ecological platform that empowers businesses, organizations, and individuals to track, analyze, and optimize their environmental impact. Features both a Symfony web application and JavaFX desktop companion with AI integration, community forums, marketplace, donation system, face recognition authentication, and advanced analytics for sustainable resource management.',
        image: '/images/portfolio/econet.png',
        coverImage: '/images/portfolio/econet_cover.png',
        videoUrl: 'https://www.youtube.com/watch?v=KewADLXuk7U',
        category: ['Environmental Technology', 'Full-Stack Development', 'AI Integration'],
        technologies: ['Symfony', 'JavaFX', 'MySQL', 'AI/ML', 'OAuth2', 'Face Recognition'],
        skills: [
          { name: 'Symfony', imageType: 'path', image: '/images/icons/symfony.svg' },
          { name: 'PHP', imageType: 'fontawesome', image: 'fab fa-php' },
          { name: 'JavaFX', imageType: 'path', image: '/images/icons/javafx.svg' },
          { name: 'Java', imageType: 'fontawesome', image: 'fab fa-java' },
          { name: 'MySQL', imageType: 'path', image: '/images/icons/mysql.svg' },
          { name: 'Twig', imageType: 'path', image: '/images/icons/twig.svg' },
          { name: 'Bootstrap', imageType: 'fontawesome', image: 'fab fa-bootstrap' },
          { name: 'JavaScript', imageType: 'fontawesome', image: 'fab fa-js-square' },
          { name: 'Google AI', imageType: 'path', image: '/images/icons/google-ai.svg' },
          { name: 'OpenCV', imageType: 'path', image: '/images/icons/opencv.svg' },
          { name: 'OAuth2', imageType: 'fontawesome', image: 'fas fa-key' },
          { name: 'Face Recognition', imageType: 'fontawesome', image: 'fas fa-user-check' },
          { name: 'WebSocket', imageType: 'fontawesome', image: 'fas fa-plug' },
          { name: 'PDF Generation', imageType: 'fontawesome', image: 'fas fa-file-pdf' },
          { name: 'QR Code', imageType: 'fontawesome', image: 'fas fa-qrcode' },
          { name: 'Voice Recognition', imageType: 'fontawesome', image: 'fas fa-microphone' }
        ],
        repositories: [
          {
            name: 'EcoNet Web',
            url: 'https://github.com/fekikarim/econet',
            description: 'Symfony 6.4 web application with PHP 8.1+, featuring community forums, marketplace, and AI integration'
          },
          {
            name: 'EcoNet Desktop',
            url: 'https://github.com/fekikarim/econet-java',
            description: 'JavaFX 17 desktop application with AI chatbot, face recognition, and real-time analytics'
          }
        ],
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
        videoUrl: 'https://www.youtube.com/watch?v=VMWyU_d40Jo',
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
        githubUrl: 'https://github.com/HamaBTW/hireup',
        githubUrlText: 'Source Code',
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
        videoUrl: 'https://www.youtube.com/watch?v=GDxTGyaTj8o',
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
        githubUrl: 'https://github.com/HamaBTW/Clothify',
        githubUrlText: 'GitHub Repo',
        liveUrl: 'https://clothify-app.netlify.app',
        liveUrlText: 'More Details',
        featured: true
      },
      // The World Within
      {
        id: 'tww',
        title: 'The World Within',
        description: 'Award-winning 2D side-scrolling platformer game developed using SDL 1.2.',
        longDescription: 'The World Within is an award-winning 2D side-scrolling platformer game developed using SDL 1.2. This engaging adventure game emerged victorious in university competitions, securing 2nd place at both "Game Day 2023" and the prestigious "Bal des Projets 2023" by Esprit. Features multi-level adventure, dynamic combat system, interactive storytelling, puzzle integration, and Arduino controller support.',
        image: '/images/portfolio/tww_logo.png',
        coverImage: '/images/portfolio/tww_cover.png',
        videoUrl: 'https://www.youtube.com/watch?v=jf0BkSjuGEM',
        category: ['Award-Winning Game', '2D Platformer', 'SDL Development'],
        technologies: ['SDL 1.2', 'C Language', 'Arduino Integration', 'Game Engine', 'Physics'],
        skills: [
          { name: 'C Language', imageType: 'path', image: '/images/icons/c.svg' },
          { name: 'SDL Framework', imageType: 'path', image: '/images/icons/sdl-1.2.svg' },
          { name: 'Game Development', imageType: 'fontawesome', image: 'fas fa-gamepad' },
          { name: 'Graphics Programming', imageType: 'fontawesome', image: 'fas fa-paint-brush' },
          { name: '2D Animation', imageType: 'fontawesome', image: 'fas fa-film' },
          { name: 'Physics Engine', imageType: 'fontawesome', image: 'fas fa-atom' },
          { name: 'Audio Programming', imageType: 'fontawesome', image: 'fas fa-volume-up' },
          { name: 'Arduino Integration', imageType: 'path', image: '/images/icons/Arduino.svg' },
          { name: 'Collision Detection', imageType: 'fontawesome', image: 'fas fa-crosshairs' },
          { name: 'Level Design', imageType: 'fontawesome', image: 'fas fa-map' },
          { name: 'Character Animation', imageType: 'fontawesome', image: 'fas fa-running' },
          { name: 'Combat System', imageType: 'fontawesome', image: 'fas fa-fist-raised' },
          { name: 'Save System', imageType: 'fontawesome', image: 'fas fa-save' },
          { name: 'Minimap System', imageType: 'fontawesome', image: 'fas fa-compass' }
        ],
        liveUrl: 'https://kanm.netlify.app',
        liveUrlText: 'More Details',
        featured: true
      },
      // Spotipy
      {
        id: 'spotipy',
        title: 'Spotipy',
        description: 'Comprehensive Spotify application suite with playlist management and YouTube music download capabilities.',
        longDescription: 'Spotipy is a comprehensive Spotify application suite that allows users to manage their Spotify playlists and download music from YouTube. Features both web and desktop interfaces with modern UI design, OAuth authentication, real-time download progress tracking, theme support, and powerful batch download capabilities for offline music access.',
        image: '/images/portfolio/spotipy.png',
        coverImage: '/images/portfolio/spotipy_cover.png',
        category: ['Desktop Application', 'Web Application', 'Music Technology'],
        technologies: ['Python', 'Flask', 'Flet', 'Spotify API', 'YouTube API', 'OAuth 2.0'],
        skills: [
          { name: 'Python', imageType: 'fontawesome', image: 'fab fa-python' },
          { name: 'Flask', imageType: 'path', image: '/images/icons/flask.svg' },
          { name: 'Flet Framework', imageType: 'path', image: '/images/icons/flet.svg' },
          { name: 'Spotify API', imageType: 'fontawesome', image: 'fab fa-spotify' },
          { name: 'YouTube API', imageType: 'fontawesome', image: 'fab fa-youtube' },
          { name: 'OAuth 2.0', imageType: 'fontawesome', image: 'fas fa-key' },
          { name: 'HTML5', imageType: 'fontawesome', image: 'fab fa-html5' },
          { name: 'CSS3', imageType: 'fontawesome', image: 'fab fa-css3-alt' },
          { name: 'JavaScript', imageType: 'fontawesome', image: 'fab fa-js-square' },
          { name: 'Material Design', imageType: 'fontawesome', image: 'fas fa-palette' },
          { name: 'API Integration', imageType: 'fontawesome', image: 'fas fa-plug' },
          { name: 'Desktop GUI', imageType: 'fontawesome', image: 'fas fa-desktop' },
          { name: 'Web Development', imageType: 'fontawesome', image: 'fas fa-globe' },
          { name: 'Music Streaming', imageType: 'fontawesome', image: 'fas fa-music' }
        ],
        liveUrl: 'https://spotipy-app.netlify.app',
        liveUrlText: 'Download App',
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
        githubUrlText: 'Visit GitHub',
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
export type { Project, Skill, Repository };
