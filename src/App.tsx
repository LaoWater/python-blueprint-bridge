
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import Foundations from "./pages/Foundations";
import Mastery from "./pages/Mastery";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ChatButton from "./components/ChatButton";
import { AuthProvider } from "./components/AuthContext";
import { ContentProvider } from "./components/ContentProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="pythonic-theme">
      <AuthProvider>
        <ContentProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen bg-background transition-colors duration-300">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/foundations" element={<Foundations />} />
                  <Route path="/mastery" element={<Mastery />} />
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
