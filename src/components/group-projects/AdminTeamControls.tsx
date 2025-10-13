import React from 'react';
import { Edit, Trash2, Plus, Settings } from 'lucide-react';
import { ProjectTeam } from '@/hooks/useGroupProjects';

interface AdminTeamControlsProps {
  isAdmin: boolean;
  adminEditMode: boolean;
  onToggleEditMode: () => void;
  onCreateTeam: () => void;
  onEditTeam: (team: ProjectTeam) => void;
  onDeleteTeam: (teamId: string, teamName: string) => void;
  team?: ProjectTeam;
  deletingTeam?: string | null;
  showToggle?: boolean;
  showCreate?: boolean;
}

export function AdminToggleButton({
  adminEditMode,
  onToggle
}: {
  adminEditMode: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-semibold ${
        adminEditMode
          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30'
          : 'bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 text-foreground border border-border dark:border-slate-600'
      }`}
    >
      <Settings className="w-5 h-5" />
      {adminEditMode ? 'Exit Admin Mode' : 'Admin Edit Mode'}
    </button>
  );
}

export function AdminCreateButton({
  onCreate
}: {
  onCreate: () => void;
}) {
  return (
    <button
      onClick={onCreate}
      className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg shadow-green-500/30 font-semibold transition-all duration-300"
    >
      <Plus className="w-5 h-5" />
      Create New Team
    </button>
  );
}

export function AdminCardButtons({
  team,
  onEdit,
  onDelete,
  deletingTeam
}: {
  team: ProjectTeam;
  onEdit: (team: ProjectTeam) => void;
  onDelete: (teamId: string, teamName: string) => void;
  deletingTeam?: string | null;
}) {
  return (
    <div className="absolute top-3 right-3 z-20 flex gap-2">
      <button
        onClick={() => onEdit(team)}
        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-colors duration-200"
        title="Edit Team"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => onDelete(team.id, team.name)}
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
  );
}

export default function AdminTeamControls({
  isAdmin,
  adminEditMode,
  onToggleEditMode,
  onCreateTeam,
  onEditTeam,
  onDeleteTeam,
  team,
  deletingTeam,
  showToggle = true,
  showCreate = true
}: AdminTeamControlsProps) {
  if (!isAdmin) return null;

  // If team is provided, render card buttons
  if (team) {
    if (!adminEditMode) return null;
    return (
      <AdminCardButtons
        team={team}
        onEdit={onEditTeam}
        onDelete={onDeleteTeam}
        deletingTeam={deletingTeam}
      />
    );
  }

  // Otherwise, render header controls
  return (
    <div className="mb-6 flex items-center justify-center gap-4">
      {showToggle && (
        <AdminToggleButton
          adminEditMode={adminEditMode}
          onToggle={onToggleEditMode}
        />
      )}

      {adminEditMode && showCreate && (
        <AdminCreateButton onCreate={onCreateTeam} />
      )}
    </div>
  );
}
