
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProjectCard, { ProjectProps } from './ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching projects:', error);
          // If we can't load from database, use fallback data
          setProjects(fallbackProjects);
        } else if (data && data.length > 0) {
          const mappedProjects = data.map(project => ({
            id: project.id,
            title: project.title,
            description: project.description,
            image: project.image,
            techStack: project.tech_stack,
            githubUrl: project.github_url || undefined,
            liveUrl: project.live_url || undefined,
          }));
          setProjects(mappedProjects);
        } else {
          // If no projects in database, use fallback data
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fallback projects in case the database fetch fails
  const fallbackProjects: ProjectProps[] = [
    {
      id: 1,
      title: "Hospital Management System",
      description: "Developed an end-to-end management system for hospitals, integrating patient, doctor, and billing modules using MVC .NET.",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b3db4f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
      techStack: [".NET Core", "MVC", "C#", "SQL Server"],
      githubUrl: "https://github.com/kartiknavpute"
    },
    {
      id: 2,
      title: "Ganpati Aarti App",
      description: "Created an app listing Ashtavinayak temples with navigation details and aarti lyrics using .NET MAUI.",
      image: "https://images.unsplash.com/photo-1541430988689-0429ad5923b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2096&q=80",
      techStack: [".NET MAUI", "C#", "XAML"],
      githubUrl: "https://github.com/kartiknavpute"
    },
    {
      id: 3,
      title: "Bhagwat Gita App",
      description: "Developed an application for exploring the slokas and chapters of Bhagwat Gita using .NET MAUI.",
      image: "https://images.unsplash.com/photo-1585504198200-26a1bc8757dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      techStack: [".NET MAUI", "C#", "XAML"],
      githubUrl: "https://github.com/kartiknavpute"
    },
    {
      id: 4,
      title: "Local to Global (E-commerce)",
      description: "A marketplace to connect local sellers with buyers, integrating negotiation features.",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2055&q=80",
      techStack: ["React", ".NET Core", "MongoDB"],
      githubUrl: "https://github.com/kartiknavpute"
    }
  ];

  return (
    <section id="projects" className="section-padding bg-gray-50">
      <div className="portfolio-container">
        <h2 className="section-title">Selected Projects</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div 
                key={typeof project.id === 'number' ? project.id : project.id.toString()} 
                className="opacity-0 animate-scale-in" 
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
