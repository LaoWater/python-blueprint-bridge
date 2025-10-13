# Apply Admin Logic to DJ Blue - Quick Reference

## Changes needed (same as AI Study Buddy):

### 1. Add imports (top of file):
```typescript
import { useAuth } from '../AuthContext';
import { toast } from 'sonner';
import TeamEditorModal from './TeamEditorModal';
import { ProjectTeam } from '@/hooks/useGroupProjects';
import { Edit, Plus, Trash2, Settings } from 'lucide-react';
```

### 2. Add admin state (after existing useState):
```typescript
// Admin state
const [adminEditMode, setAdminEditMode] = useState(false);
const [editorModalOpen, setEditorModalOpen] = useState(false);
const [editorMode, setEditorMode] = useState<'create' | 'edit'>('edit');
const [selectedTeamForEdit, setSelectedTeamForEdit] = useState<ProjectTeam | null>(null);
const [deletingTeam, setDeletingTeam] = useState<string | null>(null);
```

### 3. Update useGroupProjects destructuring:
```typescript
const { projects, teams, teamsWithMembers, fetchTeamsWithMembers, joinTeam, leaveTeam, getUserTeams, updateTeam, createTeam, deleteTeam, loading, error } = useGroupProjects();
const { isAdmin, profile } = useAuth();
```

### 4. Add admin handler functions (after getTeamStatus):
```typescript
// Admin handlers
const handleCreateTeam = () => {
  setEditorMode('create');
  setSelectedTeamForEdit(null);
  setEditorModalOpen(true);
};

const handleEditTeam = (team: ProjectTeam) => {
  setEditorMode('edit');
  setSelectedTeamForEdit(team);
  setEditorModalOpen(true);
};

const handleSaveTeam = async (teamId: string | null, teamData: Partial<ProjectTeam>) => {
  if (!djBlueProject?.id) return;

  try {
    if (teamId) {
      const result = await updateTeam(teamId, teamData);
      if (result.success) {
        toast.success('Team updated successfully!');
        fetchTeamsWithMembers(djBlueProject.id);
        setEditorModalOpen(false);
      } else {
        toast.error('Failed to update team');
      }
    } else {
      const result = await createTeam(djBlueProject.id, teamData as any);
      if (result.success) {
        toast.success('Team created successfully!');
        fetchTeamsWithMembers(djBlueProject.id);
        setEditorModalOpen(false);
      } else {
        toast.error('Failed to create team');
      }
    }
  } catch (err) {
    toast.error('An error occurred while saving the team');
  }
};

const handleDeleteTeam = async (teamId: string, teamName: string) => {
  if (!confirm(`Are you sure you want to delete "${teamName}"? This action cannot be undone.`)) {
    return;
  }

  setDeletingTeam(teamId);
  try {
    const result = await deleteTeam(teamId);
    if (result.success) {
      toast.success('Team deleted successfully');
      if (djBlueProject?.id) {
        fetchTeamsWithMembers(djBlueProject.id);
      }
    } else {
      toast.error(result.error || 'Failed to delete team');
    }
  } catch (err) {
    toast.error('An error occurred while deleting the team');
  } finally {
    setDeletingTeam(null);
  }
};
```

### 5. Add admin controls UI (after teams section title, before team grid):
```typescript
{/* Admin Controls */}
{isAdmin && (
  <div className="mb-6 flex flex-col items-center justify-center gap-3">
    <button
      onClick={() => {
        setAdminEditMode(!adminEditMode);
        console.log('🔧 Admin Edit Mode toggled:', !adminEditMode);
      }}
      className={`flex items-center gap-2 px-8 py-4 rounded-full transition-all duration-300 font-bold text-lg ${
        adminEditMode
          ? 'bg-gradient-to-r from-yellow-500/80 to-orange-500/80 text-white shadow-lg shadow-yellow-500/20'
          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg'
      }`}
    >
      <Settings className="w-6 h-6" />
      {adminEditMode ? '✓ ADMIN MODE ACTIVE - Click to Exit' : '🔓 Click to Enable Admin Edit Mode'}
    </button>
    {!adminEditMode && (
      <p className="text-sm text-muted-foreground dark:text-gray-400 italic">
        👆 Click the button above to show Edit/Delete buttons on team cards
      </p>
    )}

    {adminEditMode && (
      <>
        <button
          onClick={handleCreateTeam}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/30 font-semibold transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Create New Team
        </button>
        <div className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
          <p className="text-sm text-green-300 font-semibold">
            ✓ Admin Mode Active: Edit (blue) and Delete (red) buttons now visible on each team card below
          </p>
        </div>
      </>
    )}
  </div>
)}
```

### 6. Add edit/delete buttons to each team card (after the background gradient div):
```typescript
{/* Admin Edit/Delete Controls */}
{isAdmin && adminEditMode && (
  <div className="absolute top-3 right-3 z-20 flex gap-2">
    <button
      onClick={() => handleEditTeam(team)}
      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors duration-200"
      title="Edit Team"
    >
      <Edit className="w-4 h-4" />
    </button>
    <button
      onClick={() => handleDeleteTeam(team.id, team.name)}
      disabled={deletingTeam === team.id}
      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete Team"
    >
      {deletingTeam === team.id ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  </div>
)}
```

### 7. Add modal before closing div at end of component:
```typescript
{/* Team Editor Modal */}
<TeamEditorModal
  team={selectedTeamForEdit}
  projectId={djBlueProject?.id || ''}
  isOpen={editorModalOpen}
  onClose={() => setEditorModalOpen(false)}
  onSave={handleSaveTeam}
  mode={editorMode}
/>
```

## Note: Replace 'djBlueProject' with whatever variable name is used in the file for the project
