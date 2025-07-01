
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Loader2 } from 'lucide-react';

interface InviteCollaboratorFormProps {
  onInvite: (email: string, role: 'viewer' | 'editor' | 'admin') => Promise<boolean>;
  isInviting: boolean;
}

export function InviteCollaboratorForm({ onInvite, isInviting }: InviteCollaboratorFormProps) {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'viewer' | 'editor' | 'admin'>('viewer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onInvite(inviteEmail, inviteRole);
    if (success) {
      setInviteEmail('');
      setInviteRole('viewer');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Collaborator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                Note: The user must already have an account and logged in at least once to complete their profile setup.
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
  );
}
