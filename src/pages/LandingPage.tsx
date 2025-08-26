import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Code, 
  Package, 
  Wrench, 
  Feather, 
  Zap, 
  BookOpen, 
  Globe, 
  Shield,
  Brain,
  Compass,
  Target,
  Lightbulb,
  Cpu,
  Search,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import blueprintsHero from '@/assets/blueprints-hero.jpg';
import blueprintsFoundation from '@/assets/blueprints-foundation.jpg';
import blueprintsMastery from '@/assets/blueprints-mastery.jpg';

const LandingPage = () => {
  const { theme } = useTheme();
  const [currentPhilosophy, setCurrentPhilosophy] = useState(0);

  const philosophySlides = [
    {
      title: "The Art of Programming",
      subtitle: "Algorithms and Computational Thinking",
      description: "In the AI era, success comes from understanding algorithms, data structures, and computational thinking - not just syntax memorization.",
      icon: Brain,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Algorithmic Intuition",
      subtitle: "Know exactly where to look and why",
      description: "Master developers recognize patterns, understand complexity, and can navigate any codebase because they grasp the underlying principles.",
      icon: Compass,
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      title: "Blueprint Mastery",
      subtitle: "Carry the essential patterns with you",
      description: "Like a pigeon carrying vital messages, a true programmer carries the essential blueprints of computer science - ready to apply them anywhere.",
      icon: Target,
      gradient: "from-purple-500 to-blue-600"
    }
  ];

  // Auto-rotate philosophy slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhilosophy((prev) => (prev + 1) % philosophySlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animate elements on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Philosophy Carousel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-400/10 rounded-full blur-3xl animate-spin" style={{animationDuration: '30s'}}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          {/* Pigeon Logo with Enhanced Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-500">
                <div className="absolute inset-2 bg-white/10 rounded-full backdrop-blur-sm"></div>
                <Feather className="text-white w-16 h-16 relative z-10 animate-bounce" style={{animationDuration: '3s'}} />
              </div>
            </div>
          </div>
          
          {/* Main Title with Gradient */}
          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Blue Pigeon
          </h1>
          
          {/* Philosophy Carousel */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative h-48 overflow-hidden">
              {philosophySlides.map((slide, index) => {
                const IconComponent = slide.icon;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 transform ${
                      index === currentPhilosophy 
                        ? 'translate-x-0 opacity-100' 
                        : index < currentPhilosophy 
                          ? '-translate-x-full opacity-0' 
                          : 'translate-x-full opacity-0'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${slide.gradient} mb-4 shadow-lg`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-800 dark:text-slate-100">{slide.title}</h2>
                      <p className="text-xl md:text-2xl mb-4 text-blue-600 dark:text-blue-400 font-medium">{slide.subtitle}</p>
                      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">{slide.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Philosophy Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {philosophySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhilosophy(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPhilosophy 
                      ? 'bg-blue-600 dark:bg-blue-400 scale-125' 
                      : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/blueprints">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Explore Blueprints <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/foundations">
              <Button size="lg" variant="outline" className="border-2 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 text-lg px-8 py-4">
                Start Learning
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Blueprint Cards */}
        <div className="absolute hidden lg:block right-2 lg:right-10 top-1/4 animate-float z-20">
          <Card className="w-64 lg:w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-blue-200 dark:border-blue-900/50 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 scale-75 lg:scale-100">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center mb-3">
                <Brain className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 mr-2" />
                <Badge variant="secondary" className="text-xs lg:text-sm">Algorithm Design</Badge>
              </div>
              <pre className="text-xs lg:text-sm font-mono text-slate-700 dark:text-slate-300 overflow-hidden">
{`def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)`}
              </pre>
            </CardContent>
          </Card>
        </div>
        
        <div className="absolute hidden lg:block left-2 lg:left-10 bottom-1/4 animate-float z-20" style={{animationDelay: '1s'}}>
          <Card className="w-64 lg:w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-indigo-200 dark:border-indigo-900/50 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 scale-75 lg:scale-100">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center mb-3">
                <Cpu className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600 mr-2" />
                <Badge variant="secondary" className="text-xs lg:text-sm">Data Structures</Badge>
              </div>
              <pre className="text-xs lg:text-sm font-mono text-slate-700 dark:text-slate-300 overflow-hidden">
{`class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None
        
    def depth_first_search(self):
        # Algorithm understanding here`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              The Philosophy in Action
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Watch how the Art of Programming transcends mere code syntax and focuses on algorithmic understanding and pattern recognition.
            </p>
          </div>
          
          <div className="relative group animate-on-scroll">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/DsYIdMmI5-Q"
                  title="The Art of Programming"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blueprint Journey Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-black/[0.02] dark:bg-grid-small-white/[0.02]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Blueprint Journey
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Like a pigeon carrying essential messages across vast distances, these blueprints carry the core patterns and principles you need to master programming.
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto animate-on-scroll">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={blueprintsFoundation} 
                        alt="Foundation Blueprints" 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
                        <Badge variant="outline">Foundation</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-3">Python & AI Foundations</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        Master the fundamental algorithms and data structures that form the backbone of all programming.
                      </p>
                      <Link to="/foundations">
                        <Button variant="outline" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50">
                          Start Foundation <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200 dark:hover:border-indigo-800">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={blueprintsHero} 
                        alt="Blueprint Patterns" 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Compass className="w-6 h-6 text-indigo-600 mr-2" />
                        <Badge variant="outline">Core Patterns</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-3">Blueprint Patterns</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        Explore the essential coding patterns and algorithms that every developer should have in their toolkit.
                      </p>
                      <Link to="/blueprints">
                        <Button variant="outline" className="w-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/50">
                          Explore Blueprints <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={blueprintsMastery} 
                        alt="Advanced Mastery" 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Target className="w-6 h-6 text-purple-600 mr-2" />
                        <Badge variant="outline">Mastery</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-3">Advanced Mastery</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        Dive deep into advanced algorithms, system design, and architectural patterns for senior developers.
                      </p>
                      <Link to="/blueprints_mastery">
                        <Button variant="outline" className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-950/50">
                          Master Advanced <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Philosophy Deep Dive */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Blueprints Matter
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              In the age of AI, the most valuable skill isn't writing code—it's understanding the patterns, algorithms, and principles that make great software possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-on-scroll group">
              <Card className="h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Know Where to Look</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Master developers don't memorize every function. They understand patterns and know exactly where to find the right solution for any problem.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-on-scroll group" style={{animationDelay: '0.2s'}}>
              <Card className="h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-2 border-transparent group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Pattern Recognition</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    See the underlying structure in any codebase. Recognize when to apply specific algorithms and understand the trade-offs involved.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="animate-on-scroll group" style={{animationDelay: '0.4s'}}>
              <Card className="h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border-2 border-transparent group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Universal Access</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Like a pigeon that can reach any destination, carry these blueprints with you anywhere—accessible on any device, anytime.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">Trusted Partners</h2>
            <p className="text-slate-600 dark:text-slate-300">Supporting excellence in developer education</p>
          </div>
          
          <div className="flex justify-center animate-on-scroll">
            <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <a href="https://skillbrain.com/" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://static.tildacdn.net/tild3865-3939-4866-b133-353966666137/skillbrain_-_logo.svg"
                    alt="SkillBrain Logo"
                    className="h-16 w-auto hover:scale-105 transition-transform duration-300"
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Final Call to Action */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-white/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-blue-500/20 to-purple-500/20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Master the Art?</h2>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Join thousands of developers who understand that true programming mastery comes from algorithmic thinking, 
              pattern recognition, and carrying the right blueprints with you wherever you go.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/blueprints">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Start Your Journey <Feather className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/foundations">
                <Button size="lg" variant="outline" className="border-2 border-white text-blue-600 hover:bg-white/10 text-lg px-8 py-4">
                  Learn Foundations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;