import React, { useState, useEffect, useRef } from 'react';
import { Users, Rocket, Brain, Code, Globe, ChevronRight, ChevronLeft, Star, GitBranch, MessageSquare, Target, Loader2, Heart, BookOpen, Trophy, Medal, Award, Copy, CheckCircle2 } from 'lucide-react';
import MoodMusicProject from '../components/group-projects/dj_blue';
import WellnessOracle from '../components/group-projects/WellnessOracle';
import AIStudyBuddy from '../components/group-projects/AIStudyBuddy';
import TeamCard from '../components/group-projects/TeamCard';
import UserTeamsDisplay from '../components/group-projects/UserTeamsDisplay';
import ProjectVoting from '../components/group-projects/ProjectVoting';
import { GroupProjectProvider } from '../contexts/GroupProjectContext';
import { useGroupProjects } from '../hooks/useGroupProjects';
import { useAuth } from '../components/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type GitCommand = {
  label: string;
  value: string;
  hint?: string;
};

type GitStep = {
  id: string;
  title: string;
  description: string;
  commands?: GitCommand[];
  note?: string;
};

const TEAM_LEAD_STEPS: GitStep[] = [
  {
    id: 'lead-fork',
    title: 'Fork and Clone Your Base',
    description: 'Fork the main repository on GitHub, then clone your fork locally so you can manage reviewer-ready pull requests.',
    commands: [
      {
        label: 'Clone your fork',
        value: 'git clone https://github.com/<your-github-username>/python-blueprint-bridge.git',
      },
      {
        label: 'Open the project folder',
        value: 'cd python-blueprint-bridge',
      },
    ],
    note: 'Fork once per sprint. Keep your fork clean so collaborators always pull from a stable main branch.',
  },
  {
    id: 'lead-upstream',
    title: 'Track the Main Upstream',
    description: 'Connect your fork to the official upstream repository so you can pull new changes from the source team.',
    commands: [
      {
        label: 'Add upstream remote',
        value: 'git remote add upstream https://github.com/<main-org>/python-blueprint-bridge.git',
      },
      {
        label: 'Verify remotes',
        value: 'git remote -v',
        hint: 'Expect to see origin (your fork) and upstream (main repository).',
      },
    ],
    note: 'If the upstream remote already exists, move on—running the command twice will throw an error.',
  },
  {
    id: 'lead-sync',
    title: 'Stay in Sync Before Working',
    description: 'Start every work block by syncing both your fork and the upstream main branch.',
    commands: [
      {
        label: 'Pull latest from your fork',
        value: 'git pull origin main',
      },
      {
        label: 'Fetch upstream updates',
        value: 'git fetch upstream',
      },
      {
        label: 'Merge upstream main into local',
        value: 'git pull upstream main',
        hint: 'Resolve conflicts locally, then run git push origin main to refresh your fork for the team.',
      },
    ],
    note: 'Keeping origin/main current means developers always pull a clean baseline.',
  },
  {
    id: 'lead-pr',
    title: 'Ship Features with Pull Requests',
    description: 'Keep work on feature branches so you can push to your fork and request a pull into the upstream repository.',
    commands: [
      {
        label: 'Create a feature branch',
        value: 'git checkout -b feature/<task-name>',
      },
      {
        label: 'Push your branch to your fork',
        value: 'git push -u origin feature/<task-name>',
      },
      {
        label: 'Raise the pull request',
        value: 'Open a PR from origin/feature/<task-name> into upstream/main',
        hint: 'Use the GitHub UI if you do not have the GitHub CLI installed.',
      },
    ],
    note: 'Confirm your branch is merged into origin/main before syncing upstream again.',
  },
];

const GROUP_A_STEPS: GitStep[] = [
  {
    id: 'dev-clone',
    title: 'Clone the Team Lead Fork',
    description: 'Your team lead adds you as a collaborator on their fork. Work directly against that fork to stay in sync.',
    commands: [
      {
        label: 'Clone the team fork',
        value: 'git clone https://github.com/<team-lead-username>/python-blueprint-bridge.git',
      },
      {
        label: 'Move into the project',
        value: 'cd python-blueprint-bridge',
      },
    ],
    note: 'If you already have the repo, run git remote -v to verify origin points to the team lead fork.',
  },
  {
    id: 'dev-branch',
    title: 'Create a Branch Per Task',
    description: 'Keep your changes isolated per feature so reviews are focused and easy to merge.',
    commands: [
      {
        label: 'Start your feature branch',
        value: 'git checkout -b feature/<your-task>',
      },
    ],
    note: 'Avoid committing directly to main—feature branches keep history clean.',
  },
  {
    id: 'dev-sync',
    title: 'Sync Often from Team Lead Main',
    description: 'Pull from origin/main (the team fork) at least once each work session to catch teammates’ changes.',
    commands: [
      {
        label: 'Grab latest commits',
        value: 'git pull origin main',
        hint: 'Run this while on your feature branch to merge in the newest baseline. Use --rebase if your team prefers linear history.',
      },
    ],
    note: 'Resolve conflicts locally and coordinate quickly so the team main branch never drifts.',
  },
  {
    id: 'dev-push',
    title: 'Push Back Into the Team Fork',
    description: 'Ship your branch to the shared fork so the team lead can review or merge.',
    commands: [
      {
        label: 'Push your branch',
        value: 'git push -u origin feature/<your-task>',
      },
      {
        label: 'Share the branch for review',
        value: 'Create a pull request into origin/main on GitHub',
        hint: 'Tag your team lead and outline the changes so they can merge upstream.',
      },
    ],
    note: 'Once merged, sync your branch again or delete it locally with git branch -d feature/<your-task>.',
  },
];

const FOUNDATION_COMMANDS: GitCommand[] = [
  {
    label: 'Check your current status',
    value: 'git status',
  },
  {
    label: 'Stage everything in the working directory',
    value: 'git add .',
    hint: 'Use git add <file> for precise staging when you do not want to commit everything.',
  },
  {
    label: 'Commit staged changes',
    value: 'git commit -m "feat: describe the change"',
    hint: 'Follow the team convention: area: summary in present tense.',
  },
  {
    label: 'List files Git already tracks',
    value: 'git ls-files',
    hint: 'Verify whether a file bypassed .gitignore before adding overrides.',
  },
  {
    label: 'Push the active branch',
    value: 'git push origin <branch-name>',
  },
];

const DAILY_HABITS = [
  'Run git status before and after each work session.',
  'Pull from the correct remote (origin for team fork, upstream for main repo) before coding.',
  'Commit small, meaningful chunks so reviews move fast.',
  'Double-check .gitignore before adding new tools or generated files.',
];

const GITIGNORE_SNIPPET = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

.env`;

export default function GroupProjects() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [gitModalOpen, setGitModalOpen] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [gitDialogTab, setGitDialogTab] = useState<'teamLead' | 'developers' | 'essentials'>('teamLead');
  const { projects, teams, loading, error, fetchTeams, clearError } = useGroupProjects();
  const { user } = useAuth();
  const teamsFetchedRef = useRef<Set<string>>(new Set());
  const copyTimeoutRef = useRef<number | null>(null);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      setCopiedCommand(value);
      toast.success('Copied to clipboard');
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopiedCommand(null);
        copyTimeoutRef.current = null;
      }, 2000);
    } catch {
      toast.error('Copy failed. You can copy the command manually.');
    }
  };

  const handleGitModalChange = (open: boolean) => {
    setGitModalOpen(open);
    if (!open) {
      setGitDialogTab('teamLead');
      setCopiedCommand(null);
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = null;
      }
    }
  };

  const renderCommandRow = (command: GitCommand) => (
    <div
      key={`${command.label}-${command.value}`}
      className="flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-secondary/40 px-4 py-3"
    >
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{command.label}</p>
        <code className="block break-all font-mono text-xs md:text-sm text-muted-foreground">{command.value}</code>
        {command.hint && <p className="text-xs text-muted-foreground">{command.hint}</p>}
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Copy ${command.label}`}
        onClick={() => handleCopy(command.value)}
        className="mt-1 shrink-0 text-muted-foreground hover:text-primary"
      >
        {copiedCommand === command.value ? (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  const handleTabChange = (value: string) =>
    setGitDialogTab(value as 'teamLead' | 'developers' | 'essentials');

  // Auto-select first project - only once
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      const firstProject = projects[0];
      setSelectedProject(firstProject.id);
    }
  }, [projects.length]); // Only depend on length

  // Fetch teams only when needed and not already fetched
  useEffect(() => {
    if (selectedProject && !teamsFetchedRef.current.has(selectedProject)) {
      if (activeView === 'overview' || activeView === 'philosophy' || 
          activeView === 'wellness-oracle' || activeView === 'ai-study-buddy' || 
          activeView === 'dj-blue') {
        fetchTeams(selectedProject);
        teamsFetchedRef.current.add(selectedProject);
      }
    }
  }, [selectedProject, activeView]); // Controlled dependencies

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = null;
      }
    };
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-accent/10 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 text-foreground pb-20 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-blue-600/20 dark:to-purple-600/20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <Dialog open={gitModalOpen} onOpenChange={handleGitModalChange}>
            <div className="mb-10 flex justify-end">
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="group flex items-center gap-2 rounded-full border-primary/40 bg-white/80 px-5 py-2 text-primary shadow-lg transition hover:border-primary hover:bg-white dark:border-blue-500/40 dark:bg-slate-900/70 dark:text-blue-200"
                >
                  <GitBranch className="h-4 w-4 transition-transform group-hover:rotate-6" />
                  <span className="text-sm font-semibold tracking-wide">GIT Blueprints</span>
                </Button>
              </DialogTrigger>
            </div>
            <DialogContent className="max-w-4xl sm:max-w-3xl max-h-[85vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <GitBranch className="h-5 w-5 text-primary" />
                  Git Blueprints
                </DialogTitle>
                <DialogDescription>
                  Role-specific workflows to keep forks, branches, and pull requests aligned for this group project.
                </DialogDescription>
              </DialogHeader>
              <Tabs value={gitDialogTab} onValueChange={handleTabChange} className="flex h-full w-full flex-col overflow-hidden">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="teamLead">Team Leads</TabsTrigger>
                  <TabsTrigger value="developers">Group A Developers</TabsTrigger>
                  <TabsTrigger value="essentials">Essentials</TabsTrigger>
                </TabsList>
                <TabsContent value="teamLead" className="space-y-4 overflow-y-auto pr-2 max-h-[55vh]">
                  <Accordion type="single" collapsible className="space-y-3">
                    {TEAM_LEAD_STEPS.map((step) => (
                      <AccordionItem
                        key={step.id}
                        value={step.id}
                        className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur"
                      >
                        <AccordionTrigger className="px-4 py-3 text-left text-base font-semibold">
                          {step.title}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-0">
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            {step.commands?.map(renderCommandRow)}
                            {step.note && (
                              <div className="rounded-xl border border-dashed border-primary/40 bg-primary/10 px-4 py-3 text-xs text-primary">
                                {step.note}
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                <TabsContent value="developers" className="space-y-4 overflow-y-auto pr-2 max-h-[55vh]">
                  <Accordion type="single" collapsible className="space-y-3">
                    {GROUP_A_STEPS.map((step) => (
                      <AccordionItem
                        key={step.id}
                        value={step.id}
                        className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur"
                      >
                        <AccordionTrigger className="px-4 py-3 text-left text-base font-semibold">
                          {step.title}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-0">
                          <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            {step.commands?.map(renderCommandRow)}
                            {step.note && (
                              <div className="rounded-xl border border-dashed border-primary/40 bg-primary/10 px-4 py-3 text-xs text-primary">
                                {step.note}
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                <TabsContent value="essentials" className="space-y-4 overflow-y-auto pr-2 max-h-[55vh]">
                  <div className="space-y-3 rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur">
                    <h3 className="text-lg font-semibold text-foreground">Daily Git Rhythm</h3>
                    <div className="space-y-3">
                      {FOUNDATION_COMMANDS.map(renderCommandRow)}
                    </div>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Project .gitignore</h3>
                        <p className="text-sm text-muted-foreground">
                          Keep generated files out of version control. This snippet matches the root .gitignore in the repo.
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Copy .gitignore snippet"
                        onClick={() => handleCopy(GITIGNORE_SNIPPET)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {copiedCommand === GITIGNORE_SNIPPET ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <pre className="max-h-64 overflow-y-auto whitespace-pre rounded-xl bg-secondary/40 p-4 text-xs leading-relaxed text-muted-foreground">
                      {GITIGNORE_SNIPPET}
                    </pre>
                  </div>
                  <div className="space-y-2 rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur">
                    <h3 className="text-lg font-semibold text-foreground">Habits that keep reviews smooth</h3>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {DAILY_HABITS.map((habit) => (
                        <li key={habit}>{habit}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter className="items-center justify-between gap-4 border-t border-border/60 pt-4">
                <span className="text-xs text-muted-foreground">
                  Tip: run git status before you code and before you push to catch surprises early.
                </span>
                <Button variant="outline" asChild>
                  <a href="/git-blueprints" target="_blank" rel="noreferrer" className="no-underline">
                    Open full Git guide
                  </a>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Group Projects
            </h1>
            <p className="text-2xl text-primary dark:text-blue-200 mb-4">
              Stepping into the Real World
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Where algorithms meet human collaboration. Here we learn the most crucial skill:
              <span className="text-primary dark:text-blue-300 font-semibold"> working with other programmers</span> to build something bigger than any individual could create alone.
            </p>
          </div>
        </div>
      </div>

      {/* Project Navigation - Subtle & Beautiful */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-card/60 to-card/40 dark:from-slate-800/40 dark:to-slate-700/40 backdrop-blur-md rounded-2xl border border-border dark:border-slate-600/30 p-2 transition-colors duration-300">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveView('wellness-oracle')}
              className={`group relative px-4 py-3 rounded-xl transition-all duration-300 ${
                activeView === 'wellness-oracle'
                  ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 shadow-lg shadow-pink-500/20'
                  : 'hover:bg-secondary dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Heart className={`w-4 h-4 ${activeView === 'wellness-oracle' ? 'text-pink-500 dark:text-pink-400' : 'text-muted-foreground dark:text-slate-400 group-hover:text-pink-500 dark:group-hover:text-pink-400'} transition-colors`} />
                <span className={`text-sm font-medium ${activeView === 'wellness-oracle' ? 'text-pink-600 dark:text-pink-300' : 'text-foreground dark:text-slate-300 group-hover:text-pink-600 dark:group-hover:text-pink-300'} transition-colors`}>
                  Wellness Oracle
                </span>
              </div>
              {activeView === 'wellness-oracle' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveView('ai-study-buddy')}
              className={`group relative px-4 py-3 rounded-xl transition-all duration-300 ${
                activeView === 'ai-study-buddy'
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 shadow-lg shadow-blue-500/20'
                  : 'hover:bg-secondary dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <BookOpen className={`w-4 h-4 ${activeView === 'ai-study-buddy' ? 'text-blue-500 dark:text-blue-400' : 'text-muted-foreground dark:text-slate-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'} transition-colors`} />
                <span className={`text-sm font-medium ${activeView === 'ai-study-buddy' ? 'text-blue-600 dark:text-blue-300' : 'text-foreground dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-300'} transition-colors`}>
                  AI Study Buddy
                </span>
              </div>
              {activeView === 'ai-study-buddy' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              )}
            </button>

            <button
              onClick={() => setActiveView('dj-blue')}
              className={`group relative px-4 py-3 rounded-xl transition-all duration-300 ${
                activeView === 'dj-blue'
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 shadow-lg shadow-indigo-500/20'
                  : 'hover:bg-secondary dark:hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Rocket className={`w-4 h-4 ${activeView === 'dj-blue' ? 'text-indigo-500 dark:text-indigo-400' : 'text-muted-foreground dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'} transition-colors`} />
                <span className={`text-sm font-medium ${activeView === 'dj-blue' ? 'text-indigo-600 dark:text-indigo-300' : 'text-foreground dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-300'} transition-colors`}>
                  DJ BlueAI
                </span>
              </div>
              {activeView === 'dj-blue' && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeView === 'overview'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 text-white'
                : 'bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 text-foreground'
            }`}
          >
            <Globe className="inline mr-2" size={20} />
            Real World Skills
          </button>
          <button
            onClick={() => setActiveView('philosophy')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeView === 'philosophy'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 text-white'
                : 'bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 text-foreground'
            }`}
          >
            <Brain className="inline mr-2" size={20} />
            Collaboration Art
          </button>
          <button
            onClick={() => setActiveView('leaderboard')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeView === 'leaderboard'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50 text-white'
                : 'bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 text-foreground'
            }`}
          >
            <Trophy className="inline mr-2" size={20} />
            Community Vote
          </button>
        </div>
      </div>

      {/* Overview Section */}
      {activeView === 'overview' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-card/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-border dark:border-blue-500/20 transition-colors duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Team Dynamics</h3>
                <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">
                  Learn to divide complex problems into manageable pieces that different people can own.
                  Master the art of clear communication between code components.
                </p>
              </div>

              <div className="bg-card/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-border dark:border-purple-500/20 transition-colors duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <GitBranch className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-purple-300">Code Integration</h3>
                <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">
                  Discover how individual algorithms connect to form complete systems.
                  Experience the magic when separate components work together seamlessly.
                </p>
              </div>

              <div className="bg-card/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-border dark:border-green-500/20 transition-colors duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-green-300">Real Impact</h3>
                <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">
                  Build projects that solve actual problems. Learn to think beyond algorithms
                  and consider user experience, maintainability, and real-world constraints.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-border dark:border-blue-500/30 mb-12 transition-colors duration-300">
              <h3 className="text-3xl font-bold mb-6 text-center">🎯 The Art of Programming Evolution</h3>

              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-4">🧠</div>
                  <h4 className="text-xl font-bold mb-3 text-blue-300">Individual Mastery</h4>
                  <p className="text-muted-foreground dark:text-slate-300">Algorithms, data structures, and pattern recognition form your foundation.</p>
                </div>

                <div className="flex items-center justify-center">
                  <ChevronRight className="w-8 h-8 text-blue-400" />
                </div>

                <div>
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-xl font-bold mb-3 text-purple-300">Collective Creation</h4>
                  <p className="text-muted-foreground dark:text-slate-300">Combining minds to build systems that change the world.</p>
                </div>
              </div>
            </div>

            {/* Group Projects Cards */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-6 text-center text-blue-300">🚀 Jump Into Real Projects</h3>
              <p className="text-center text-xl text-muted-foreground dark:text-slate-300 mb-8">
                Ready to apply your skills? Join a team and start building
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Wellness Oracle Card */}
                <div
                  onClick={() => setActiveView('wellness-oracle')}
                  className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-pink-300">Personal Wellness Oracle</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      AI companion that discovers patterns in daily diary entries and guides optimal living through holistic understanding.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-purple-300">
                      <span>Join Teams</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* AI Study Buddy Card */}
                <div
                  onClick={() => setActiveView('ai-study-buddy')}
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-blue-300">AI Study Buddy</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      Personalized learning companion that adapts to your pace, identifies knowledge gaps, and creates optimal study paths.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-cyan-300">
                      <span>Join Teams</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* DJ Blue Card */}
                <div
                  onClick={() => setActiveView('dj-blue')}
                  className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-indigo-300">DJ BlueAI</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      Mood-adaptive music assistant that reads emotional state and curates perfect soundscapes for any moment.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-purple-300">
                      <span>Join Teams</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Philosophy Section */}
      {activeView === 'philosophy' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-border dark:border-blue-500/20 transition-colors duration-300">
              <h2 className="text-4xl font-bold mb-8 text-center text-blue-300">The Collaboration Mindset</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="text-4xl">🧩</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-purple-300">Think in Components</h3>
                    <p className="text-muted-foreground dark:text-slate-300 text-lg leading-relaxed">
                      Every complex system is built from simple, well-defined pieces. Learn to break problems down
                      so that each person can focus on their expertise while trusting others with theirs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="text-4xl">🔗</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-blue-300">Design Clear Interfaces</h3>
                    <p className="text-muted-foreground dark:text-slate-300 text-lg leading-relaxed">
                      The magic happens at the boundaries. How components talk to each other determines
                      whether your system flows like poetry or crashes like chaos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="text-4xl">💝</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-green-300">Trust and Verification</h3>
                    <p className="text-muted-foreground dark:text-slate-300 text-lg leading-relaxed">
                      Great teams trust each other's code while building systems to verify everything works.
                      It's not about doubt—it's about creating confidence through good engineering.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="text-4xl">✨</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-pink-300">Emergence Over Control</h3>
                    <p className="text-muted-foreground dark:text-slate-300 text-lg leading-relaxed">
                      The best systems emerge from good principles rather than rigid control.
                      Set clear patterns, then let creativity flourish within those boundaries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Group Projects Cards */}
            <div className="mb-8">
              <h3 className="text-3xl font-bold mb-6 text-center text-purple-300">🚀 Apply These Principles</h3>
              <p className="text-center text-xl text-muted-foreground dark:text-slate-300 mb-8">
                Choose a project below to see collaboration in action
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Wellness Oracle Card */}
                <div
                  onClick={() => setActiveView('wellness-oracle')}
                  className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-pink-300">Personal Wellness Oracle</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      AI life coach that understands your patterns and guides you toward optimal living through deep biological intelligence.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-purple-300">
                      <span>Explore Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* AI Study Buddy Card */}
                <div
                  onClick={() => setActiveView('ai-study-buddy')}
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-blue-300">AI Study Buddy</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      Personalized learning companion that adapts to your pace, identifies knowledge gaps, and creates optimal study paths.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-cyan-300">
                      <span>Explore Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* DJ Blue Card */}
                <div
                  onClick={() => setActiveView('dj-blue')}
                  className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/20 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-indigo-300">DJ BlueAI</h4>
                    <p className="text-muted-foreground dark:text-slate-300 text-sm mb-4">
                      Mood-adaptive music assistant that reads your emotional state and curates perfect soundscapes for any moment.
                    </p>
                    <div className="flex justify-center items-center gap-2 text-sm text-purple-300">
                      <span>Explore Project</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-8 border border-border dark:border-purple-500/30 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-4 text-center text-purple-300">Remember: Programming is a Social Art</h3>
              <p className="text-center text-xl text-muted-foreground dark:text-slate-300">
                The most beautiful code is not just elegant—it's <span className="text-purple-300 font-semibold">understandable, maintainable, and collaborative</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Section */}
      {activeView === 'leaderboard' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 text-yellow-300">🏆 Community Leaderboard</h2>
              <p className="text-xl text-muted-foreground dark:text-slate-300">
                Vote for the projects you want to see prioritized! Each user gets one vote per project.
              </p>
            </div>

            <div className="space-y-6">
              {projects
                .sort((a, b) => (b.vote_score || 0) - (a.vote_score || 0))
                .map((project, index) => {
                  const getRankIcon = () => {
                    if (index === 0) return <Trophy className="w-8 h-8 text-yellow-400" />;
                    if (index === 1) return <Medal className="w-8 h-8 text-gray-300" />;
                    if (index === 2) return <Award className="w-8 h-8 text-orange-400" />;
                    return <div className="w-8 h-8 bg-secondary dark:bg-slate-600 rounded-full flex items-center justify-center text-muted-foreground dark:text-slate-300 font-bold">#{index + 1}</div>;
                  };

                  const getRankClass = () => {
                    if (index === 0) return 'border-yellow-400/30 bg-yellow-400/5';
                    if (index === 1) return 'border-gray-300/30 bg-gray-300/5';
                    if (index === 2) return 'border-orange-400/30 bg-orange-400/5';
                    return 'border-border dark:border-slate-600/30 bg-card/20 dark:bg-slate-800/20';
                  };

                  return (
                    <div key={project.id} className={`bg-card/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border-2 ${getRankClass()} transition-colors duration-300`}>
                      <div className="flex items-start gap-6">
                        <div className="flex flex-col items-center gap-2">
                          {getRankIcon()}
                          <span className="text-2xl font-bold text-muted-foreground dark:text-slate-300">#{index + 1}</span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold mb-2 text-foreground dark:text-slate-100">{project.name}</h3>
                              <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">{project.description}</p>
                            </div>

                            <div className="ml-6 shrink-0">
                              <ProjectVoting
                                projectId={project.id}
                                projectName={project.name}
                                currentVotes={{
                                  votes_up: project.votes_up || 0,
                                  votes_down: project.votes_down || 0,
                                  vote_score: project.vote_score || 0
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground dark:text-slate-400">
                            <div>
                              <span className="font-medium">Difficulty:</span> {'⭐'.repeat(project.difficulty_level)}
                            </div>
                            <div>
                              <span className="font-medium">Participants:</span> {project.current_participants}/{project.max_participants}
                            </div>
                            <div>
                              <span className="font-medium">Type:</span> {project.project_type.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-600/20 dark:to-purple-600/20 rounded-xl p-6 border-2 border-blue-500/30 dark:border-blue-500/30 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-4 text-center text-blue-600 dark:text-blue-300">How Voting Works</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 text-base">👍 Upvote a Project</h4>
                  <p className="text-foreground/80 dark:text-slate-300">Show support for projects you want to see prioritized and actively developed by the community.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2 text-base">👎 Downvote a Project</h4>
                  <p className="text-foreground/80 dark:text-slate-300">Express concerns or suggest that resources might be better allocated elsewhere.</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground dark:text-slate-400 font-medium">
                  • One vote per project per user • You can change your vote anytime • Projects are ranked by total score (upvotes - downvotes)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wellness Oracle Project Detail */}
      {activeView === 'wellness-oracle' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="mb-6">
            <button
              onClick={() => setActiveView('philosophy')}
              className="flex items-center gap-2 px-4 py-2 bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 rounded-lg transition-colors duration-300 text-muted-foreground dark:text-slate-300 hover:text-foreground dark:hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Collaboration Art
            </button>
          </div>
          <WellnessOracle />
        </div>
      )}

      {/* AI Study Buddy Project Detail */}
      {activeView === 'ai-study-buddy' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="mb-6">
            <button
              onClick={() => setActiveView('philosophy')}
              className="flex items-center gap-2 px-4 py-2 bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 rounded-lg transition-colors duration-300 text-muted-foreground dark:text-slate-300 hover:text-foreground dark:hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Collaboration Art
            </button>
          </div>
          <AIStudyBuddy />
        </div>
      )}

      {/* DJ Blue Project Detail */}
      {activeView === 'dj-blue' && (
        <div className="container mx-auto px-4 mb-16">
          <div className="mb-6">
            <button
              onClick={() => setActiveView('philosophy')}
              className="flex items-center gap-2 px-4 py-2 bg-card dark:bg-slate-800 hover:bg-secondary dark:hover:bg-slate-700 rounded-lg transition-colors duration-300 text-muted-foreground dark:text-slate-300 hover:text-foreground dark:hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Collaboration Art
            </button>
          </div>
          <MoodMusicProject />
        </div>
      )}
    </div>
  );
}
