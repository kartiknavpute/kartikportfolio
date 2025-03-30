
import { Building2, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ClientForm from './client/ClientForm';
import ClientList from './client/ClientList';

const Clients = () => {
  return (
    <section id="clients" className="section-padding bg-gray-50">
      <div className="portfolio-container">
        <h2 className="section-title">Our Clients</h2>
        
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6" />
              <h3 className="text-xl font-medium">Companies We've Worked With</h3>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add Your Company
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <ClientForm onClientAdded={() => {}} />
              </DialogContent>
            </Dialog>
          </div>
          
          <ClientList />
        </div>
      </div>
    </section>
  );
};

export default Clients;
