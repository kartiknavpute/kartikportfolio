import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, LogOut, Check, X, Building2, MessageSquare, Briefcase, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProjectForm from '@/components/project/ProjectForm';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface Client {
  id: string;
  name: string;
  industry: string;
  description: string;
  logo: string;
  approved: boolean;
  created_at: string;
}

interface Review {
  id: string;
  name: string;
  position: string;
  content: string;
  rating: number;
  image: string;
  approved: boolean;
  created_at: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  created_at: string;
}

const Admin = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState({
    messages: true,
    clients: true,
    reviews: true,
    projects: true,
  });
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const { signOut, user } = useAuth();

  useEffect(() => {
    fetchMessages();
    fetchClients();
    fetchReviews();
    fetchProjects();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(prev => ({ ...prev, messages: true }));
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to load messages');
      } else {
        setMessages(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(prev => ({ ...prev, messages: false }));
    }
  };

  const fetchClients = async () => {
    try {
      setLoading(prev => ({ ...prev, clients: true }));
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching clients:', error);
        toast.error('Failed to load clients');
      } else {
        setClients(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(prev => ({ ...prev, clients: false }));
    }
  };

  const fetchReviews = async () => {
    try {
      setLoading(prev => ({ ...prev, reviews: true }));
      const { data, error } = await supabase
        .from('client_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to load reviews');
      } else {
        setReviews(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(prev => ({ ...prev, reviews: false }));
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(prev => ({ ...prev, projects: true }));
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
      } else {
        setProjects(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting message:', error);
        toast.error('Failed to delete message');
      } else {
        toast.success('Message deleted successfully');
        // Update the messages list
        setMessages(messages.filter(msg => msg.id !== id));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    }
  };

  const toggleClientApproval = async (client: Client) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({ approved: !client.approved })
        .eq('id', client.id);

      if (error) {
        console.error('Error updating client:', error);
        toast.error('Failed to update client approval status');
      } else {
        toast.success(`Client ${client.approved ? 'unapproved' : 'approved'} successfully`);
        // Update the clients list
        setClients(clients.map(c => 
          c.id === client.id ? { ...c, approved: !c.approved } : c
        ));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting client:', error);
        toast.error('Failed to delete client');
      } else {
        toast.success('Client deleted successfully');
        // Update the clients list
        setClients(clients.filter(client => client.id !== id));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    }
  };

  const toggleReviewApproval = async (review: Review) => {
    try {
      const { error } = await supabase
        .from('client_reviews')
        .update({ approved: !review.approved })
        .eq('id', review.id);

      if (error) {
        console.error('Error updating review:', error);
        toast.error('Failed to update review approval status');
      } else {
        toast.success(`Review ${review.approved ? 'unapproved' : 'approved'} successfully`);
        // Update the reviews list
        setReviews(reviews.map(r => 
          r.id === review.id ? { ...r, approved: !r.approved } : r
        ));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('client_reviews')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting review:', error);
        toast.error('Failed to delete review');
      } else {
        toast.success('Review deleted successfully');
        // Update the reviews list
        setReviews(reviews.filter(review => review.id !== id));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      } else {
        toast.success('Project deleted successfully');
        // Update the projects list
        setProjects(projects.filter(project => project.id !== id));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const renderStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            {user && (
              <p className="text-sm text-gray-600 mr-2">
                Logged in as: {user.email}
              </p>
            )}
            <Button 
              variant="outline" 
              onClick={signOut}
              className="flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="messages">
          <TabsList className="mb-6">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare size={16} />
              Messages
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Building2 size={16} />
              Clients
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare size={16} />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Briefcase size={16} />
              Projects
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages">
            <h2 className="text-2xl font-semibold mb-4">Contact Form Messages</h2>
            {loading.messages ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <p className="text-gray-600">No messages found</p>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold">{message.name}</h2>
                        <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">
                          {message.email}
                        </a>
                      </div>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Delete message"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      {formatDate(message.created_at)}
                    </p>
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <p className="whitespace-pre-wrap">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="clients">
            <h2 className="text-2xl font-semibold mb-4">Client Companies</h2>
            {loading.clients ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4">Loading clients...</p>
              </div>
            ) : clients.length === 0 ? (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <p className="text-gray-600">No clients found</p>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Logo</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Approved</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img src={client.logo} alt={client.name} className="h-full w-full object-cover" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{client.name}</p>
                            <p className="text-sm text-gray-500 truncate max-w-[200px]">{client.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{client.industry}</TableCell>
                        <TableCell>{formatDate(client.created_at)}</TableCell>
                        <TableCell>
                          <Switch
                            checked={client.approved}
                            onCheckedChange={() => toggleClientApproval(client)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteClient(client.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reviews">
            <h2 className="text-2xl font-semibold mb-4">Client Reviews</h2>
            {loading.reviews ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4">Loading reviews...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <p className="text-gray-600">No reviews found</p>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Content</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Approved</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img src={review.image} alt={review.name} className="h-full w-full object-cover" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{review.name}</div>
                        </TableCell>
                        <TableCell>{review.position}</TableCell>
                        <TableCell>
                          <span className="text-yellow-500" title={`${review.rating} out of 5 stars`}>
                            {renderStars(review.rating)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <p className="truncate max-w-[200px]">{review.content}</p>
                        </TableCell>
                        <TableCell>{formatDate(review.created_at)}</TableCell>
                        <TableCell>
                          <Switch
                            checked={review.approved}
                            onCheckedChange={() => toggleReviewApproval(review)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteReview(review.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="projects">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <Dialog 
                open={isProjectDialogOpen} 
                onOpenChange={setIsProjectDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
                  <ProjectForm 
                    onProjectAdded={() => {
                      fetchProjects();
                      setIsProjectDialogOpen(false);
                    }}
                    onCancel={() => setIsProjectDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
            
            {loading.projects ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <p className="text-gray-600">No projects found</p>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Technologies</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div className="h-12 w-16 rounded overflow-hidden">
                            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{project.title}</div>
                        </TableCell>
                        <TableCell>
                          <p className="truncate max-w-[200px]">{project.description}</p>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {project.tech_stack.slice(0, 3).map((tech) => (
                              <span 
                                key={tech} 
                                className="bg-secondary px-2 py-0.5 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.tech_stack.length > 3 && (
                              <span className="text-xs text-muted-foreground">
                                +{project.tech_stack.length - 3} more
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(project.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteProject(project.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
