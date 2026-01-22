import React from 'react';
import ProfileSection from './components/ProfileSection';
import EducationSection from './components/EducationSection';
import ProjectSection from './components/ProjectSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <div className="about-me-container">
      <header className="about-me-header">
        <h1>About Me</h1>
      </header>

      <ProfileSection />
      <EducationSection />
      <ProjectSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
