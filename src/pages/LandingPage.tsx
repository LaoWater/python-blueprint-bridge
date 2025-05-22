
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Package, Tool, Feather, Zap, BookOpen } from 'lucide-react';

const LandingPage = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-element" style={{ top: '20%', left: '10%' }}></div>
        <div className="hero-bg-element" style={{ bottom: '10%', right: '5%' }}></div>
        <div className="hero-bg-element" style={{ top: '40%', right: '20%' }}></div>
        
        <div className="hero-content">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Feather className="text-white w-10 h-10" />
            </div>
          </div>
          
          <h1 className="hero-title">Blue Pigeon</h1>
          <p className="hero-subtitle">
            Carrying the blueprints for Python developers, accessible anywhere in the world
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/foundations">
              <Button className="hero-btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Start Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/mastery">
              <Button variant="outline" className="hero-btn">
                Advanced Topics
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">The Story of Blue Pigeon</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-6">
              In the world of software development, skilled craftspeople need reliable tools and
              reference materials. The Blue Pigeon is inspired by the carrier pigeons of old,
              faithfully delivering messages across vast distances.
            </p>
            <p className="text-lg mb-6">
              Our Blue Pigeon carries something far more valuable than messages - it delivers
              the essential blueprints that Python developers need in their toolkit, making them
              accessible anywhere in the world, on any device, by any person.
            </p>
            <p className="text-lg">
              These blueprints form the foundation from which developers can build anything
              they imagine, with a reliable reference always just a click away.
            </p>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Developer Toolkit</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="feature-icon">
                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Essential Syntax</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clear examples of Python's core syntax and language features for quick reference.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Structures</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive guide to Python's built-in data structures and their operations.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <Tool className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Common Patterns</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pythonic solutions to common programming challenges and design patterns.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/">
              <Button variant="outline" className="hero-btn">
                Explore All Resources <BookOpen className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="partners-section">
        <div className="partners-container">
          <h2 className="partners-title">Trusted By</h2>
          
          <div className="flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <img 
                src="https://static.tildacdn.net/tild3865-3939-4866-b133-353966666137/skillbrain_-_logo.svg" 
                alt="SkillBrain Logo" 
                className="partners-logo"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Flight?</h2>
          <p className="text-xl mb-8">
            Start your Python journey with Blue Pigeon and access essential developer resources
            whenever you need them.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Get Started <Zap className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
