
import SkillItem from './SkillItem';

const Skills = () => {
  const frontendSkills = [
    { name: 'React.js', level: 8 },
    { name: 'HTML/CSS', level: 9 },
    { name: 'JavaScript', level: 8 },
    { name: 'Bootstrap', level: 8 },
  ];

  const backendSkills = [
    { name: '.NET Core', level: 9 },
    { name: 'C#', level: 9 },
    { name: 'ASP.NET MVC', level: 8 },
    { name: 'Node.js', level: 7 },
  ];

  const otherSkills = [
    { name: 'AWS Cloud', level: 8 },
    { name: 'Docker', level: 7 },
    { name: 'SQL Server', level: 8 },
    { name: 'MongoDB', level: 7 },
    { name: 'Linux', level: 8 },
  ];

  return (
    <section id="skills" className="section-padding bg-white">
      <div className="portfolio-container">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-medium mb-6">Frontend Development</h3>
            <div className="space-y-6">
              {frontendSkills.map((skill, index) => (
                <SkillItem 
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.1 + index * 0.1}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-6">Backend Development</h3>
            <div className="space-y-6">
              {backendSkills.map((skill, index) => (
                <SkillItem 
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.3 + index * 0.1}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-6">Cloud & DevOps</h3>
            <div className="space-y-6">
              {otherSkills.map((skill, index) => (
                <SkillItem 
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.5 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
