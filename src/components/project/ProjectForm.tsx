
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const projectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().url('Please enter a valid image URL'),
  githubUrl: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal('')),
  liveUrl: z.string().url('Please enter a valid live URL').optional().or(z.literal('')),
});

type ProjectFormValues = z.infer<typeof projectSchema> & {
  techStack: string[];
};

interface ProjectFormProps {
  onProjectAdded?: () => void;
  onCancel?: () => void;
}

const ProjectForm = ({ onProjectAdded, onCancel }: ProjectFormProps) => {
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      githubUrl: '',
      liveUrl: '',
      techStack: [],
    },
  });

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const onSubmit = async (values: ProjectFormValues) => {
    if (techStack.length === 0) {
      toast.error('Please add at least one technology');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('projects').insert({
        title: values.title,
        description: values.description,
        image: values.image,
        github_url: values.githubUrl || null,
        live_url: values.liveUrl || null,
        tech_stack: techStack,
      });

      if (error) {
        throw error;
      }

      toast.success('Project added successfully');
      form.reset();
      setTechStack([]);
      onProjectAdded?.();
    } catch (error: any) {
      console.error('Error adding project:', error);
      toast.error(error.message || 'Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter project description" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Technologies</FormLabel>
          <div className="flex">
            <Input
              placeholder="Add technology"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="mr-2"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTech();
                }
              }}
            />
            <Button type="button" onClick={addTech} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {techStack.map((tech) => (
                <div 
                  key={tech} 
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center"
                >
                  {tech}
                  <button 
                    type="button" 
                    onClick={() => removeTech(tech)}
                    className="ml-1 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {form.formState.errors.techStack && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.techStack.message}
            </p>
          )}
        </div>

        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter GitHub URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="liveUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter live URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Project'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
