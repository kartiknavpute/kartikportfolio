
import { Briefcase } from 'lucide-react';

const WorkExperience = () => {
  const experiences = [
    {
      position: ".NET Developer (Frontend & Backend)",
      description: "Worked on MVC and CRUD operations, integrating templates in projects.",
      skills: [".NET Core", "MVC", "C#", "SQL Server"],
    },
    {
      position: "DevOps Engineer (AWS & Linux)",
      description: "Deployed and managed cloud servers, automated CI/CD workflows.",
      skills: ["AWS", "CI/CD", "Docker", "Linux"],
    },
    {
      position: "Software Engineer (Full Stack Development)",
      description: "Built applications using .NET, React, and cloud technologies.",
      skills: ["React", ".NET Core", "AWS", "MongoDB"],
    }
  ];

  return (
    <section id="experience" className="section-padding bg-white">
      <div className="portfolio-container">
        <h2 className="section-title">Work Experience</h2>
        
        <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-black p-2 rounded-full text-white">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{exp.position}</h3>
                    <p className="text-gray-600 mb-4">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {index < experiences.length - 1 && (
                  <div className="ml-5 h-10 w-0.5 bg-gray-200 my-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
