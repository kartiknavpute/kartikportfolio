
import { useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ReviewForm = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Function to handle star rating selection
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  // Function to render interactive stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-6 w-6 cursor-pointer ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => handleRatingClick(i)}
        />
      );
    }
    return stars;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !position || !content) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate a placeholder image URL based on name
      const nameInitial = name.charAt(0).toLowerCase();
      const imageUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${nameInitial}`;
      
      // Insert the review into Supabase
      const { error } = await supabase
        .from('client_reviews')
        .insert([
          { 
            name, 
            position, 
            content, 
            rating,
            image: imageUrl,
            approved: false // Reviews need approval before being displayed
          }
        ]);
      
      if (error) throw error;
      
      toast({
        title: "Thank you for your review!",
        description: "Your review has been submitted and will be displayed after approval.",
      });
      
      // Reset form
      setName("");
      setPosition("");
      setContent("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Something went wrong",
        description: "Your review could not be submitted. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-medium mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Your Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <Label htmlFor="position">Your Position & Company</Label>
          <Input 
            id="position" 
            value={position} 
            onChange={(e) => setPosition(e.target.value)} 
            placeholder="CEO at Example Co."
          />
        </div>
        
        <div>
          <Label htmlFor="rating">Rating</Label>
          <div className="flex gap-1 mt-1">{renderStars()}</div>
        </div>
        
        <div>
          <Label htmlFor="content">Your Review</Label>
          <textarea 
            id="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Share your experience working with us..."
            className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
          />
        </div>
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;
