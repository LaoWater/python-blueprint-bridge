# Admin Team Management System

## Overview

This document explains the comprehensive admin team management system that allows administrators (users with `admin_level > 0`) to fully manage project teams through an intuitive front-end interface.

## Features

### For Admins
- **Toggle Admin Edit Mode**: Beautiful toggle button to enter/exit admin mode
- **Create New Teams**: Add teams to any project with full customization
- **Edit Existing Teams**: Modify all team details including tasks, deliverables, and skills
- **Delete Teams**: Remove teams with safety checks (prevents deletion if team has members)
- **Real-time Updates**: All changes immediately sync with the database
- **Beautiful UI**: Seamless integration with existing design system

### For Regular Users
- **Zero Changes**: Regular users see NO CHANGES to their existing beautiful interface
- **Stable Experience**: All existing functionality preserved perfectly

## Architecture

### 1. Database Layer (`useGroupProjects` hook)

**Location**: `src/hooks/useGroupProjects.ts`

**New Functions Added**:

```typescript
// Update a team (admin only)
updateTeam(teamId: string, updates: Partial<ProjectTeam>): Promise<Result>

// Create a new team (admin only)
createTeam(projectId: string, teamData: TeamData): Promise<Result>

// Delete a team (admin only) - with safety checks
deleteTeam(teamId: string): Promise<Result>
```

**Safety Features**:
- Checks for active members before allowing deletion
- Updates `updated_at` timestamps automatically
- Optimistic local state updates for instant UI feedback
- Comprehensive error handling

### 2. Admin State Management (`useAdminTeamManagement` hook)

**Location**: `src/hooks/useAdminTeamManagement.ts`

**Purpose**: Reusable hook that encapsulates all admin team management logic

**State Managed**:
- `adminEditMode`: Whether admin edit mode is active
- `editorModalOpen`: Modal visibility state
- `editorMode`: 'create' or 'edit'
- `selectedTeamForEdit`: Currently editing team
- `deletingTeam`: Team currently being deleted

**Actions Provided**:
- `handleCreateTeam()`: Opens modal in create mode
- `handleEditTeam(team)`: Opens modal in edit mode
- `handleSaveTeam(teamId, data)`: Saves changes to database
- `handleDeleteTeam(teamId, name)`: Deletes team with confirmation
- `toggleAdminEditMode()`: Switches between view/edit modes

### 3. UI Components

#### TeamEditorModal (`src/components/group-projects/TeamEditorModal.tsx`)

**Purpose**: Comprehensive modal for creating/editing teams

**Features**:
- All team fields editable:
  - Basic: Name, Description, Mission, Icon
  - Settings: Max Members, Difficulty Stars, Sort Order
  - Visual: Color Scheme (6 preset gradient options)
  - Team Vibe: Custom tagline
  - Tasks: Dynamic list with add/remove
  - Deliverables: Dynamic list with add/remove
  - Required Skills: Tag-based skill management
- Form validation
- Keyboard shortcuts (Enter to add items)
- Beautiful gradient color scheme selector
- Error display
- Loading states
- Responsive design

#### AdminTeamControls (`src/components/group-projects/AdminTeamControls.tsx`)

**Purpose**: Reusable admin control buttons

**Components**:
- `AdminToggleButton`: Edit mode toggle
- `AdminCreateButton`: Create new team button
- `AdminCardButtons`: Edit/Delete buttons for team cards

**Usage Example**:
```tsx
// Header controls
<AdminTeamControls
  isAdmin={isAdmin}
  adminEditMode={adminEditMode}
  onToggleEditMode={toggleAdminEditMode}
  onCreateTeam={handleCreateTeam}
  // ... other props
/>

// Per-team card controls
<AdminTeamControls
  isAdmin={isAdmin}
  adminEditMode={adminEditMode}
  team={team}
  onEditTeam={handleEditTeam}
  onDeleteTeam={handleDeleteTeam}
  deletingTeam={deletingTeam}
/>
```

## Implementation Guide

### Step 1: Already Implemented (WellnessOracle)

The `WellnessOracle.tsx` component has been fully updated with admin functionality. It serves as the reference implementation.

### Step 2: Add to Other Projects (AIStudyBuddy, DJ Blue)

To add admin functionality to `AIStudyBuddy.tsx` or `dj_blue.tsx`:

1. **Add imports**:
```tsx
import { useAuth } from '../AuthContext';
import { toast } from 'sonner';
import TeamEditorModal from './TeamEditorModal';
import AdminTeamControls from './AdminTeamControls';
import { useAdminTeamManagement } from '@/hooks/useAdminTeamManagement';
import { Edit, Plus, Trash2, Settings } from 'lucide-react';
```

2. **Add hooks**:
```tsx
const { isAdmin } = useAuth();
const {
  adminEditMode,
  editorModalOpen,
  editorMode,
  selectedTeamForEdit,
  deletingTeam,
  handleCreateTeam,
  handleEditTeam,
  handleSaveTeam,
  handleDeleteTeam,
  toggleAdminEditMode,
  setEditorModalOpen
} = useAdminTeamManagement(yourProject?.id);
```

3. **Add admin controls in teams section** (after title, before team grid):
```tsx
{isAdmin && (
  <AdminTeamControls
    isAdmin={isAdmin}
    adminEditMode={adminEditMode}
    onToggleEditMode={toggleAdminEditMode}
    onCreateTeam={handleCreateTeam}
    onEditTeam={handleEditTeam}
    onDeleteTeam={handleDeleteTeam}
  />
)}
```

4. **Add edit/delete buttons to each team card** (at the beginning of team card div):
```tsx
{isAdmin && adminEditMode && (
  <AdminTeamControls
    isAdmin={isAdmin}
    adminEditMode={adminEditMode}
    team={team}
    onEditTeam={handleEditTeam}
    onDeleteTeam={handleDeleteTeam}
    deletingTeam={deletingTeam}
  />
)}
```

5. **Add modal at the end** (before closing div):
```tsx
<TeamEditorModal
  team={selectedTeamForEdit}
  projectId={yourProject?.id || ''}
  isOpen={editorModalOpen}
  onClose={() => setEditorModalOpen(false)}
  onSave={handleSaveTeam}
  mode={editorMode}
/>
```

## Database Schema

The `project_teams` table structure:

```sql
create table public.project_teams (
  id uuid primary key,
  project_id uuid not null,
  name varchar(255) not null,
  description text,
  icon varchar(50),
  color_scheme varchar(50),
  max_members integer default 5,
  current_members integer default 0,
  required_skills jsonb default '[]'::jsonb,
  difficulty_stars integer not null,
  mission text not null,
  tasks jsonb default '[]'::jsonb,
  deliverables jsonb default '[]'::jsonb,
  team_vibe text,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## Security Considerations

1. **Frontend Checks**: All admin UI is hidden from non-admin users
2. **Database Checks**: Database functions should verify `admin_level > 0`
3. **RLS Policies**: Consider adding Row Level Security policies:

```sql
-- Allow admins to update teams
CREATE POLICY "Admins can update teams"
ON project_teams
FOR UPDATE
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE admin_level > 0
  )
);

-- Allow admins to delete teams
CREATE POLICY "Admins can delete teams"
ON project_teams
FOR DELETE
USING (
  auth.uid() IN (
    SELECT id FROM profiles WHERE admin_level > 0
  )
);
```

## User Experience

### Admin Flow

1. **Enter Admin Mode**:
   - Click "Admin Edit Mode" button
   - Button turns orange/yellow gradient
   - "Create New Team" button appears
   - Edit/Delete buttons appear on each team card

2. **Create Team**:
   - Click "Create New Team"
   - Fill in form fields
   - Add tasks, deliverables, skills dynamically
   - Choose color scheme from presets
   - Click "Create Team"
   - Team appears in list immediately

3. **Edit Team**:
   - Click blue Edit button on team card
   - Modal opens with all current values
   - Modify any fields
   - Click "Save Changes"
   - Changes reflect immediately

4. **Delete Team**:
   - Click red Delete button
   - Confirmation dialog appears
   - If team has members, deletion is blocked
   - Otherwise, team is removed

5. **Exit Admin Mode**:
   - Click "Exit Admin Mode"
   - All edit controls disappear
   - UI returns to normal user view

### Regular User Flow

- **No Changes**: Users without admin privileges see the exact same interface
- **Performance**: No impact on load times or responsiveness
- **Stability**: All existing features work identically

## Testing Checklist

- [ ] Admin user can toggle edit mode on/off
- [ ] Create new team with all fields
- [ ] Edit existing team (all fields)
- [ ] Delete team without members
- [ ] Attempt to delete team with members (should fail)
- [ ] Regular user sees no admin controls
- [ ] All changes persist after page refresh
- [ ] Modal closes properly on save/cancel
- [ ] Form validation works
- [ ] Error handling displays appropriately
- [ ] Success toasts appear
- [ ] Optimistic updates work smoothly

## File Structure

```
src/
├── components/
│   └── group-projects/
│       ├── TeamEditorModal.tsx          # Main editing modal
│       ├── AdminTeamControls.tsx        # Reusable admin buttons
│       ├── WellnessOracle.tsx           # Reference implementation
│       ├── AIStudyBuddy.tsx             # To be updated
│       └── dj_blue.tsx                  # To be updated
├── hooks/
│   ├── useGroupProjects.ts              # Database operations
│   └── useAdminTeamManagement.ts        # Admin state management
└── components/
    └── AuthContext.tsx                  # Provides isAdmin flag
```

## Future Enhancements

Potential improvements:
1. **Drag-and-drop**: Reorder teams by dragging
2. **Bulk operations**: Select multiple teams for batch actions
3. **Team templates**: Save team configurations as templates
4. **History**: Track changes to teams over time
5. **Rich text**: Support markdown in descriptions
6. **Image upload**: Custom icons instead of emojis
7. **Team cloning**: Duplicate existing teams
8. **Import/Export**: JSON import/export for team configurations

## Troubleshooting

### Modal doesn't open
- Check that `editorModalOpen` state is being set
- Verify `TeamEditorModal` is rendered
- Check for z-index conflicts

### Changes don't persist
- Verify database functions are working
- Check Supabase client configuration
- Look for errors in browser console

### Delete fails even without members
- Check RLS policies on `project_participants` table
- Verify `status = 'active'` filter is correct
- Review database constraints

### Admin buttons don't show
- Verify user has `admin_level > 0` in profiles table
- Check `isAdmin` from `useAuth()`
- Ensure admin controls are inside conditional render

## Support

For issues or questions:
1. Check browser console for errors
2. Verify user admin level in database
3. Review Supabase logs for database errors
4. Check Network tab for failed requests

## Summary

This admin team management system provides a comprehensive, intuitive interface for managing project teams without requiring database access. It's designed to be:
- **Easy to use**: Familiar UI patterns
- **Safe**: Multiple safety checks
- **Fast**: Optimistic updates
- **Beautiful**: Seamless design integration
- **Maintainable**: Reusable components and hooks
- **Non-disruptive**: Zero impact on regular users
