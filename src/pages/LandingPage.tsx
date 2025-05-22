
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Package, Wrench, Feather, Zap, BookOpen, Globe, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  const { theme } = useTheme();

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
      {/* Hero Section with enhanced visuals */}
      <section className="hero-section overflow-hidden">
        <div className="hero-bg-element animate-float" style={{ top: '10%', left: '5%', width: '400px', height: '400px' }}></div>
        <div className="hero-bg-element animate-float-delay-1" style={{ bottom: '15%', right: '10%', width: '500px', height: '500px' }}></div>
        <div className="hero-bg-element animate-float-delay-2" style={{ top: '30%', right: '25%', width: '300px', height: '300px' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-small-white opacity-10"></div>
        
        <div className="hero-content">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-small-white opacity-20"></div>
              <div className="animate-pulse-slow absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 opacity-70 blur-md"></div>
              <Feather className="text-white w-10 h-10 relative z-10" />
            </div>
          </div>
          
          <h1 className="hero-title text-6xl md:text-7xl mb-2">Blue Pigeon</h1>
          <p className="hero-subtitle max-w-2xl mx-auto">
            Carrying the blueprints for Python developers, accessible anywhere in the world
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <Link to="/foundations">
              <Button size="lg" className="hero-btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/mastery">
              <Button size="lg" variant="outline" className="hero-btn border-2">
                Advanced Topics
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Floating code snippets */}
        <div className="absolute hidden md:block right-10 top-1/3 transform rotate-6 animate-float-delay-3 opacity-70">
          <Card className="w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-blue-200 dark:border-blue-900/50">
            <CardContent className="p-4 font-mono text-xs">
              <pre className="text-gray-800 dark:text-blue-300">
                <code>{'def blue_pigeon():\n  return "Hello, world!"'}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
        
        <div className="absolute hidden md:block left-10 bottom-20 transform -rotate-3 animate-float-delay-2 opacity-70">
          <Card className="w-65 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-indigo-200 dark:border-indigo-900/50">
            <CardContent className="p-4 font-mono text-xs">
              <pre className="text-gray-800 dark:text-blue-300">
                <code>{'import bluepigeon\nnew_project = bluepigeon.fly()'}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Story Section with enhanced storytelling */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 animate-on-scroll">The Story of Blue Pigeon</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-2xl transform rotate-3"></div>
                <Card className="relative border-blue-200 dark:border-blue-900 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md overflow-hidden">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md mb-6 mx-auto">
                      <Globe className="text-white w-8 h-8" />
                    </div>
                    <p className="text-lg leading-relaxed">
                      In the world of software development, skilled craftspeople need reliable tools and
                      reference materials. The Blue Pigeon is inspired by the carrier pigeons of old,
                      faithfully delivering messages across vast distances.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="animate-on-scroll delay-200">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-2xl transform -rotate-3"></div>
                <Card className="relative border-indigo-200 dark:border-indigo-900 shadow-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md overflow-hidden">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-md mb-6 mx-auto">
                      <Shield className="text-white w-8 h-8" />
                    </div>
                    <p className="text-lg leading-relaxed">
                      Our Blue Pigeon carries something far more valuable than messages - it delivers
                      the essential blueprints that Python developers need in their toolkit, making them
                      accessible anywhere in the world, on any device, by any person.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <div className="mt-12 animate-on-scroll delay-300">
            <Card className="mx-auto max-w-2xl border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900 shadow-lg">
              <CardContent className="p-8">
                <p className="text-xl italic text-blue-800 dark:text-blue-300 leading-relaxed">
                  "These blueprints form the foundation from which developers can build anything
                  they imagine, with a reliable reference always just a click away."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Features Section with improved cards */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900/95 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-white opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Developer Toolkit</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="feature-icon group-hover:scale-110 transition-transform duration-300">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Essential Syntax</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clear examples of Python's core syntax and language features for quick reference.
              </p>
            </div>
            
            <div className="feature-card group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="feature-icon group-hover:scale-110 transition-transform duration-300">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Structures</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive guide to Python's built-in data structures and their operations.
              </p>
            </div>
            
            <div className="feature-card group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="feature-icon group-hover:scale-110 transition-transform duration-300">
                <Wrench className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Common Patterns</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pythonic solutions to common programming challenges and design patterns.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/">
              <Button variant="outline" className="hero-btn border-2 hover:bg-blue-50 dark:hover:bg-blue-950/50">
                Explore All Resources <BookOpen className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Partners Section - updated from "Trusted By" */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-white opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Partners</h2>
          
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-800/80 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <img 
                src="https://static.tildacdn.net/tild3865-3939-4866-b133-353966666137/skillbrain_-_logo.svg" 
                alt="SkillBrain Logo" 
                className="partners-logo h-20 w-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action with improved styling */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-small-white opacity-10"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-blue-800 dark:text-blue-300">Ready to Take Flight?</h2>
          <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
            Start your Python journey with Blue Pigeon and access essential developer resources
            whenever you need them.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-transform duration-300">
              Get Started <Zap className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
