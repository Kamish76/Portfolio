import React from 'react';
import Home from './components/Home';
import EducationSection from './components/EducationSection';
import ProjectSection from './components/ProjectSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';

export default function App() {
  return (
    <div className="about-me-container">
      <section className="portfolio-page-section section-home" id="home">
        <Home />
      </section>

      <section className="portfolio-page-section" id="projects">
        <ProjectSection />
      </section>

      <section className="portfolio-page-section" id="skills">
        <SkillsSection />
      </section>

      <section className="portfolio-page-section" id="education">
        <EducationSection />
      </section>    

      <section className="portfolio-page-section" id="contact">
        <ContactSection />
      </section>
    </div>
  );
}
