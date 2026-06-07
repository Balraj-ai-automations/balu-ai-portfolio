import { projectsData } from '../../data/portfolio-data';
import ProjectCard from './ProjectCard';
import './Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <header className="projects__header">
          <p className="section-label">{'// MISSION FILES'}</p>
          <h2 className="section-title">CLASSIFIED OPERATIONS</h2>
        </header>

        <div className="projects__grid">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
