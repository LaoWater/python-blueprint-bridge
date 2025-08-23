
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import NavbarAuth from './NavbarAuth';
import { ThemeToggle } from '@/components/theme-toggle';
import { Feather } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { user, isAdmin } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-950/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Feather className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Blue Pigeon
              </span>
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-6 text-sm">
              <Link 
                to="/foundations"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Foundations
              </Link>
              <Link 
                to="/data-calculus"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Data: Calculus
              </Link>
              <Link 
                to="/data-visualizing"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Data: Visualizing
              </Link>
              <Link 
                to="/machine-learning"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Machine Learning
              </Link>
              <Link 
                to="/blueprints"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Blueprints
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <NavbarAuth />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
