
import { ExternalLink, Github } from 'lucide-react';

export interface ProjectProps {
  id: number | string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  return (
    <div
      className="rounded-xl overflow-hidden group card-hover bg-white"
      key={project.id}
    >
      <div className="relative overflow-hidden h-56">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-10 group-hover:opacity-0 transition-opacity"></div>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        
        <div className="mb-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-block px-2 py-1 text-xs font-medium bg-secondary rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium link-hover"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium link-hover"
            >
              <Github size={16} /> View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
