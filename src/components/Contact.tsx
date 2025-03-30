
import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save message to Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);
        
      if (error) {
        console.error('Error submitting form:', error);
        toast.error('Failed to send message. Please try again.');
      } else {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-black text-white">
      <div className="portfolio-container">
        <h2 className="section-title text-white">Get in Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-medium mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:kartikgnavpute@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    kartikgnavpute@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a href="tel:+917821973651" className="text-gray-300 hover:text-white transition-colors">
                    +91 7821973651
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-gray-300">Chh. Sambhajinagar, Maharashtra, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Linkedin className="w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <a href="https://www.linkedin.com/in/kartik-navpute-25a189202" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    linkedin.com/in/kartik-navpute-25a189202
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Github className="w-5 h-5 mt-1" />
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <a href="https://github.com/kartiknavpute" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    github.com/kartiknavpute
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white resize-none"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
