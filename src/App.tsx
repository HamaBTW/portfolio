import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { usePortfolioJS } from './hooks/usePortfolioJS';
import './App.css';

function App() {
  usePortfolioJS();

  return (
    <div className="App">
      {/* Preloader */}
      <div id="preloader">
        <div id="loader"></div>
      </div>

      <div className="s-pagewrap">
        {/* Animated Circles */}
        <div className="circles">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <Header />

        <main className="s-content">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
