import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/hooks/useProjects';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ProjectShare() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { shareProject } = useProjects();
  const [project, setProject] = useState<any>(null);
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'viewer' | 'editor' | 'admin'>('viewer');
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProjectAndCollaborators();
    }
  }, [id]);

  const fetchProjectAndCollaborators = async () => {
    if (!id) return;

    try {
      setLoading(true);
      
      // Fetch project details
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (projectError) throw projectError;

      // Check if user is owner
      if (projectData.owner_id !== user?.id) {
        toast.error('You do not have permission to manage this project');
        navigate('/dashboard');
        return;
      }

      setProject(projectData);

      // Fetch collaborators
      const { data: collabData, error: collabError } = await supabase
        .from('project_collaborators')
        .select(`
          *,
          profiles:user_id (first_name, last_name, email)
        `)
        .eq('project_id', id);

      if (collabError) throw collabError;

      setCollaborators(collabData || []);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !inviteEmail.trim()) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Prevent inviting yourself
    if (inviteEmail.trim().toLowerCase() === user?.email?.toLowerCase()) {
      toast.error('You cannot invite yourself to the project');
      return;
    }

    try {
      setIsInviting(true);
      console.log('Inviting user:', { email: inviteEmail, role: inviteRole, projectId: id });
      
      const emailToSearch = inviteEmail.trim().toLowerCase();
      
      // First check if user exists - use case-insensitive search
      const { data: userProfile, error: userError } = await supabase
        .from('profiles')
        .select('id, email')
        .ilike('email', emailToSearch)
        .maybeSingle();

      if (userError) {
        console.error('Error checking user:', userError);
        throw userError;
      }

      console.log('User profile search result:', userProfile);

      if (!userProfile) {
        toast.error('User not found. Please make sure they have signed up first.');
        return;
      }

      // Check if user is already a collaborator
      const { data: existingCollab } = await supabase
        .from('project_collaborators')
        .select('id')
        .eq('project_id', id)
        .eq('user_id', userProfile.id)
        .maybeSingle();

      if (existingCollab) {
        toast.error('User is already a collaborator on this project');
        return;
      }

      // Add collaborator
      const { error: insertError } = await supabase
        .from('project_collaborators')
        .insert({
          project_id: id,
          user_id: userProfile.id,
          role: inviteRole,
          invited_by: user?.id,
        });

      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }

      toast.success(`Successfully invited ${inviteEmail} as ${inviteRole}`);
      setInviteEmail('');
      setInviteRole('viewer');
      await fetchProjectAndCollaborators();
    } catch (error: any) {
      console.error('Error inviting user:', error);
      toast.error(error.message || 'Failed to invite user. Please try again.');
    } finally {
      setIsInviting(false);
    }
  };

  const handleRemoveCollaborator = async (collaboratorId: string) => {
    if (!confirm('Are you sure you want to remove this collaborator?')) return;

    try {
      const { error } = await supabase
        .from('project_collaborators')
        .delete()
        .eq('id', collaboratorId);

      if (error) throw error;

      toast.success('Collaborator removed successfully');
      await fetchProjectAndCollaborators();
    } catch (error) {
      console.error('Error removing collaborator:', error);
      toast.error('Failed to remove collaborator');
    }
  };

  const updateCollaboratorRole = async (collaboratorId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('project_collaborators')
        .update({ role: newRole })
        .eq('id', collaboratorId);

      if (error) throw error;

      toast.success('Role updated successfully');
      await fetchProjectAndCollaborators();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Share Project</h1>
            <p className="text-sm text-gray-600">{project?.name}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-6">
          {/* Invite New Collaborator */}
          <Card>
            <CardHeader>
              <CardTitle>Invite Collaborator</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInviteUser} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="colleague@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                      disabled={isInviting}
                    />
                    <p className="text-xs text-gray-500">
                      Note: The user must already have an account to be invited.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={inviteRole} onValueChange={(value: any) => setInviteRole(value)} disabled={isInviting}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" disabled={isInviting || !inviteEmail.trim()}>
                  {isInviting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invitation
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Current Collaborators */}
          <Card>
            <CardHeader>
              <CardTitle>Current Collaborators ({collaborators.length + 1})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Project Owner */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{user?.email}</p>
                      <p className="text-sm text-gray-600">You</p>
                    </div>
                  </div>
                  <Badge>Owner</Badge>
                </div>

                {/* Collaborators */}
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {collaborator.profiles?.email?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="font-medium">
                          {collaborator.profiles?.first_name && collaborator.profiles?.last_name
                            ? `${collaborator.profiles.first_name} ${collaborator.profiles.last_name}`
                            : collaborator.profiles?.email || 'Unknown User'
                          }
                        </p>
                        <p className="text-sm text-gray-600">{collaborator.profiles?.email || 'No email'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={collaborator.role}
                        onValueChange={(value) => updateCollaboratorRole(collaborator.id, value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="viewer">Viewer</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCollaborator(collaborator.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {collaborators.length === 0 && (
                  <p className="text-gray-500 text-center py-8">
                    No collaborators yet. Invite team members to start collaborating!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
