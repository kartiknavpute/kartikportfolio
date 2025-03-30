
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16"
    >
      <div className="portfolio-container z-10 flex flex-col justify-center items-start">
        <div className="max-w-2xl animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
          <div className="inline-block mb-4 py-1 px-3 text-xs font-medium bg-black/5 rounded-full">
            Full Stack Developer
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            Kartik Navpute
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Aspiring Full Stack Developer with expertise in .NET, React, and cloud technologies. 
            Passionate about building scalable applications, solving complex problems, and continuously learning new technologies.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects"
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-black/90 transition-colors"
            >
              View Projects
            </a>
            <a 
              href="#contact"
              className="bg-white border border-gray-200 text-black px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-[-10%] md:right-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-blur-in opacity-0" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 left-[-10%] md:left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-blur-in opacity-0" style={{ animationDelay: '0.8s' }}></div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#projects" aria-label="Scroll down">
          <ArrowDown size={24} className="text-foreground/60" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
