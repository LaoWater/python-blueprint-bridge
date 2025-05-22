
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';

const Navbar = () => {
  const location = useLocation();
  
  // Function to check if a link is active
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-python-yellow to-python-blue flex items-center justify-center">
              <span className="text-white font-bold text-sm">Py</span>
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">Pythonic Transcriber</span>
          </Link>
          
          <div className="flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/') ? 'text-python-blue dark:text-python-yellow font-semibold' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Launchpad
            </Link>
            <Link 
              to="/foundations" 
              className={`px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/foundations') ? 'text-python-blue dark:text-python-yellow font-semibold' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Foundations
            </Link>
            <Link 
              to="/mastery" 
              className={`px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive('/mastery') ? 'text-python-blue dark:text-python-yellow font-semibold' : 'text-gray-700 dark:text-gray-300'}`}
            >
              Mastery
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
