import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, AlertCircle } from 'lucide-react';
import { ProjectTeam } from '@/hooks/useGroupProjects';
import { Button } from '@/components/ui/button';

interface TeamEditorModalProps {
  team: ProjectTeam | null;
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (teamId: string | null, teamData: Partial<ProjectTeam>) => Promise<void>;
  mode: 'create' | 'edit';
}

export default function TeamEditorModal({
  team,
  projectId,
  isOpen,
  onClose,
  onSave,
  mode
}: TeamEditorModalProps) {
  const [formData, setFormData] = useState<Partial<ProjectTeam>>({
    name: '',
    description: '',
    icon: '',
    color_scheme: 'from-blue-500 to-purple-500',
    max_members: 5,
    difficulty_stars: 3,
    mission: '',
    tasks: [],
    deliverables: [],
    required_skills: [],
    team_vibe: '',
    sort_order: 0
  });

  const [taskInput, setTaskInput] = useState('');
  const [deliverableInput, setDeliverableInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form data when team changes
  useEffect(() => {
    if (team && mode === 'edit') {
      setFormData({
        name: team.name || '',
        description: team.description || '',
        icon: team.icon || '',
        color_scheme: team.color_scheme || 'from-blue-500 to-purple-500',
        max_members: team.max_members || 5,
        difficulty_stars: team.difficulty_stars || 3,
        mission: team.mission || '',
        tasks: team.tasks || [],
        deliverables: team.deliverables || [],
        required_skills: team.required_skills || [],
        team_vibe: team.team_vibe || '',
        sort_order: team.sort_order || 0
      });
    } else if (mode === 'create') {
      // Reset for create mode
      setFormData({
        name: '',
        description: '',
        icon: '',
        color_scheme: 'from-blue-500 to-purple-500',
        max_members: 5,
        difficulty_stars: 3,
        mission: '',
        tasks: [],
        deliverables: [],
        required_skills: [],
        team_vibe: '',
        sort_order: 0
      });
    }
  }, [team, mode, isOpen]);

  const handleSave = async () => {
    // Validation
    if (!formData.name || !formData.mission) {
      setError('Team name and mission are required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await onSave(team?.id || null, formData);
      onClose();
    } catch (err) {
      setError('Failed to save team. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addTask = () => {
    if (taskInput.trim()) {
      setFormData(prev => ({
        ...prev,
        tasks: [...(prev.tasks || []), taskInput.trim()]
      }));
      setTaskInput('');
    }
  };

  const removeTask = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tasks: (prev.tasks || []).filter((_, i) => i !== index)
    }));
  };

  const addDeliverable = () => {
    if (deliverableInput.trim()) {
      setFormData(prev => ({
        ...prev,
        deliverables: [...(prev.deliverables || []), deliverableInput.trim()]
      }));
      setDeliverableInput('');
    }
  };

  const removeDeliverable = (index: number) => {
    setFormData(prev => ({
      ...prev,
      deliverables: (prev.deliverables || []).filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        required_skills: [...(prev.required_skills || []), skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      required_skills: (prev.required_skills || []).filter((_, i) => i !== index)
    }));
  };

  if (!isOpen) return null;

  const colorSchemes = [
    { label: 'Blue-Purple', value: 'from-blue-500 to-purple-500' },
    { label: 'Purple-Pink', value: 'from-purple-500 to-pink-500' },
    { label: 'Green-Cyan', value: 'from-green-500 to-cyan-500' },
    { label: 'Orange-Red', value: 'from-orange-500 to-red-500' },
    { label: 'Indigo-Purple', value: 'from-indigo-500 to-purple-500' },
    { label: 'Pink-Rose', value: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4 border border-border dark:border-purple-500/30">
        {/* Header */}
        <div className="sticky top-0 bg-card dark:bg-slate-800 border-b border-border dark:border-purple-500/20 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-foreground">
            {mode === 'create' ? 'Create New Team' : 'Edit Team'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Form */}
        <div className="px-6 py-4 space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Team Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Data Harvesters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Icon (emoji)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., 🧠 or Brain"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[80px]"
              placeholder="Brief description of the team"
            />
          </div>

          {/* Mission */}
          <div>
            <label className="block text-sm font-medium mb-2">Mission *</label>
            <textarea
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              className="w-full px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[100px]"
              placeholder="What is this team's core mission?"
            />
          </div>

          {/* Settings Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Max Members</label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.max_members}
                onChange={(e) => setFormData({ ...formData, max_members: parseInt(e.target.value) || 5 })}
                className="w-full px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Difficulty (Stars)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.difficulty_stars}
                onChange={(e) => setFormData({ ...formData, difficulty_stars: parseInt(e.target.value) || 3 })}
                className="w-full px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sort Order</label>
              <input
                type="number"
                min="0"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium mb-2">Color Scheme</label>
            <div className="grid grid-cols-3 gap-2">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme.value}
                  onClick={() => setFormData({ ...formData, color_scheme: scheme.value })}
                  className={`px-3 py-2 rounded-lg border-2 transition-all ${
                    formData.color_scheme === scheme.value
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-border dark:border-slate-600 hover:border-purple-400'
                  }`}
                >
                  <div className={`h-6 rounded bg-gradient-to-r ${scheme.value} mb-1`}></div>
                  <span className="text-xs">{scheme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Team Vibe */}
          <div>
            <label className="block text-sm font-medium mb-2">Team Vibe</label>
            <input
              type="text"
              value={formData.team_vibe}
              onChange={(e) => setFormData({ ...formData, team_vibe: e.target.value })}
              className="w-full px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., 'Data Wizards Unite!' or 'Building the Future'"
            />
          </div>

          {/* Tasks */}
          <div>
            <label className="block text-sm font-medium mb-2">Tasks</label>
            <div className="space-y-2">
              {(formData.tasks || []).map((task, index) => (
                <div key={index} className="flex items-center gap-2 bg-secondary dark:bg-slate-700 px-3 py-2 rounded-lg">
                  <span className="flex-1 text-sm">{task}</span>
                  <button
                    onClick={() => removeTask(index)}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  className="flex-1 px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add a task..."
                />
                <Button onClick={addTask} size="sm" className="bg-purple-500 hover:bg-purple-600">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <label className="block text-sm font-medium mb-2">Deliverables</label>
            <div className="space-y-2">
              {(formData.deliverables || []).map((deliverable, index) => (
                <div key={index} className="flex items-center gap-2 bg-secondary dark:bg-slate-700 px-3 py-2 rounded-lg">
                  <span className="flex-1 text-sm">{deliverable}</span>
                  <button
                    onClick={() => removeDeliverable(index)}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={deliverableInput}
                  onChange={(e) => setDeliverableInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addDeliverable()}
                  className="flex-1 px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add a deliverable..."
                />
                <Button onClick={addDeliverable} size="sm" className="bg-purple-500 hover:bg-purple-600">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-medium mb-2">Required Skills</label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {(formData.required_skills || []).map((skill, index) => (
                  <div key={index} className="flex items-center gap-1 bg-secondary dark:bg-slate-700 px-3 py-1 rounded-full">
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={() => removeSkill(index)}
                      className="p-0.5 hover:bg-red-500/20 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-3 py-2 bg-secondary dark:bg-slate-700 border border-border dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add a required skill..."
                />
                <Button onClick={addSkill} size="sm" className="bg-purple-500 hover:bg-purple-600">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card dark:bg-slate-800 border-t border-border dark:border-purple-500/20 px-6 py-4 flex items-center justify-end gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !formData.name || !formData.mission}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            {saving ? (
              'Saving...'
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {mode === 'create' ? 'Create Team' : 'Save Changes'}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
