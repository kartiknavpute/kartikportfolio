
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ClientFormProps {
  onClientAdded: () => void;
}

const ClientForm = ({ onClientAdded }: ClientFormProps) => {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !industry || !description) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate a placeholder logo
      const logoUrl = `https://api.dicebear.com/7.x/shapes/svg?seed=${name.toLowerCase().replace(/\s+/g, '')}`;
      
      // Insert the client into Supabase
      const { error } = await supabase
        .from('clients')
        .insert([
          { 
            name, 
            industry, 
            description,
            logo: logoUrl,
            approved: false // Clients need approval before being displayed
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Thank you!",
        description: "Your company information has been submitted and will be displayed after approval.",
      });
      
      // Reset form and notify parent
      setName("");
      setIndustry("");
      setDescription("");
      onClientAdded();
    } catch (error) {
      console.error("Error submitting client:", error);
      toast({
        title: "Something went wrong",
        description: "Your information could not be submitted. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h3 className="text-xl font-medium mb-4">Add Your Company</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Company Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Example Inc."
          />
        </div>
        
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input 
            id="industry" 
            value={industry} 
            onChange={(e) => setIndustry(e.target.value)} 
            placeholder="Technology, Healthcare, etc."
          />
        </div>
        
        <div>
          <Label htmlFor="description">Brief Description</Label>
          <Input 
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="What your company does"
          />
        </div>
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ClientForm;
