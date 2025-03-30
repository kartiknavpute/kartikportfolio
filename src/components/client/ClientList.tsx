
import { useState, useEffect } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { supabase } from "@/integrations/supabase/client";
import ClientCard from "./ClientCard";

export interface Client {
  id: string;
  name: string;
  industry: string;
  description: string;
  logo: string;
  approved: boolean;
  created_at: string;
}

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);
  
  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('approved', true);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        setClients(data);
      } else {
        // Fallback to defaults if no approved clients
        setClients([
          {
            id: "1",
            name: "TechInnovate",
            industry: "Software Development",
            logo: "https://api.dicebear.com/7.x/shapes/svg?seed=techinnovate",
            description: "Enterprise software solutions provider",
            approved: true,
            created_at: new Date().toISOString()
          },
          {
            id: "2",
            name: "EcoSmart",
            industry: "Green Technology",
            logo: "https://api.dicebear.com/7.x/shapes/svg?seed=ecosmart",
            description: "Sustainable technology solutions",
            approved: true,
            created_at: new Date().toISOString()
          },
          {
            id: "3",
            name: "HealthPlus",
            industry: "Healthcare",
            logo: "https://api.dicebear.com/7.x/shapes/svg?seed=healthplus",
            description: "Digital healthcare platform",
            approved: true,
            created_at: new Date().toISOString()
          }
        ]);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4">Loading clients...</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {clients.map((client) => (
          <CarouselItem key={client.id} className="md:basis-1/2 lg:basis-1/3">
            <ClientCard 
              name={client.name}
              industry={client.industry}
              description={client.description}
              logo={client.logo}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 md:-left-12" />
      <CarouselNext className="absolute right-0 md:-right-12" />
    </Carousel>
  );
};

export default ClientList;
