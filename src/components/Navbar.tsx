
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import NavbarAuth from './NavbarAuth';
import { ThemeToggle } from '@/components/theme-toggle';
import { Feather, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Navbar = () => {
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                to="/advanced-machine-learning"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Advanced ML
              </Link>
              <Link
                to="/blueprints"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Blueprints
              </Link>

              {/* Group Projects Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-1 focus:outline-none">
                    Group Projects
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/group-projects" className="w-full cursor-pointer">
                      📁 Group Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/test" className="w-full cursor-pointer">
                      📝 Coding Tests
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/live-quiz" className="w-full cursor-pointer">
                      🎯 Live Quiz
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                to="/ide"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                IDE
              </Link>
              <Link 
                to="/personal-files"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                Personal Files
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

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  <Link
                    to="/foundations"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                  >
                    Foundations
                  </Link>
                  <Link
                    to="/data-calculus"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                  >
                    Data: Calculus
                  </Link>
                  <Link
                    to="/data-visualizing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                  >
                    Data: Visualizing
                  </Link>
                  <Link
                    to="/machine-learning"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                  >
                    Machine Learning
                  </Link>
                  <Link
                    to="/advanced-machine-learning"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                  >
                    Advanced ML
                  </Link>
                  <Link
                    to="/blueprints"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                  >
                    Blueprints
                  </Link>

                  {/* Mobile Group Projects Section */}
                  <div className="border-t pt-4">
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      Group Projects
                    </div>
                    <div className="flex flex-col space-y-2 pl-4">
                      <Link
                        to="/group-projects"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                      >
                        📁 Group Projects
                      </Link>
                      <Link
                        to="/test"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                      >
                        📝 Coding Tests
                      </Link>
                      <Link
                        to="/live-quiz"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                      >
                        🎯 Live Quiz
                      </Link>
                    </div>
                  </div>

                  <Link
                    to="/ide"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2"
                  >
                    IDE
                  </Link>
                  <Link
                    to="/personal-files"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2"
                  >
                    Personal Files
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
                    >
                      Admin
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <NavbarAuth />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
