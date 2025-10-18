
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
import { TestModeProvider } from "./components/TestModeContext";
import PersonalFilesPage from "./pages/PersonalFilesPage";
import GitBlueprints from "./pages/GitBlueprints";
import GroupProjects from "./pages/GroupProjects";
import TestPlatform from "./pages/TestPlatform";
import IfElseArtifact from "./pages/Artifacts/IfElseArtifact";
import LoopsArtifact from "./pages/Artifacts/LoopsArtifact";
import CollectionsArtifact from "./pages/Artifacts/CollectionsArtifact";
import FunctionsArtifact from "./pages/Artifacts/FunctionsArtifact";
import OOPArtifact from "./pages/Artifacts/OOPArtifact";
import DesignPatternsArtifact from "./pages/Artifacts/DesignPatternsArtifact";
import DataStructuresArtifact from "./pages/Artifacts/DataStructuresArtifact";
import AdvancedAlgorithmsArtifact from "./pages/Artifacts/AdvancedAlgorithmsArtifact";
import HashingArtifact from "./pages/Artifacts/HashingArtifact";
import MemoryOptimizationArtifact from "./pages/Artifacts/MemoryOptimizationArtifact";
import NumPyArtifact from "./pages/Artifacts/NumPyArtifact";
import LinearAlgebraArtifact from "./pages/Artifacts/LinearAlgebraArtifact";
import PandasArtifact from "./pages/Artifacts/PandasArtifact";
import MatplotlibMasteryArtifact from "./pages/Artifacts/MatplotlibMasteryArtifact";
import SeabornMasteryArtifact from "./pages/Artifacts/SeabornMasteryArtifact";
import PlotlyInteractiveArtifact from "./pages/Artifacts/PlotlyInteractiveArtifact";
import StreamlitUnifiedArtifact from "./pages/Artifacts/StreamlitUnifiedArtifact";
import ComputerVisionSession28 from "./pages/Artifacts/ComputerVisionSession28";
import DlibSession29 from "./pages/Artifacts/DlibSession29";
import SklearnSession30 from "./pages/Artifacts/SklearnSession30";
import SklearnSession31 from "./pages/Artifacts/SklearnSession31";
import SklearnSession32 from "./pages/Artifacts/SklearnSession32";
import SklearnSession33 from "./pages/Artifacts/SklearnSession33";
import NLPSessions3435 from "./pages/Artifacts/NLPSessions34-35";
import DeepLearningSession36 from "./pages/Artifacts/DeepLearningSession36";
import CNNSessions3738 from "./pages/Artifacts/CNNSessions37-38";
import SklearnDiscovery from "./pages/Artifacts/Layer2Artifacts/sklearn-discovery";
import OpenCVConvolutionLab from "./pages/Artifacts/Layer2Artifacts/filters_and_edges";
import ContoursSegmentationLab from "./pages/Artifacts/Layer2Artifacts/contours-segmentation-lab";
import MediaPipeLab from "./pages/Artifacts/Layer2Artifacts/mediapipe-lab";
import TestPage from "./pages/TestPage";
import LiveQuizPage from "./pages/LiveQuizPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="bluepigeon-theme">
      <AuthProvider>
        <ContentProvider>
          <TestModeProvider>
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
                  <Route path="/group-projects" element={<GroupProjects />} />
          <Route path="/test" element={<TestPlatform />} />
          <Route path="/test-platform" element={<TestPlatform />} />
                  <Route path="/foundations" element={<Foundations />} />
                  <Route path="/ide" element={<IDEPage />} />
            <Route path="/data-calculus" element={<DataCalculus />} />
            <Route path="/data-visualizing" element={<DataVisualizing />} />
                  <Route path="/machine-learning" element={<MachineLearning />} />
                  <Route path="/advanced-machine-learning" element={<AdvancedMachineLearning />} />

                  <Route path="/personal-files" element={<PersonalFilesPage />} />
                  <Route path="/test" element={<TestPage />} />
                  <Route path="/live-quiz" element={<LiveQuizPage />} />
                  <Route path="/artifacts/ifelse" element={<IfElseArtifact />} />
                  <Route path="/artifacts/loops" element={<LoopsArtifact />} />
                  <Route path="/artifacts/collections" element={<CollectionsArtifact />} />
                  <Route path="/artifacts/functions" element={<FunctionsArtifact />} />
                  <Route path="/artifacts/oop" element={<OOPArtifact />} />
                  <Route path="/artifacts/design-patterns" element={<DesignPatternsArtifact />} />
                  <Route path="/artifacts/data-structures" element={<DataStructuresArtifact />} />
                  <Route path="/artifacts/advanced-algorithms" element={<AdvancedAlgorithmsArtifact />} />
                  <Route path="/artifacts/hashing" element={<HashingArtifact />} />
                  <Route path="/artifacts/memory-optimization" element={<MemoryOptimizationArtifact />} />
                  <Route path="/artifacts/numpy" element={<NumPyArtifact />} />
                  <Route path="/artifacts/linear-algebra" element={<LinearAlgebraArtifact />} />
                  <Route path="/artifacts/pandas" element={<PandasArtifact />} />
                  <Route path="/artifacts/matplotlib-mastery" element={<MatplotlibMasteryArtifact />} />
                  <Route path="/artifacts/seaborn-mastery" element={<SeabornMasteryArtifact />} />
                  <Route path="/artifacts/plotly-interactive" element={<PlotlyInteractiveArtifact />} />
                  <Route path="/artifacts/streamlit-unified" element={<StreamlitUnifiedArtifact />} />
                  <Route path="/artifacts/computer-vision-session28" element={<ComputerVisionSession28 />} />
                  <Route path="/artifacts/dlib-session29" element={<DlibSession29 />} />
                  <Route path="/artifacts/sklearn-session30" element={<SklearnSession30 />} />
                  <Route path="/artifacts/sklearn-session31" element={<SklearnSession31 />} />
                  <Route path="/artifacts/sklearn-session32" element={<SklearnSession32 />} />
                  <Route path="/artifacts/sklearn-session33" element={<SklearnSession33 />} />
                  <Route path="/artifacts/nlp-sessions34-35" element={<NLPSessions3435 />} />
                  <Route path="/artifacts/deep-learning-session36" element={<DeepLearningSession36 />} />
                  <Route path="/artifacts/cnn-sessions37-38" element={<CNNSessions3738 />} />
                  <Route path="/artifacts/layer2/sklearn-discovery" element={<SklearnDiscovery />} />
                  <Route path="/artifacts/layer2/filters-and-edges" element={<OpenCVConvolutionLab />} />
                  <Route path="/artifacts/layer2/contours-segmentation" element={<ContoursSegmentationLab />} />
                  <Route path="/artifacts/layer2/mediapipe-lab" element={<MediaPipeLab />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFound />} />
                  </Routes>
                  <ChatButton />
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </TestModeProvider>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
