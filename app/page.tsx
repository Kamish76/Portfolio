import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProjectSection from "./components/ProjectSection";
import EducationSection from "./components/EducationSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <div className="portfolio-shell">
      <Navbar />

      <main>
        <section className="section-block section-block-hero" id="home">
          <Home />
        </section>

        <section className="section-block" id="projects">
          <ProjectSection />
        </section>

        <section className="section-block" id="education">
          <EducationSection />
        </section>

        <section className="section-block" id="skills">
          <SkillsSection />
        </section>
      </main>

      <footer className="footer-section" id="contact">
        <ContactSection />
      </footer>
    </div>
  );
}
