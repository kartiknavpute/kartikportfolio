
import { Card, CardContent } from "@/components/ui/card";

interface ClientCardProps {
  name: string;
  industry: string;
  description: string;
  logo: string;
}

const ClientCard = ({ name, industry, description, logo }: ClientCardProps) => {
  return (
    <Card className="card-hover h-full">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
          <img 
            src={logo} 
            alt={`${name} logo`} 
            className="w-full h-full object-cover"
          />
        </div>
        <h4 className="font-semibold text-lg">{name}</h4>
        <p className="text-gray-500 text-sm mb-2">{industry}</p>
        <p className="text-center text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ClientCard;
