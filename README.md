# Mohamed Abidi - Portfolio

A modern, responsive portfolio website built with React and TypeScript, showcasing the work and expertise of Mohamed Abidi, an Engineering Student, Mentor, and Founder of Tache-Lik.

## 🌟 Live Demo

**[View Portfolio](https://HamaBTW.github.io/portfolio)**

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Customization](#customization)
- [Contact](#contact)

## ✨ Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Components**: Dynamic project modals, smooth scrolling navigation
- **Resume Download**: Direct PDF download functionality
- **Contact Form**: Functional contact form for inquiries
- **Project Showcase**: Detailed project presentations with live demos and GitHub links
- **Skills & Experience**: Comprehensive display of technical skills and work experience
- **SEO Optimized**: Meta tags and structured data for better search engine visibility
- **Performance Optimized**: Fast loading times and optimized assets

## 🛠 Tech Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **TypeScript 4.9.5** - Type-safe JavaScript
- **Framer Motion 12.17.0** - Smooth animations and transitions
- **React Router DOM 7.6.2** - Client-side routing

### Styling
- **Custom CSS** - Handcrafted styles for unique design
- **Font Awesome 6.4.0** - Icon library
- **Responsive Grid System** - Mobile-first approach

### Development Tools
- **React Scripts 5.0.1** - Build toolchain
- **ESLint** - Code linting
- **Web Vitals** - Performance monitoring

### Deployment
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - Automated CI/CD pipeline
- **gh-pages** - Deployment utility

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── About/           # About section component
│   ├── Contact/         # Contact form component
│   ├── Footer/          # Footer component
│   ├── Header/          # Navigation header
│   ├── Hero/            # Hero/landing section
│   └── Projects/        # Projects showcase
├── data/                # Static data and content
│   ├── personal.ts      # Personal information and content
│   └── ProjectsManager.ts # Projects data management
├── hooks/               # Custom React hooks
│   └── usePortfolioJS.ts # Portfolio functionality hook
├── styles/              # CSS stylesheets
│   ├── vendor.css       # Third-party styles
│   └── original.css     # Custom styles
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── assets/              # Static assets
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HamaBTW/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### Development
- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

### Deployment
- `npm run build:ci` - Builds with CI environment (warnings ignored)
- `npm run deploy` - Deploys to GitHub Pages
- `npm run predeploy` - Pre-deployment build script

## 🚀 Deployment

This portfolio is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment
- **Trigger**: Push to `master` branch
- **Process**: GitHub Actions builds and deploys automatically
- **URL**: https://HamaBTW.github.io/portfolio

### Manual Deployment
```bash
npm run deploy
```

### Deployment Configuration
- **Homepage**: Set in `package.json`
- **Build**: Optimized production build
- **Assets**: Properly configured for GitHub Pages subdirectory

## 🎨 Customization

### Personal Information
Edit `src/data/personal.ts` to update:
- Personal details (name, title, contact info)
- Skills and expertise
- Work experience
- Education background
- Social media links

### Projects
Modify `src/data/ProjectsManager.ts` to:
- Add new projects
- Update project descriptions
- Change project images and links
- Modify project categories

### Styling
- **Global styles**: `src/styles/original.css`
- **Component styles**: Individual CSS files in component folders
- **Colors and themes**: CSS custom properties in root styles

### Content Sections
- **Hero Section**: `src/components/Hero/Hero.tsx`
- **About Section**: `src/components/About/About.tsx`
- **Projects Section**: `src/components/Projects/Projects.tsx`
- **Contact Section**: `src/components/Contact/Contact.tsx`

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Optimized for all screen sizes
- **Touch Friendly**: Mobile-optimized interactions
- **Performance**: Fast loading on all devices

## 🔧 Performance Features

- **Code Splitting**: Automatic code splitting with React
- **Image Optimization**: Optimized images for web
- **Lazy Loading**: Components loaded as needed
- **Caching**: Browser caching for static assets
- **Minification**: Minified CSS and JavaScript

## 📞 Contact

**Mohamed Abidi**
- **Email**: [abidi.mohamed.business@gmail.com](mailto:abidi.mohamed.business@gmail.com)
- **Phone**: +216 99 290 230
- **LinkedIn**: [med-abidi](https://www.linkedin.com/in/med-abidi/)
- **Location**: Tunisia

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Create React App** - For the excellent boilerplate
- **GitHub Pages** - For free hosting
- **Font Awesome** - For the beautiful icons

---

**Built with ❤️ by Mohamed Abidi**
