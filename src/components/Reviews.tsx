
import { useState, useEffect } from 'react';
import { MessageSquare, Star, Plus } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import ReviewForm from './ReviewForm';

interface Review {
  id: string;
  name: string;
  position: string;
  image: string;
  content: string;
  rating: number;
  approved: boolean;
  created_at: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);
  
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('client_reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        setReviews(data);
      } else {
        // Fallback to default reviews if none are approved yet
        setReviews([
          {
            id: "1",
            name: "Alex Johnson",
            position: "CTO at TechInnovate",
            image: "https://api.dicebear.com/7.x/initials/svg?seed=a",
            content: "Exceptional work on our enterprise software. The attention to detail and clean code made all the difference. Highly recommended for any development project.",
            rating: 5,
            approved: true,
            created_at: new Date().toISOString()
          },
          {
            id: "2",
            name: "Sarah Williams",
            position: "Product Manager at EcoSmart",
            image: "https://api.dicebear.com/7.x/initials/svg?seed=s",
            content: "Great communication throughout the project. Delivered on time and exceeded our expectations with additional optimizations.",
            rating: 5,
            approved: true,
            created_at: new Date().toISOString()
          },
          {
            id: "3",
            name: "Michael Chen",
            position: "Director at HealthPlus",
            image: "https://api.dicebear.com/7.x/initials/svg?seed=m",
            content: "Transformed our healthcare platform with innovative solutions. Very responsive to our needs and quick to implement changes.",
            rating: 4,
            approved: true,
            created_at: new Date().toISOString()
          }
        ]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  return (
    <section id="reviews" className="section-padding">
      <div className="portfolio-container">
        <h2 className="section-title">Client Reviews</h2>
        
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6" />
            <h3 className="text-xl font-medium">What Our Clients Say</h3>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Add Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <ReviewForm />
            </DialogContent>
          </Dialog>
        </div>
        
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4">Loading reviews...</p>
          </div>
        ) : (
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/2 p-2">
                  <Card className="h-full card-hover">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img 
                              src={review.image} 
                              alt={review.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{review.name}</h4>
                            <p className="text-sm text-gray-500">{review.position}</p>
                          </div>
                        </div>
                        
                        <div className="flex mb-2">
                          {renderStars(review.rating)}
                        </div>
                        
                        <p className="text-gray-700 italic">"{review.content}"</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 md:-left-12" />
            <CarouselNext className="absolute right-0 md:-right-12" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default Reviews;
