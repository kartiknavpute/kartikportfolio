
import { School, Award } from 'lucide-react';

const Education = () => {
  const education = [
    {
      degree: "B.Tech in Computer Science Engineering",
      institution: "MIT Aurangabad",
      period: "2018 - 2022",
    },
    {
      degree: "Higher Secondary Education (11th & 12th)",
      institution: "Deogiri College, Aurangabad",
      period: "2016 - 2018",
    },
    {
      degree: "High School (10th)",
      institution: "HRI. Saraswati Bhuvan Highschool, Aurangabad",
      period: "2016",
    }
  ];

  const certifications = [
    "AWS Certified Solutions Architect (Associate)",
    "Red Hat Certified Engineer (RHCE)",
    "Full Stack Development with React & .NET"
  ];

  return (
    <section id="education" className="section-padding bg-gray-50">
      <div className="portfolio-container">
        <h2 className="section-title">Education & Certifications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
              <School className="h-6 w-6" />
              <h3 className="text-xl font-medium">Education</h3>
            </div>
            
            <div className="space-y-8">
              {education.map((item, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute w-3 h-3 bg-black rounded-full -left-[7px] top-1.5"></div>
                  <h4 className="font-medium text-lg">{item.degree}</h4>
                  <p className="text-gray-600">{item.institution}</p>
                  <p className="text-sm text-gray-500">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-6 w-6" />
              <h3 className="text-xl font-medium">Certifications</h3>
            </div>
            
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white">
                  <p className="font-medium">{cert}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-medium mb-4">Hobbies & Interests</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Playing badminton and cricket</li>
                <li>Exploring nature and traveling</li>
                <li>Gaming (BGMI, Call of Duty, GTA V, Tomb Raider)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
