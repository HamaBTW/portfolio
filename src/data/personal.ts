export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone?: string;
  location: string;
  avatar: string;
  aboutImage: string;
  socialLinks: SocialLink[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

export interface Skill {
  name: string;
  category: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export const personalInfo: PersonalInfo = {
  name: "Mohamed Abidi",
  title: "Mentor and Founder of Tache-Lik",
  subtitle: "Engineering Student & Computer Science Enthusiast",
  description: "I am Mohamed Abidi, an engineering student with an unyielding passion for solving complex problems and building impactful solutions. My academic journey and professional projects revolve around my core strengths in computer science, web development, and Arduino programming.",
  email: "abidi.mohamed.business@gmail.com",
  phone: "+216 99 290 230",
  location: "Tunisia",
  avatar: "/images/portfolio/ma.png",
  aboutImage: "/images/portfolio/ma_about2.png",
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/med-abidi/"
    },
    {
      name: "GitHub",
      url: "https://github.com/HamaBTW"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/Hama.BTW"
    },
    {
      name: "TacheLik",
      url: "https://www.tache-lik.tn"
    }
  ],
  skills: [
    // Programming Languages
    { name: "JavaScript", category: "Programming" },
    { name: "TypeScript", category: "Programming" },
    { name: "Python", category: "Programming" },
    { name: "Java", category: "Programming" },
    { name: "C++", category: "Programming" },

    // Web Development
    { name: "React", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Backend" },
    { name: "HTML/CSS", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },

    // Databases
    { name: "MongoDB", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Firebase", category: "Database" },

    // Tools & Technologies
    { name: "Git", category: "Tools" },
    { name: "Docker", category: "Tools" },
    { name: "Arduino", category: "Hardware" },
    { name: "IoT", category: "Hardware" }
  ],
  experience: [
    {
      title: "Founder & Lead Developer",
      company: "Tache-Lik",
      location: "Tunisia",
      startDate: "2023",
      endDate: "Present",
      description: "Founded and developed an educational platform dedicated to guiding and mentoring students. Led the technical development and strategic vision of the platform.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"]
    },
    {
      title: "Flutter Developer",
      company: "Freelance",
      location: "Remote",
      startDate: "Dec 4, 2024",
      endDate: "Dec 16, 2024",
      description: "Developed the frontend of a Flutter application for a client, focusing on modern technologies and user experience.",
      technologies: ["Flutter", "Dart"]
    },
    {
      title: "Tunisie Telecom · Internship",
      company: "Tunisie Telecom",
      location: "Tunisia",
      startDate: "Jun 2023",
      endDate: "Jul 2023",
      description: "did a technical internship at Tunisie Telecom",
      technologies: ["network", "connectivity"]
    }
  ],
  education: [
    {
      degree: "Engineering Degree in Computer Science",
      institution: "ESPRIT",
      location: "Tunisia",
      startDate: "2022",
      endDate: "2027",
      description: "Specialized in software engineering and computer science with focus on web development and system design."
    },
    {
      degree: "Bachelor's Degree in Computer Science",
      institution: "Lycée Cité Errafaha – Ariana, Tunisia",
      location: "Tunisia",
      startDate: "2020",
      endDate: "2019",
      description: "Focused on computer science and mathematics with emphasis on programming and algorithmic thinking."
    }
  ]
};

export const getSkillsByCategory = (category: string) => {
  return personalInfo.skills.filter(skill => skill.category === category);
};

export const getAllSkillCategories = () => {
  const categories = personalInfo.skills.map(skill => skill.category);
  return categories.filter((category, index) => categories.indexOf(category) === index);
};
