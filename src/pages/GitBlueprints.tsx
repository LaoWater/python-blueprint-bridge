import { useState } from 'react';
import { Copy, Check, GitBranch, GitCommit, GitMerge, Terminal, FileText, Users, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

interface GitCommandProps {
  command: string;
  description: string;
  example?: string;
  level: 'basic' | 'intermediate' | 'advanced';
  category: string;
}

const GitCommand = ({ command, description, example, level }: GitCommandProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied to clipboard",
      description: "Command copied successfully",
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg font-mono text-blue-600 dark:text-blue-400">
                {command}
              </CardTitle>
              <Badge className={getLevelColor(level)}>
                {level}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              {description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleCopy(command)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {example && (
        <CardContent className="pt-0">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Example:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(example)}
                className="h-6 w-6 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <code className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {example}
            </code>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const GitWorkflowDiagram = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Git Workflow Visualization
        </CardTitle>
        <CardDescription>
          Understanding the Git workflow and how commands interact with different areas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-red-100 dark:bg-red-900/20 rounded-lg p-4 mb-3">
              <FileText className="h-8 w-8 mx-auto text-red-600" />
            </div>
            <h3 className="font-semibold mb-2">Working Directory</h3>
            <p className="text-sm text-muted-foreground">
              Your local files where you make changes
            </p>
            <div className="mt-2 text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
              git add .
            </div>
          </div>
          <div className="text-center">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 rounded-lg p-4 mb-3">
              <Terminal className="h-8 w-8 mx-auto text-yellow-600" />
            </div>
            <h3 className="font-semibold mb-2">Staging Area</h3>
            <p className="text-sm text-muted-foreground">
              Files ready to be committed
            </p>
            <div className="mt-2 text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
              git commit -m
            </div>
          </div>
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 mb-3">
              <GitCommit className="h-8 w-8 mx-auto text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Repository</h3>
            <p className="text-sm text-muted-foreground">
              Permanent storage of your project history
            </p>
            <div className="mt-2 text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
              git push
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const GitBlueprints = () => {
  const basicCommands: GitCommandProps[] = [
    {
      command: "git init",
      description: "Initialize a new Git repository in the current directory",
      example: "git init my-project",
      level: "basic",
      category: "setup"
    },
    {
      command: "git clone [url]",
      description: "Download a repository from a remote source",
      example: "git clone https://github.com/user/repo.git",
      level: "basic",
      category: "setup"
    },
    {
      command: "git status",
      description: "Check the status of your working directory and staging area",
      example: "git status",
      level: "basic",
      category: "inspection"
    },
    {
      command: "git add [file]",
      description: "Add files to the staging area",
      example: "git add . # Add all files\ngit add file.txt # Add specific file",
      level: "basic",
      category: "staging"
    },
    {
      command: "git commit -m \"message\"",
      description: "Create a new commit with staged changes",
      example: "git commit -m \"Add user authentication feature\"",
      level: "basic",
      category: "committing"
    },
    {
      command: "git push",
      description: "Upload commits to remote repository",
      example: "git push origin main",
      level: "basic",
      category: "remote"
    },
    {
      command: "git pull",
      description: "Download and merge changes from remote repository",
      example: "git pull origin main",
      level: "basic",
      category: "remote"
    }
  ];

  const intermediateCommands: GitCommandProps[] = [
    {
      command: "git branch [name]",
      description: "Create, list, or delete branches",
      example: "git branch feature/new-ui # Create branch\ngit branch -d old-branch # Delete branch",
      level: "intermediate",
      category: "branching"
    },
    {
      command: "git checkout [branch]",
      description: "Switch to a different branch or commit",
      example: "git checkout main\ngit checkout -b feature/login # Create and switch",
      level: "intermediate",
      category: "branching"
    },
    {
      command: "git merge [branch]",
      description: "Merge changes from one branch into current branch",
      example: "git merge feature/new-feature",
      level: "intermediate",
      category: "merging"
    },
    {
      command: "git rebase [branch]",
      description: "Reapply commits on top of another base commit",
      example: "git rebase main # Rebase current branch onto main",
      level: "intermediate",
      category: "merging"
    },
    {
      command: "git log --oneline",
      description: "View commit history in a compact format",
      example: "git log --oneline --graph --all",
      level: "intermediate",
      category: "inspection"
    },
    {
      command: "git stash",
      description: "Temporarily save changes without committing",
      example: "git stash # Save changes\ngit stash pop # Restore changes",
      level: "intermediate",
      category: "utility"
    },
    {
      command: "git reset [mode] [commit]",
      description: "Reset current branch to a specific commit",
      example: "git reset --hard HEAD~1 # Remove last commit\ngit reset --soft HEAD~1 # Keep changes staged",
      level: "intermediate",
      category: "undoing"
    }
  ];

  const advancedCommands: GitCommandProps[] = [
    {
      command: "git cherry-pick [commit]",
      description: "Apply specific commits to current branch",
      example: "git cherry-pick abc123def",
      level: "advanced",
      category: "advanced"
    },
    {
      command: "git rebase -i [commit]",
      description: "Interactive rebase to modify commit history",
      example: "git rebase -i HEAD~3 # Edit last 3 commits",
      level: "advanced",
      category: "advanced"
    },
    {
      command: "git bisect",
      description: "Binary search to find which commit introduced a bug",
      example: "git bisect start\ngit bisect bad\ngit bisect good v1.0",
      level: "advanced",
      category: "debugging"
    },
    {
      command: "git reflog",
      description: "View reference logs to recover lost commits",
      example: "git reflog # See all ref changes\ngit reset --hard HEAD@{2}",
      level: "advanced",
      category: "recovery"
    },
    {
      command: "git worktree add [path] [branch]",
      description: "Create multiple working directories for different branches",
      example: "git worktree add ../feature feature/new-ui",
      level: "advanced",
      category: "advanced"
    },
    {
      command: "git submodule",
      description: "Manage external repositories as submodules",
      example: "git submodule add https://github.com/user/lib.git lib",
      level: "advanced",
      category: "advanced"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="border-b bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full p-4">
                <GitBranch className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Git Command Blueprints
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Master version control with comprehensive Git commands, visual workflows, and practical examples. 
              From basic operations to advanced techniques - your complete Git reference.
            </p>
            
            <div className="flex justify-center gap-4 mb-8">
              <Card className="bg-white/70 dark:bg-gray-900/70">
                <CardContent className="p-4 text-center">
                  <GitCommit className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">Basic Commands</div>
                  <div className="text-sm text-muted-foreground">Essential daily operations</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 dark:bg-gray-900/70">
                <CardContent className="p-4 text-center">
                  <GitMerge className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <div className="font-semibold">Branching & Merging</div>
                  <div className="text-sm text-muted-foreground">Collaborative workflows</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 dark:bg-gray-900/70">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <div className="font-semibold">Advanced Techniques</div>
                  <div className="text-sm text-muted-foreground">Power user commands</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <GitWorkflowDiagram />

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <GitCommit className="h-4 w-4" />
              Basic Commands
            </TabsTrigger>
            <TabsTrigger value="intermediate" className="flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              Intermediate
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Essential Git Commands</h2>
              <p className="text-muted-foreground">
                Master these fundamental commands to handle 90% of your daily Git operations. 
                These are the building blocks every developer needs to know.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {basicCommands.map((cmd, index) => (
                <GitCommand key={index} {...cmd} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intermediate" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Intermediate Git Workflows</h2>
              <p className="text-muted-foreground">
                Level up your Git skills with branching, merging, and collaborative development patterns. 
                Essential for team-based development and feature management.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {intermediateCommands.map((cmd, index) => (
                <GitCommand key={index} {...cmd} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Advanced Git Techniques</h2>
              <p className="text-muted-foreground">
                Power user commands for complex scenarios, debugging, and repository maintenance. 
                Use these carefully and understand their implications before applying.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advancedCommands.map((cmd, index) => (
                <GitCommand key={index} {...cmd} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Best Practices Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Git Best Practices
            </CardTitle>
            <CardDescription>
              Professional guidelines for effective Git usage in team environments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-green-600">✅ Do</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Write clear, descriptive commit messages</li>
                  <li>• Commit frequently with logical changes</li>
                  <li>• Use branches for features and experiments</li>
                  <li>• Pull before pushing to avoid conflicts</li>
                  <li>• Review changes before committing</li>
                  <li>• Use .gitignore for unnecessary files</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-red-600">❌ Don't</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Commit large binary files or secrets</li>
                  <li>• Work directly on the main branch</li>
                  <li>• Force push to shared branches</li>
                  <li>• Use generic commit messages like "fix"</li>
                  <li>• Commit broken or incomplete code</li>
                  <li>• Ignore merge conflicts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GitBlueprints;