
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, BarChart3, Home, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Heatmap', path: '/heatmap', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Alerts', path: '/alerts', icon: <AlertTriangle className="w-5 h-5" /> },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-hero animate-gradient-x"></div>
            <div className="absolute inset-0 w-10 h-10 rounded-full blur-lg bg-gradient-hero animate-gradient-x opacity-40"></div>
          </div>
          <span className="text-xl font-bold text-white">Hazard Watch</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {links.map((link) => (
            <Link key={link.path} to={link.path}>
              <motion.div
                className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white glass-hover'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
                <span>{link.name}</span>
                {location.pathname === link.path && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-primary/20"
                    layoutId="navbar-indicator"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            className="p-2 rounded-lg glass-hover"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="md:hidden glass"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="py-3 px-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2 rounded-lg ${
                  location.pathname === link.path
                    ? 'bg-primary/20 text-white'
                    : 'text-gray-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
