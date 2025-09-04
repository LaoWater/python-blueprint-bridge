
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import DataCalculus from "./pages/DataCalculus";
import DataVisualizing from "./pages/DataVisualizing";
import Foundations from "./pages/Foundations";
import Blueprints from "./pages/Blueprints";
import BlueprintsMastery from "./pages/BlueprintsMastery";
import MachineLearning from "./pages/MachineLearning";
import AdvancedMachineLearning from "./pages/AdvancedMachineLearning";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import IDEPage from "./pages/IDEPage";
import Navbar from "./components/Navbar";
import ChatButton from "./components/ChatButton";
import { AuthProvider } from "./components/AuthContext";
import { ContentProvider } from "./components/ContentProvider";
import PersonalFilesPage from "./pages/PersonalFilesPage";
import GitBlueprints from "./pages/GitBlueprints";
import IfElseArtifact from "./pages/Artifacts/IfElseArtifact";
import LoopsArtifact from "./pages/Artifacts/LoopsArtifact";
import CollectionsArtifact from "./pages/Artifacts/CollectionsArtifact";
import FunctionsArtifact from "./pages/Artifacts/FunctionsArtifact";
import OOPArtifact from "./pages/Artifacts/OOPArtifact";
import DesignPatternsArtifact from "./pages/Artifacts/DesignPatternsArtifact";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="bluepigeon-theme">
      <AuthProvider>
        <ContentProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-background transition-colors duration-300">
                <Navbar />
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/python" element={<Index />} />
                  <Route path="/blueprints" element={<Blueprints />} />
                  <Route path="/blueprints_mastery" element={<BlueprintsMastery />} />
                  <Route path="/git-blueprints" element={<GitBlueprints />} />
                  <Route path="/foundations" element={<Foundations />} />
                  <Route path="/ide" element={<IDEPage />} />
            <Route path="/data-calculus" element={<DataCalculus />} />
            <Route path="/data-visualizing" element={<DataVisualizing />} />
                  <Route path="/machine-learning" element={<MachineLearning />} />
                  <Route path="/advanced-machine-learning" element={<AdvancedMachineLearning />} />

                  <Route path="/personal-files" element={<PersonalFilesPage />} />
                  <Route path="/artifacts/ifelse" element={<IfElseArtifact />} />
                  <Route path="/artifacts/loops" element={<LoopsArtifact />} />
                  <Route path="/artifacts/collections" element={<CollectionsArtifact />} />
                  <Route path="/artifacts/functions" element={<FunctionsArtifact />} />
                  <Route path="/artifacts/oop" element={<OOPArtifact />} />
                  <Route path="/artifacts/design-patterns" element={<DesignPatternsArtifact />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ChatButton />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
